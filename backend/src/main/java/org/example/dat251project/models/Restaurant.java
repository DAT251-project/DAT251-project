package org.example.dat251project.models;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.dat251project.services.ClosingDay;
import org.example.dat251project.services.OpeningHours;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.Date;
import java.util.HashMap;

@Getter
@Setter
@NoArgsConstructor
@Service
public class Restaurant {
    @NotNull
    private String name;
    @NotNull
    private String address;
    @NotNull
    private Integer phoneNumber;
    // max amount of guests that can be at the restaurant
    @NotNull
    @Size(min = 1)
    private Integer tableCapacity;
    private HashMap<DayOfWeek, OpeningHours> normalOpeningHours;
    private HashMap<Date, ClosingDay> closingDays;

    public Restaurant(String name, String address,
                      Integer phoneNumber, Integer tableCapacity,
                      HashMap<DayOfWeek, OpeningHours> normalOpeningHours,
                      HashMap<Date, ClosingDay> closingDays) {
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.tableCapacity = tableCapacity;
        this.normalOpeningHours = normalOpeningHours;
        this.closingDays = closingDays;
    }
}
