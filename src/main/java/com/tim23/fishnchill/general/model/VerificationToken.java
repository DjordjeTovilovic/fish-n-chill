package com.tim23.fishnchill.general.model;

import com.tim23.fishnchill.user.model.Client;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;

@Entity
public class VerificationToken {

    private static final int EXPIRATION = 60 * 24;

    @Id
    @Column(name = "client_id")
    private Long id;

    private String token;

    @OneToOne
    @MapsId
    @JoinColumn(name = "client_id")
    private Client client;

    private Date expiryDate;

    public VerificationToken(String token, Client client) {
        this.token = token;
        this.client = client;
        this.expiryDate = calculateExpiryDate(180);
    }

    public VerificationToken() {

    }

    private Date calculateExpiryDate(int expiryTimeInMinutes) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Timestamp(cal.getTime().getTime()));
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        return new Date(cal.getTime().getTime());
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }
}
