package com.tim23.fishnchill.cottage.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tim23.fishnchill.action.model.CottageAction;
import com.tim23.fishnchill.general.model.BaseEntity;
import com.tim23.fishnchill.reservation.model.CottageReservation;
import com.tim23.fishnchill.user.model.CottageOwner;
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

public class Cottage extends BaseEntity {

    @OneToMany(mappedBy = "entity", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<CottageReservation> reservations;

    @OneToMany(mappedBy = "cottage", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Room> rooms;
    @JsonIgnore
    //@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    private CottageOwner owner;

    @OneToMany(mappedBy = "entity", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<CottageAction> actions;



}
