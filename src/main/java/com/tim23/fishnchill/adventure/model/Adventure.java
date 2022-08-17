package com.tim23.fishnchill.adventure.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tim23.fishnchill.action.model.AdventureAction;
import com.tim23.fishnchill.general.model.BaseEntity;
import com.tim23.fishnchill.reservation.model.AdventureReservation;
import com.tim23.fishnchill.user.model.AdventureOwner;
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
public class Adventure extends BaseEntity {

    private String biography;

    @OneToMany(mappedBy = "entity", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<AdventureReservation> reservations;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    private AdventureOwner owner;

    @OneToMany(mappedBy = "entity", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<AdventureAction> actions;
}
