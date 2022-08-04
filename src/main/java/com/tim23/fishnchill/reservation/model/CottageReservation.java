package com.tim23.fishnchill.reservation.model;

import com.tim23.fishnchill.cottage.model.Cottage;
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
public class CottageReservation extends Reservation {

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Client client;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Cottage cottage;
}
