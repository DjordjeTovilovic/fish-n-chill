package com.tim23.fishnchill.general.service;

import com.tim23.fishnchill.action.model.AdventureAction;
import com.tim23.fishnchill.action.model.BoatAction;
import com.tim23.fishnchill.action.model.CottageAction;
import com.tim23.fishnchill.general.model.BaseEntity;
import com.tim23.fishnchill.general.model.VerificationToken;
import com.tim23.fishnchill.reservation.model.AdventureReservation;
import com.tim23.fishnchill.reservation.model.BoatReservation;
import com.tim23.fishnchill.reservation.model.CottageReservation;
import com.tim23.fishnchill.reservation.model.Reservation;
import com.tim23.fishnchill.user.model.Client;
import com.tim23.fishnchill.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Configuration
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EnableAsync
@Service
public class MailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String email;

    @Async
    public void sendVerificationEmail(VerificationToken verificationToken) throws MailException {
        System.out.println("Sending email...");

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(verificationToken.getClient().getEmail());
        mail.setFrom(email);
        mail.setSubject("Account verification");
        mail.setText("Hello " + verificationToken.getClient().getFirstName()
                + ",\n\nPlease click the following link to verify your account: \n"
                + "http://localhost:3000/signup/verify/" + verificationToken.getToken());
        javaMailSender.send(mail);

        System.out.println("Email sent!");
    }

    @Async
    public void sendCottageReservationEmail(Client client, CottageReservation reservation) throws MailException, InterruptedException {
        System.out.println("Sending reservation email...");

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(client.getEmail());
        mail.setFrom(email);
        mail.setSubject("Cottage reservation information");
        mail.setText("Hello " + client.getFirstName() + ",\n\n"
                + "You scheduled a reservation for a cottage." + "\n\n"
                + "This is the following information:" + "\n\n"
                + "Client: " + client.getFirstName() + " " + client.getLastName() + "\n"
                + "Email: " + client.getEmail() + "\n\n"
                + "RESERVATION INFORMATION: \n"
                + "Cottage: " + reservation.getEntity().getName() + "\n"
                + "Address: " + reservation.getEntity().getAddress() + "\n"
                + "Number of guests: " + reservation.getNumberOfGuests() + "\n"
                + "Price: " + reservation.getPrice() + "€\n"
        );
        javaMailSender.send(mail);

        System.out.println("Reservation Email sent!");
    }

    @Async
    public void sendBoatReservationEmail(Client client, BoatReservation reservation) throws MailException, InterruptedException{
        System.out.println("Sending reservation email...");

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(client.getEmail());
        mail.setFrom(email);
        mail.setSubject("Cottage reservation information");
        mail.setText("Hello " + client.getFirstName() + ",\n\n"
                + "You scheduled a reservation for a boat." + "\n\n"
                + "This is the following information:" + "\n\n"
                + "Client: " + client.getFirstName() + " " + client.getLastName() + "\n"
                + "Email: " + client.getEmail() + "\n\n"
                + "RESERVATION INFORMATION: \n"
                + "Boat: " + reservation.getEntity().getName() + "\n"
                + "Address: " + reservation.getEntity().getAddress() + "\n"
                + "Number of guests: " + reservation.getNumberOfGuests() + "\n"
                + "Price: " + reservation.getPrice() + "€\n"
        );
        javaMailSender.send(mail);

        System.out.println("Reservation Email sent!");
    }

    @Async
    public void sendAdventureReservationEmail(Client client, AdventureReservation reservation) throws MailException, InterruptedException{
        System.out.println("Sending reservation email...");

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(client.getEmail());
        mail.setFrom(email);
        mail.setSubject("Cottage reservation information");
        mail.setText("Hello " + client.getFirstName() + ",\n\n"
                + "You scheduled a reservation for an adventure." + "\n\n"
                + "This is the following information:" + "\n\n"
                + "Client: " + client.getFirstName() + " " + client.getLastName() + "\n"
                + "Email: " + client.getEmail() + "\n\n"
                + "RESERVATION INFORMATION: \n"
                + "Adventure: " + reservation.getEntity().getName() + "\n"
                + "Address: " + reservation.getEntity().getAddress() + "\n"
                + "Number of guests: " + reservation.getNumberOfGuests() + "\n"
                + "Price: " + reservation.getPrice() + "€\n"
        );
        javaMailSender.send(mail);

        System.out.println("Reservation Email sent!");
    }

    @Async
    public void sendNewCottageActionEmail(Client client, CottageAction cottageAction) throws MailException {
        Integer discount = Math.round(((cottageAction.getActualPrice()-cottageAction.getActionPrice())/cottageAction.getActualPrice())*100);

        System.out.println("New cottage action email...");

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(client.getEmail());
        mail.setFrom(email);
        mail.setSubject("Subscribed cottage action!");
        mail.setText("Hello " + client.getFirstName() + ",\n\n"
                + "There is a new action for a cottage that you are subscribed to." + "\n\n"
                + "COTTAGE:" + "\n\n"
                + "Name: " + cottageAction.getEntity().getName() + "\n"
                + "Address: " + cottageAction.getEntity().getAddress() + "\n\n"
                + "ACTION: \n"
                + "Actual price: " + cottageAction.getActualPrice() + "€\n"
                + "Action price: " + cottageAction.getActionPrice() + "€\n"
                + "Discount: " + discount + "%\n"
                + "Reservation start: " + cottageAction.getReservationStart() + "\n"
                + "Reservation end: " + cottageAction.getReservationEnd() + "\n"
        );
        javaMailSender.send(mail);

        System.out.println("New cottage action Email sent!");
    }

    @Async
    public void sendNewBoatActionEmail(Client client, BoatAction boatAction) throws MailException{
        Integer discount = Math.round(((boatAction.getActualPrice()-boatAction.getActionPrice())/boatAction.getActualPrice())*100);

        System.out.println("New boat action email...");

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(client.getEmail());
        mail.setFrom(email);
        mail.setSubject("Subscribed boat action!");
        mail.setText("Hello " + client.getFirstName() + ",\n\n"
                + "There is a new action for a boat that you are subscribed to." + "\n\n"
                + "BOAT:" + "\n\n"
                + "Name: " + boatAction.getEntity().getName() + "\n"
                + "Address: " + boatAction.getEntity().getAddress() + "\n\n"
                + "ACTION: \n"
                + "Actual price: " + boatAction.getActualPrice() + "€\n"
                + "Action price: " + boatAction.getActionPrice() + "€\n"
                + "Discount: " + discount + "%\n"
                + "Reservation start: " + boatAction.getReservationStart() + "\n"
                + "Reservation end: " + boatAction.getReservationEnd() + "\n"
        );
        javaMailSender.send(mail);

        System.out.println("New boat action Email sent!");
    }

    @Async
    public void sendNewAdventureActionEmail(Client client, AdventureAction adventureAction) throws MailException{
        Integer discount = Math.round(((adventureAction.getActualPrice()-adventureAction.getActionPrice())/adventureAction.getActualPrice())*100);

        System.out.println("New adventure action email...");

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(client.getEmail());
        mail.setFrom(email);
        mail.setSubject("Subscribed adventure action!");
        mail.setText("Hello " + client.getFirstName() + ",\n\n"
                + "There is a new action for an adventure that you are subscribed to." + "\n\n"
                + "ADVENTURE:" + "\n\n"
                + "Name: " + adventureAction.getEntity().getName() + "\n"
                + "Address: " + adventureAction.getEntity().getAddress() + "\n\n"
                + "ACTION: \n"
                + "Actual price: " + adventureAction.getActualPrice() + "€\n"
                + "Action price: " + adventureAction.getActionPrice() + "€\n"
                + "Discount: " + discount + "%\n"
                + "Reservation start: " + adventureAction.getReservationStart() + "\n"
                + "Reservation end: " + adventureAction.getReservationEnd() + "\n"
        );
        javaMailSender.send(mail);

        System.out.println("New boat action Email sent!");
    }

    @Async
    public void sendAccountDeletionEmail(User user) throws MailException {
        System.out.println("Sending acc deletion email...");

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(user.getEmail());
        mail.setFrom(email);
        mail.setSubject("Account deletion approved");
        mail.setText("Hello " + user.getFirstName() + user.getLastName() + ",\n\n"
                + "Your account deletion request is approved." + "\n\n"
                + "The account with the following information is deleted:" + "\n\n"
                + "Username: " + user.getUsername() + "\n"
                + "Email: " + user.getEmail() + "\n\n"
                + "If you ever want to use our services, just sign up again on our signup page: \n"
                + "http://localhost:3000/signup" + "\n\n"
                + "Best regards," + "\n"
                + "FishNChill" + "\n"
        );
        javaMailSender.send(mail);

        System.out.println("Acc deletion Email sent!");
    }


    public void sendClientRevisionEmail(User owner, User client, String revision, BaseEntity entity, Reservation reservation) throws MailException {
        System.out.println("Sending client revision email...");

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(owner.getEmail());
        mail.setFrom(email);
        mail.setSubject("Client revision");
        mail.setText("Hello " + owner.getFirstName() + " " + owner.getLastName() + ",\n\n"
                + "A client has written a revision for one of your entities you own" + "\n\n"
                + "REVISION:" + "\n"
                + revision + "\n\n"
                + "ENTITY:" + "\n"
                + "Name: " + entity.getName() + "\n"
                + "Price per day: " + entity.getPrice() + "€\n"
                + "Rating: " + entity.getRatingAverage() + "\n\n"
                + "RESERVATION:" + "\n"
                + "Reservation start: " + reservation.getReservationStart() + "\n"
                + "Reservation end: " + reservation.getReservationEnd() + "\n"
                + "Number of guests: " + reservation.getNumberOfGuests() + "\n\n"
                + "CLIENT: " + "\n"
                + "Username: " + client.getUsername() + "\n"
                + "Email: " + client.getEmail() + "\n\n"
                + "We hope this revision has some meaning to you! \n\n"
                + "Best regards," + "\n"
                + "FishNChill" + "\n"
        );
        javaMailSender.send(mail);

        System.out.println("Client revision Email sent!");
    }

    public void sendAnswerToClientComplaintEmail(User owner, User client, String answer, String complaint, BaseEntity entity, Reservation reservation) throws MailException {
        System.out.println("Sending client complaint answer email...");

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(client.getEmail());
        mail.setCc(owner.getEmail());
        mail.setFrom(email);
        mail.setSubject("Client revision");
        mail.setText("Hello client " + client.getFirstName() + " " + client.getLastName() + ",\n"
                + "And hello owner " + owner.getFirstName() + " " + owner.getLastName() + ",\n\n"
                + "(This email is sent to both sides, the client and the owner)" + "\n"
                + "A client has written a complaint for one of the owners entities or services." + "\n\n"
                + "COMPLAINT:" + "\n"
                + complaint + "\n\n"
                + "OWNER: " + "\n"
                + "Username: " + owner.getUsername() + "\n"
                + "Email: " + owner.getEmail() + "\n\n"
                + "ENTITY:" + "\n"
                + "Name: " + entity.getName() + "\n"
                + "Price per day: " + entity.getPrice() + "€\n"
                + "Rating: " + entity.getRatingAverage() + "\n\n"
                + "RESERVATION:" + "\n"
                + "Reservation start: " + reservation.getReservationStart() + "\n"
                + "Reservation end: " + reservation.getReservationEnd() + "\n"
                + "Number of guests: " + reservation.getNumberOfGuests() + "\n\n"
                + "CLIENT: " + "\n"
                + "Username: " + client.getUsername() + "\n"
                + "Email: " + client.getEmail() + "\n\n"
                + "One of our administrators has answered the complaint:" + "\n"
                + "ANSWER: " + "\n"
                + answer + "\n\n"
                + "We hope this answer clarifies everything for both sides! \n\n"
                + "Best regards," + "\n"
                + "FishNChill" + "\n"
        );
        javaMailSender.send(mail);

        System.out.println("Client complaint answer Email sent!");
    }

    public void sendClientOwnerReportAnswer(Client client, LocalDateTime start, LocalDateTime end) throws MailException {
        System.out.println("Sending client report email...");

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(client.getEmail());
        mail.setFrom(email);
        mail.setSubject("Client revision");
        mail.setText("Hello " + client.getFirstName() + " " + client.getLastName() + ",\n\n"
                + "A owner has written a report for one of your reservations in period " + start.toLocalDate() + " to " + end.toLocalDate() + "\n\n"
                + "After detail review we must penalize you for misbehavior. "+ "\n\n"
                + "We hope this won't affect your user experience! \n"
                + "Best regards," + "\n"
                + "FishNChill" + "\n"
        );
        javaMailSender.send(mail);

        System.out.println("Client report Email sent!");
    }

}
