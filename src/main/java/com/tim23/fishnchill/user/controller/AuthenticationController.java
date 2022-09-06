package com.tim23.fishnchill.user.controller;

import com.tim23.fishnchill.general.exception.ResourceConflictException;
import com.tim23.fishnchill.general.model.VerificationToken;
import com.tim23.fishnchill.general.service.MailService;
import com.tim23.fishnchill.general.service.VerificationTokenService;
import com.tim23.fishnchill.security.TokenUtils;
import com.tim23.fishnchill.user.dto.LoginDto;
import com.tim23.fishnchill.user.dto.RegistrationDto;
import com.tim23.fishnchill.user.dto.UserDto;
import com.tim23.fishnchill.user.dto.UserTokenStateDto;
import com.tim23.fishnchill.user.model.Client;
import com.tim23.fishnchill.user.model.User;
import com.tim23.fishnchill.user.service.ClientService;
import com.tim23.fishnchill.user.service.CustomUserDetailsService;
import com.tim23.fishnchill.user.service.OwnerService;
import com.tim23.fishnchill.user.service.UserService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Calendar;
import java.util.UUID;

//Kontroler zaduzen za autentifikaciju korisnika
//@AllArgsConstructor
@NoArgsConstructor
@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {

    @Autowired
    private TokenUtils tokenUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private CustomUserDetailsService userDetailsService;
    @Autowired
    private UserService userService;
    @Autowired
    private ClientService clientService;
    @Autowired
    private MailService emailService;
    @Autowired
    private VerificationTokenService verificationTokenService;
    @Autowired
    private OwnerService ownerService;

    // Prvi endpoint koji pogadja korisnik kada se loguje.
    // Tada zna samo svoje korisnicko ime i lozinku i to prosledjuje na backend.
    @PostMapping("/login")
    public ResponseEntity<UserTokenStateDto> createAuthenticationToken(@Valid @RequestBody LoginDto loginDto) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(),
                        loginDto.getPassword()));

        // Ubaci korisnika u trenutni security kontekst
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Kreiraj token za tog korisnika
        User user = (User) authentication.getPrincipal();
        String jwt = tokenUtils.generateToken(user.getUsername(), user.getId().toString());
        int expiresIn = tokenUtils.getExpiredIn();

        // Vrati token kao odgovor na uspesnu autentifikaciju
        return ResponseEntity.ok(new UserTokenStateDto(jwt, expiresIn));
    }

    // Endpoint za registraciju novog korisnika
    @PostMapping("/signup")
    public ResponseEntity<?> addUser(@Valid @RequestBody RegistrationDto registrationDTO) {
        UserDto existUser = this.userService.findByEmail(registrationDTO.getEmail());
        if (existUser != null) {
            throw new ResourceConflictException("User already registered on this email!");
        }
        existUser = this.userService.findByUsername(registrationDTO.getUsername());
        if (existUser != null) {
            throw new ResourceConflictException("User already registered on this username!");
        }
        if (registrationDTO.getRole().equalsIgnoreCase("client")) {
            Client client = this.clientService.save(registrationDTO);
            VerificationToken verificationToken = new VerificationToken(String.valueOf(UUID.randomUUID()), client);
            this.verificationTokenService.save(verificationToken);
            try {
                emailService.sendVerificationEmail(verificationToken);
            } catch (Exception e) {
            }
            return new ResponseEntity<>(client, HttpStatus.CREATED);
        } else {

            return new ResponseEntity<>(ownerService.save(registrationDTO), HttpStatus.CREATED);
        }
    }

    @PostMapping(value = "/verify-owner-account/{id}")
    public User confirmOwnerAccount(@PathVariable("id") Long id) {
        return userService.enableUser(id);
    }

    @PostMapping(value = "/verify-account/{token}")
    public ResponseEntity<String> confirmUserAccount(@PathVariable("token") String verificationToken) {
        VerificationToken token = verificationTokenService.findByToken(verificationToken);
        if (token == null) {
            return new ResponseEntity<>("invalid", HttpStatus.NOT_FOUND);
        }
        Client client = token.getClient();
        Calendar cal = Calendar.getInstance();
        if ((token.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            this.clientService.deleteClient(client);
            return new ResponseEntity<>("expired", HttpStatus.CONFLICT);
        }

        client.setEnabled(true);
        this.clientService.saveClient(client);
        this.verificationTokenService.delete(token);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }

    // U slucaju isteka vazenja JWT tokena, endpoint koji se poziva da se token osvezi
    @PostMapping(value = "/refresh")
    public ResponseEntity<UserTokenStateDto> refreshAuthenticationToken(HttpServletRequest request) {

        String token = tokenUtils.getToken(request);
        String username = this.tokenUtils.getUsernameFromToken(token);
        User user = (User) this.userDetailsService.loadUserByUsername(username);

        if (this.tokenUtils.canTokenBeRefreshed(token, user.getLastPasswordResetDate())) {
            String refreshedToken = tokenUtils.refreshToken(token);
            int expiresIn = tokenUtils.getExpiredIn();

            return ResponseEntity.ok(new UserTokenStateDto(refreshedToken, expiresIn));
        } else {
            UserTokenStateDto userTokenStateDTO = new UserTokenStateDto();
            return ResponseEntity.badRequest().body(userTokenStateDTO);
        }
    }
}
