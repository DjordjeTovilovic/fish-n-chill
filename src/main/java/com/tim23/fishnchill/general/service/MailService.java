package com.tim23.fishnchill.general.service;

import com.tim23.fishnchill.general.model.VerificationToken;
import com.tim23.fishnchill.reservation.model.CottageReservation;
import com.tim23.fishnchill.reservation.model.Reservation;
import com.tim23.fishnchill.user.model.Client;
import com.tim23.fishnchill.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired
    private JavaMailSender javaMailSender;

    /*
     * Koriscenje klase za ocitavanje vrednosti iz application.properties fajla
     */
    @Autowired
    private Environment env;

    /*
     * Anotacija za oznacavanje asinhronog zadatka
     * Vise informacija na: https://docs.spring.io/spring/docs/current/spring-framework-reference/integration.html#scheduling
     */
    @Async
    public void sendVerificationEmail(VerificationToken verificationToken) throws MailException, InterruptedException {
        System.out.println("Sending email...");

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(verificationToken.getClient().getEmail());
        mail.setFrom(env.getProperty("spring.mail.username"));
        mail.setSubject("Account verification");
        mail.setText("Hello " + verificationToken.getClient().getFirstName()
                + ",\n\nPlease click the following link to verify your account: \n"
                + "http://localhost:8080/auth/verify-account?token=" + verificationToken.getToken());
        javaMailSender.send(mail);

        System.out.println("Email sent!");
    }

    @Async
    public void sendCottageReservationEmail(Client client, CottageReservation reservation) throws MailException, InterruptedException {
        System.out.println("Sending reservation email...");

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(client.getEmail());
        mail.setFrom(env.getProperty("spring.mail.username"));
        mail.setSubject("Cottage reservation information");
        mail.setText("Hello " + client.getFirstName() + ",\n\n"
                + "You scheduled a reservation for a cottage." + "\n\n"
                + "This is the following information:" + "\n\n"
                + "Client: " + client.getFirstName() + " " + client.getLastName() + "\n"
                + "Email: " + client.getEmail() + "\n\n"
                + "RESERVATION INFORMATION: \n"
                + "Cottage: " + reservation.getCottage().getName() + "\n"
                + "Address: " + reservation.getCottage().getAddress() + "\n"
                + "Number of guests: " + reservation.getNumberOfGuests() + "\n"
                + "Price: " + reservation.getPrice() + "€\n"
                );
        javaMailSender.send(mail);

        System.out.println("Reservation Email sent!");
    }
}