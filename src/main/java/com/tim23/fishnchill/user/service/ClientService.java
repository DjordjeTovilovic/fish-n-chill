package com.tim23.fishnchill.user.service;

import com.tim23.fishnchill.general.exception.ResourceNotFoundException;
import com.tim23.fishnchill.general.model.enums.UserResponseType;
import com.tim23.fishnchill.user.dto.ClientDto;
import com.tim23.fishnchill.user.dto.RegistrationDto;
import com.tim23.fishnchill.user.dto.UpdateDto;
import com.tim23.fishnchill.user.model.Authority;
import com.tim23.fishnchill.user.model.Client;
import com.tim23.fishnchill.user.repository.ClientRepository;
import com.tim23.fishnchill.user.repository.UserResponseRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.LockModeType;
import java.util.List;

@AllArgsConstructor
@Configuration
@EnableAsync
@Service
public class ClientService {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthorityService authService;
    @Autowired
    private UserResponseRepository userResponseRepository;

    public List<ClientDto> findAll() {
        TypeToken<List<ClientDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(clientRepository.findAll(), typeToken.getType());
    }

    public ClientDto findById(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client", id));
        ClientDto clientDto = modelMapper.map(client, ClientDto.class);
        clientDto.setDeleteRequest(userResponseRepository.existsByUserIdAndResponseType(clientDto.getId(), UserResponseType.ACCOUNTDELETIONREQUEST));
        return clientDto;
    }

    public Client saveClient(Client c) {
        return this.clientRepository.save(c);
    }

    @Transactional
    public Client save(RegistrationDto registrationDTO) {
        Client c = new Client();
        c.setUsername(registrationDTO.getUsername());
        // pre nego sto postavimo lozinku u atribut hesiramo je
        c.setPassword(passwordEncoder.encode(registrationDTO.getPassword()));
        c.setFirstName(registrationDTO.getFirstName());
        c.setLastName(registrationDTO.getLastName());
        c.setEmail(registrationDTO.getEmail());
        c.setCountry(registrationDTO.getCountry());
        c.setCity(registrationDTO.getCity());
        c.setAddress(registrationDTO.getAddress());
        c.setPhoneNumber(registrationDTO.getPhoneNumber());
        c.setPenaltyCount(0);
        c.setLoyaltyPoints(0);
        c.setEnabled(false);

        List<Authority> auth = authService.findByName("ROLE_CLIENT");
        c.setAuthorities(auth);

        return this.clientRepository.save(c);
    }

    public void deleteClient(Client client) {
        this.clientRepository.delete(client);
    }

    public Client update(UpdateDto updateDto, Client client) {
        if (!client.getUsername().equals(updateDto.getUsername()) && updateDto.getUsername() != null)
            client.setUsername(updateDto.getUsername());
        if (!client.getFirstName().equals(updateDto.getFirstName()) && updateDto.getFirstName() != null)
            client.setFirstName(updateDto.getFirstName());
        if (!client.getLastName().equals(updateDto.getLastName()) && updateDto.getLastName() != null)
            client.setLastName(updateDto.getLastName());
        if (!client.getCountry().equals(updateDto.getCountry()) && updateDto.getCountry() != null)
            client.setCountry(updateDto.getCountry());
        if (!client.getCity().equals(updateDto.getCity()) && updateDto.getCity() != null)
            client.setCity(updateDto.getCity());
        if (!client.getAddress().equals(updateDto.getAddress()) && updateDto.getAddress() != null)
            client.setAddress(updateDto.getAddress());
        if (!client.getPhoneNumber().equals(updateDto.getPhoneNumber()) && updateDto.getPhoneNumber() != null)
            client.setPhoneNumber(updateDto.getPhoneNumber());

        return this.clientRepository.save(client);
    }

    public Client changePassword(String newPassword, Client client) {
        client.setPassword(passwordEncoder.encode(newPassword));

        return this.clientRepository.save(client);
    }

    public void deleteClientById(Long id) {
        this.clientRepository.deleteById(id);
    }

    @Async
    @Scheduled(cron = "0 0 0 1 1/1 *")
    public void resetPenalties() {
        System.out.println("Reseting penalties every 1st in month!");
        clientRepository.resetPenalties();
    }

    public Client penalize(Long id) {
        Client client = clientRepository.getById(id);
        client.setPenaltyCount(client.getPenaltyCount() + 1);
        return clientRepository.save(client);
    }
}
