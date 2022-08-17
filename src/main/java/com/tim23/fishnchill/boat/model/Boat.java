package com.tim23.fishnchill.boat.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tim23.fishnchill.action.model.BoatAction;
import com.tim23.fishnchill.general.model.BaseEntity;
import com.tim23.fishnchill.reservation.model.BoatReservation;
import com.tim23.fishnchill.user.model.BoatOwner;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Boat extends BaseEntity {

    private String gps;

    private String radar;

    private String vhf;

    private String fishFinder;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private BoatSpecification boatSpecification;

    @OneToMany(mappedBy = "entity", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<BoatReservation> reservations;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    private BoatOwner owner;

    @OneToMany(mappedBy = "entity", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<BoatAction> actions;

}
