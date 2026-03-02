package org.example.dat251project.services;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ClosingDay {
    private LocalDate date;
    private boolean isClosed;

    public ClosingDay(LocalDate date, boolean isClosed) {
        this.date = date;
        this.isClosed = isClosed;
    }
}
