package com.tim23.fishnchill.user.service;

import com.tim23.fishnchill.general.exception.ResourceNotFoundException;
import com.tim23.fishnchill.general.model.enums.UserResponseType;
import com.tim23.fishnchill.user.dto.RegistrationDto;
import com.tim23.fishnchill.user.dto.UpdateDto;
import com.tim23.fishnchill.user.dto.UserDto;
import com.tim23.fishnchill.user.model.Authority;
import com.tim23.fishnchill.user.model.User;
import com.tim23.fishnchill.user.repository.UserRepository;
import com.tim23.fishnchill.user.repository.UserResponseRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private AuthorityService authService;
    private ModelMapper modelMapper;
    private UserResponseRepository userResponseRepository;


    public List<UserDto> findAll() throws AccessDeniedException {
        TypeToken<List<UserDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(userRepository.findAll(), typeToken.getType());
    }

    public UserDto findById(Long id) throws AccessDeniedException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", id));
        UserDto userDto = modelMapper.map(user, UserDto.class);
        userDto.setDeleteRequest(userResponseRepository.existsByUserIdAndResponseType(userDto.getId(), UserResponseType.ACCOUNTDELETIONREQUEST));
        return userDto;
    }

    public UserDto findByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) return null;
        return modelMapper.map(user, UserDto.class);
    }

    public User save(RegistrationDto registrationDTO) {
        User u = new User();
        u.setUsername(registrationDTO.getUsername());
        // pre nego sto postavimo lozinku u atribut hesiramo je
        u.setPassword(passwordEncoder.encode(registrationDTO.getPassword()));
        u.setFirstName(registrationDTO.getFirstName());
        u.setLastName(registrationDTO.getLastName());
        u.setEmail(registrationDTO.getEmail());
        u.setCountry(registrationDTO.getCountry());
        u.setCity(registrationDTO.getCity());
        u.setAddress(registrationDTO.getAddress());
        u.setPhoneNumber(registrationDTO.getPhoneNumber());
        // TODO-treba napraviti dio za request ownera koji se salje adminu
        u.setEnabled(true);
        List<Authority> auth;
        if (registrationDTO.getRole().equalsIgnoreCase("cottage_owner")) {
            auth = authService.findByName("ROLE_COTTAGE_OWNER");
            u.setAuthorities(auth);
        }
        if (registrationDTO.getRole().equalsIgnoreCase("boat_owner")) {
            auth = authService.findByName("ROLE_BOAT_OWNER");
            u.setAuthorities(auth);
        }
        if (registrationDTO.getRole().equalsIgnoreCase("adventure_owner")) {
            auth = authService.findByName("ROLE_ADVENTURE_OWNER");
            u.setAuthorities(auth);
        }

        return this.userRepository.save(u);
    }

    public UserDto findByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) return null;
        return modelMapper.map(user, UserDto.class);
    }

    public User saveUser(User user) {
        return this.userRepository.save(user);
    }

    public void deleteUser(User user) {
        this.userRepository.delete(user);
    }


    public User changePassword(String newPassword, User user) {
        user.setPassword(passwordEncoder.encode(newPassword));

        return this.userRepository.save(user);
    }

    public User findByIdPure(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", id));
        return user;
    }

    public User update(UpdateDto updateDto, User user) {
        if (!user.getUsername().equals(updateDto.getUsername()) & updateDto.getUsername() != null)
            user.setUsername(updateDto.getUsername());
        if (!user.getFirstName().equals(updateDto.getFirstName()) & updateDto.getFirstName() != null)
            user.setFirstName(updateDto.getFirstName());
        if (!user.getLastName().equals(updateDto.getLastName()) & updateDto.getLastName() != null)
            user.setLastName(updateDto.getLastName());
        if (!user.getCountry().equals(updateDto.getCountry()) & updateDto.getCountry() != null)
            user.setCountry(updateDto.getCountry());
        if (!user.getCity().equals(updateDto.getCity()) & updateDto.getCity() != null)
            user.setCity(updateDto.getCity());
        if (!user.getAddress().equals(updateDto.getAddress()) & updateDto.getAddress() != null)
            user.setAddress(updateDto.getAddress());
        if (!user.getPhoneNumber().equals(updateDto.getPhoneNumber()) & updateDto.getPhoneNumber() != null)
            user.setPhoneNumber(updateDto.getPhoneNumber());

        return this.userRepository.save(user);
    }

    public void deleteUserById(Long id) {
        this.userRepository.deleteById(id);
    }
}
