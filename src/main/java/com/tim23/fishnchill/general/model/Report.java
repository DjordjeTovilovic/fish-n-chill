package com.tim23.fishnchill.general.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tim23.fishnchill.user.model.Client;
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

public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String report;

    private Boolean resolved = false;

    @ManyToOne(cascade =CascadeType.DETACH, fetch =  FetchType.LAZY)
    private Client client;


}
