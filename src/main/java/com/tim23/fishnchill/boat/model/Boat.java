package com.tim23.fishnchill.boat.model;

import com.tim23.fishnchill.general.model.BaseEntity;
import com.tim23.fishnchill.user.model.BoatOwner;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Boat extends BaseEntity {

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private BoatSpecification boatSpecification;

    private String gps;

    private String radar;

    private String vhf;

    private String fishFinder;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private BoatOwner owner;

    //TODO Pecaroska oprema
}
