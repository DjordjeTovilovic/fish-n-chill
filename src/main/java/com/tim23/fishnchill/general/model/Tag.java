package com.tim23.fishnchill.general.model;

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
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean airCondition;

    private Boolean television;

    private Boolean wifi;

    private Boolean petFriendly;
    
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY    )
    private BaseEntity entity;
}
