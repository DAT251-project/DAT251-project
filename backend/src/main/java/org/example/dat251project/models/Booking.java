package org.example.dat251project.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @NotNull
    @Email
    private String email;
    @NotNull
    private Integer phoneNumber;
    private int numberGuest;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime time;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private String comment;

    public Booking(String email, Integer phoneNumber, int numberGuest, LocalTime time, Date date, String comment) {
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.numberGuest = numberGuest;
        this.time = time;
        this.date = date;
        this.comment = comment;
    }


    /**
     * Testing below on bruno:
    {
  "comment": "efwefs",
  "date": "2026-02-18",
  "email": "hello@email.com",
  "numberGuest": 2,
  "phoneNumber": "78709870",
  "time": "20:00"
}
     */
}
