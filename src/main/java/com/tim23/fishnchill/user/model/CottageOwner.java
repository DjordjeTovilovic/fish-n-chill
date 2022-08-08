package com.tim23.fishnchill.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tim23.fishnchill.cottage.model.Cottage;
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
public class CottageOwner extends User {
    @JsonIgnore
    //@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Cottage> entities;
}
