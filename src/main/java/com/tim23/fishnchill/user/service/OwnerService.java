package com.tim23.fishnchill.user.service;

import com.tim23.fishnchill.general.model.Report;
import com.tim23.fishnchill.general.model.enums.OwnerReportType;
import com.tim23.fishnchill.general.service.ReportService;
import com.tim23.fishnchill.reservation.dto.CottageOwnerCottageReservationDto;
import com.tim23.fishnchill.reservation.dto.NewReportDto;
import com.tim23.fishnchill.reservation.model.CottageReservation;
import com.tim23.fishnchill.reservation.model.Reservation;
import com.tim23.fishnchill.reservation.repository.CottageReservationRepository;
import com.tim23.fishnchill.user.dto.RegistrationDto;
import com.tim23.fishnchill.user.model.*;
import com.tim23.fishnchill.user.repository.*;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class OwnerService {
    private ModelMapper modelMapper;
    private CottageOwnerRepository cottageOwnerRepository;
    private CottageReservationRepository cottageReservationRepository;
    private BoatOwnerRepository boatOwnerRepository;
    private AdventureOwnerRepository adventureOwnerRepository;
    private UserRepository userRepository;
    private AuthorityRepository authorityRepository;
    private ClientService clientService;
    private ReportService reportService;


//TODO: ovo treba prebaciti samo za ownere, sad trazi sve neaktivirane korniske

    public List<User> getAllInactiveOwners(){
        return userRepository.findAllByEnabledFalse();
    }

    public ResponseEntity<?> save(RegistrationDto registrationDto){
        if(registrationDto.getRole().equals("cottage_owner")){
            CottageOwner cottageOwner = new CottageOwner();
            modelMapper.map(registrationDto,cottageOwner);

            Authority auth = authorityRepository.findByName("ROLE_COTTAGE_OWNER");
            List<Authority>auths = new ArrayList<>();
            auths.add(auth);
            cottageOwner.setAuthorities(auths);

            cottageOwnerRepository.save(cottageOwner);

            return new ResponseEntity<>(cottageOwner, HttpStatus.OK);

        }

        if(registrationDto.getRole().equals("boat_owner")){
            BoatOwner boatOwner = new BoatOwner();
            modelMapper.map(registrationDto,boatOwner);

            Authority auth = authorityRepository.findByName("ROLE_BOAT_OWNER");
            List<Authority>auths = new ArrayList<>();
            auths.add(auth);
            boatOwner.setAuthorities(auths);

            boatOwnerRepository.save(boatOwner);
            return new ResponseEntity<>(boatOwner, HttpStatus.OK);
        }


        if(registrationDto.getRole().equals( "adventure_owner")){
            AdventureOwner adventureOwner = new AdventureOwner();
            modelMapper.map(registrationDto,adventureOwner);

            Authority auth = authorityRepository.findByName("ROLE_ADVENTURE_OWNER");
            List<Authority>auths = new ArrayList<>();
            auths.add(auth);
            adventureOwner.setAuthorities(auths);

            adventureOwnerRepository.save(adventureOwner);
            return new ResponseEntity<>(adventureOwner, HttpStatus.OK);
        }


        return new ResponseEntity<>(null, HttpStatus.OK);

    }

    public List<CottageOwnerCottageReservationDto> findAllActiveCottageOwnerReservations(Long ownerId) {
        CottageOwner owner = cottageOwnerRepository.getById(ownerId);
        List<Reservation> reservations = new ArrayList<>();
        owner.getEntities().forEach(cottage -> reservations.addAll(cottageReservationRepository
                .findAllByEntityIdAndReservationStartBeforeAndReservationEndAfter(cottage.getId(), LocalDateTime.now(), LocalDateTime.now()))
        );

        TypeToken<List<CottageOwnerCottageReservationDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(reservations, typeToken.getType());
    }

    public List<CottageOwnerCottageReservationDto> findAllPastCottageOwnerReservations(Long ownerId) {
        CottageOwner owner = cottageOwnerRepository.getById(ownerId);
        List<Reservation> reservations = new ArrayList<>();
        owner.getEntities().forEach(cottage -> reservations.addAll(cottageReservationRepository
                .findAllByEntityIdAndReservationEndBefore(cottage.getId(), LocalDateTime.now()))
        );

        TypeToken<List<CottageOwnerCottageReservationDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(reservations, typeToken.getType());
    }

    public void makeReport(NewReportDto newReportDto) {
        CottageReservation reservation = cottageReservationRepository.getById(newReportDto.getReservationId());
        reservation.setOwnerReport(newReportDto.getOwnerReport());
        cottageReservationRepository.save(reservation);
        Client client = reservation.getClient();

        if (newReportDto.getOwnerReportType() == OwnerReportType.DIDNOTCOME) {
            clientService.penalize(client.getId());
        } else if (newReportDto.getOwnerReportType() == OwnerReportType.COMPLAINT) {
            Report report = new Report();
            report.setReport(newReportDto.getOwnerReport());
            report.setClient(client);
            reportService.save(report);
        }
    }
}
