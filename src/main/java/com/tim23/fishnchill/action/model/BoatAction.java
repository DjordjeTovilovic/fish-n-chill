package com.tim23.fishnchill.action.model;

import com.tim23.fishnchill.boat.model.Boat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class BoatAction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime reservationStart;

    private LocalDateTime reservationEnd;

    private Float actionPrice;

    private Float actualPrice;

    private Integer numberOfGuests;

    private LocalDateTime actionEnd;

    @ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    private Boat entity;
}
