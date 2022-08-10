package com.tim23.fishnchill.user.model;

import com.tim23.fishnchill.general.model.Rating;
import com.tim23.fishnchill.general.model.VerificationToken;
import com.tim23.fishnchill.reservation.model.CottageReservation;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Client extends User {


    private Integer penaltyCount;

    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<CottageReservation> cottageReservations;

    @OneToOne(mappedBy = "client", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private VerificationToken verificationToken;

    @OneToMany(mappedBy = "entity", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Rating> ratings;


    public Client(User u) {
        super(u);
        this.penaltyCount = 0;
    }

    public void printInfo() {
        System.out.println(
                "username: " + this.getUsername() +
                        "\nfn: " + this.getFirstName() +
                        "\nln: " + this.getLastName() +
                        "\nemail: " + this.getEmail() +
                        "\ncountry: " + this.getCountry() +
                        "\ncity: " + this.getCity() +
                        "\naddress: " + this.getAddress() +
                        "\nphone: " + this.getPhoneNumber() +
                        "\npenalty: " + this.getPenaltyCount());
    }

    public Integer getPenaltyCount() {
        return this.penaltyCount;
    }

    public void setPenaltyCount(int i) {
        this.penaltyCount = i;
    }

    public Set<Rating> getRatings() {
        return this.ratings;
    }
}
