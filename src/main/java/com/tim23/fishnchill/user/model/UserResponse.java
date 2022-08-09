package com.tim23.fishnchill.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tim23.fishnchill.general.model.BaseEntity;
import com.tim23.fishnchill.general.model.enums.UserResponseType;
import com.tim23.fishnchill.reservation.model.Reservation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.Null;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class UserResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String explanation;

    @Enumerated(EnumType.STRING)
    private UserResponseType responseType;

    @ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    private User user;

    @ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    private BaseEntity entity;

    @ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    private User owner;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    private Reservation reservation;
}
