package com.tim23.fishnchill.adventure;

import com.tim23.fishnchill.general.model.BaseEntity;
import com.tim23.fishnchill.user.model.AdventureOwner;
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
public class Adventure extends BaseEntity {

    private String biography;

    //TODO Pecaroska oprema

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private AdventureOwner owner;
}
