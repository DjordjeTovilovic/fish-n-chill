package com.tim23.fishnchill.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tim23.fishnchill.adventure.model.Adventure;
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
public class AdventureOwner extends User {
    @JsonIgnore
    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Adventure> entities;
}
