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
import com.tim23.fishnchill.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
import java.net.URI;
import java.util.Calendar;
import java.util.UUID;

//Kontroler zaduzen za autentifikaciju korisnika
@AllArgsConstructor
@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {

    private final TokenUtils tokenUtils;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final UserService userService;
    private final ClientService clientService;

    @Autowired
    private MailService emailService;

    @Autowired
    private VerificationTokenService verificationTokenService;

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
    public ResponseEntity<User> addUser(@Valid @RequestBody RegistrationDto registrationDTO) {
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
                e.printStackTrace();
            }
            return new ResponseEntity<>(client, HttpStatus.CREATED);
        } else {
            User user = this.userService.save(registrationDTO);
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        }
    }

    @RequestMapping(value = "/verify-account", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<User> confirmUserAccount(@RequestParam("token") String verificationToken) throws Exception {
        VerificationToken token = verificationTokenService.findByToken(verificationToken);
        if (token == null) {
            URI frontend = new URI("http://localhost:3000/signup/invalid/");
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setLocation(frontend);
            return new ResponseEntity<>(null, httpHeaders, HttpStatus.SEE_OTHER);
        }
        Client client = token.getClient();
        Calendar cal = Calendar.getInstance();
        if ((token.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            this.clientService.deleteClient(client);
            URI frontend = new URI("http://localhost:3000/signup/expired/");
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setLocation(frontend);
            return new ResponseEntity<>(null, httpHeaders, HttpStatus.SEE_OTHER);
        }

        client.setEnabled(true);
        client = this.clientService.saveClient(client);
        this.verificationTokenService.delete(token);
        URI frontend = new URI("http://localhost:3000/signup/success/");
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(frontend);
        return new ResponseEntity<>(client, httpHeaders, HttpStatus.SEE_OTHER);
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
