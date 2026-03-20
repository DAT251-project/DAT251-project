package org.example.dat251project.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.dat251project.configs.Role;

import java.util.UUID;

@Entity
@Table(name= "tables")
@Getter
@Setter
@NoArgsConstructor
public class Tables {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @NotNull
    private String name;
    @NotNull
    private Integer numOfSeats;
    @NotNull
    private boolean occupied;

    public Tables(String name, Integer numOfSeats, boolean occupied) {
        this.name = name;
        this.numOfSeats = numOfSeats;
        this.occupied = occupied;
    }
}
