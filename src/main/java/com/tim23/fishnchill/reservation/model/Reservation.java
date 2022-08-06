package com.tim23.fishnchill.reservation.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import static javax.persistence.InheritanceType.JOINED;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Inheritance(strategy = JOINED)
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime reservationStart;

    private LocalDateTime reservationEnd;

    private Integer duration;

    private BigDecimal price;

    private Float rating;

    private Integer numberOfGuests;
}
