package com.tim23.fishnchill.user.model;

import com.tim23.fishnchill.general.model.BaseEntity;
import com.tim23.fishnchill.general.model.enums.ClientResponseType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ClientResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String explanation;

    private boolean isApproved;

    @Enumerated(EnumType.STRING)
    private ClientResponseType responseType;

    @ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    private Client client;

    @ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    private BaseEntity entity;

    @ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    private User owner;
}
