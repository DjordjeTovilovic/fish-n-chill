package com.tim23.fishnchill.action.model;

import com.tim23.fishnchill.cottage.model.Cottage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CottageAction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime reservationStart;

    private LocalDateTime reservationEnd;

    private Integer duration;

    private BigDecimal price;

    private Integer numberOfGuests;

    private LocalDateTime actionEnd;

    @ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    private Cottage cottage;
}
