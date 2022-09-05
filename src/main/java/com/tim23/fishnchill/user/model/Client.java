package com.tim23.fishnchill.user.model;

import com.tim23.fishnchill.general.model.Rating;
import com.tim23.fishnchill.general.model.Report;
import com.tim23.fishnchill.general.model.VerificationToken;
import com.tim23.fishnchill.reservation.model.AdventureReservation;
import com.tim23.fishnchill.reservation.model.BoatReservation;
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

    private Integer loyaltyPoints;

    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<CottageReservation> cottageReservations;

    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<BoatReservation> boatReservations;

    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<AdventureReservation> adventureReservations;

    @OneToOne(mappedBy = "client", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private VerificationToken verificationToken;

    @OneToMany(mappedBy = "entity", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Rating> ratings;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private Set<Report>reports;

    public Client(User u) {
        super(u);
        this.penaltyCount = 0;
        this.loyaltyPoints = 0;
    }

    public Integer getLoyaltyPoints() {
        return this.loyaltyPoints;
    }

    public void setLoyaltyPoints(Integer points){ this.loyaltyPoints = points;}

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
