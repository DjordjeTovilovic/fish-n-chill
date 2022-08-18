package com.tim23.fishnchill.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tim23.fishnchill.boat.model.Boat;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
@Getter
@Setter
public class BoatOwner extends User {
    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY, cascade = CascadeType.ALL)

    @JsonIgnore
    private Set<Boat> entities;
}
