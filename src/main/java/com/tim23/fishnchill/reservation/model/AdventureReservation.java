package com.tim23.fishnchill.reservation.model;

import com.tim23.fishnchill.adventure.model.Adventure;
import com.tim23.fishnchill.user.model.Client;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AdventureReservation extends Reservation{
    @ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    private Client client;

    @ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    private Adventure entity;

    private String ownerReport;
}
