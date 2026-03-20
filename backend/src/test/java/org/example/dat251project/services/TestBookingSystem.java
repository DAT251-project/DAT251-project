package org.example.dat251project.services;

import org.example.dat251project.models.Restaurant;
import org.example.dat251project.models.Tables;
import org.example.dat251project.repositories.BookingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class TestBookingSystem {
    private Restaurant restaurant;
    @Mock
    private BookingRepository bookingRepo;


    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        restaurant = new Restaurant();
        List<Tables> restTables = new ArrayList<>();
        restTables.add(new Tables("T1", 4, false));
        restTables.add(new Tables("T2", 2, false));
        restTables.add(new Tables("T3", 4, false));
        restTables.add(new Tables("T4", 2, false));
        restTables.add(new Tables("T5", 4, false));
        restTables.add(new Tables("T6", 4, false));
        restaurant.setTables(restTables);

    }

    @Test
    public void remainingSeatsNonNegative() {
        Integer negativeSeat = -5;
        restaurant.setTableCapacity(negativeSeat);
        assertThrows(IllegalArgumentException.class, () ->
                new BookingSystem(bookingRepo, restaurant));
    }

    @Test
    public void timeSlotWithinOpeningHours() {
        List<LocalTime> timeSlots = new ArrayList<>();
        timeSlots.add(LocalTime.of(23, 0, 0));
        timeSlots.add(LocalTime.of(20, 30, 21));
        OpeningHours openingHours = new OpeningHours(
                LocalTime.of(9, 0, 0),
                LocalTime.of(22, 0, 0));
        restaurant.setTimeSlots(timeSlots);
        restaurant.setTableCapacity(5);
        restaurant.setNormalOpeningHours(openingHours);
        assertThrows(IllegalArgumentException.class, () ->
                new BookingSystem(bookingRepo, restaurant));

    }

    @Test
    public void checkAvailability() {
        // Set up timeslots and opening hours
        List<LocalTime> timeSlots = List.of(LocalTime.of(18, 0), LocalTime.of(20, 30));
        OpeningHours openingHours = new OpeningHours(LocalTime.of(9, 0), LocalTime.of(23, 0));
        restaurant.setNormalOpeningHours(openingHours);
        restaurant.setTableCapacity(5);
        restaurant.setTimeSlots(timeSlots);
        BookingSystem bookingSystem = new BookingSystem(bookingRepo, restaurant);

        // If refactor to using DTO, remember to change it here as well
        LocalDate date = LocalDate.of(2026, 3, 10);
        LocalTime time = LocalTime.of(18, 0);
        int numGuests = 2;

        // Mock the repository to return 0 guests that are in the restaurant at that time
        Mockito.when(bookingRepo.sumGuestsByDateAndTime(date, time)).thenReturn(0);

        assertTrue(bookingSystem.createBooking(date, time, numGuests));
    }

    @Test
    public void testSmallBooking() {
        // Set up timeslots and opening hours
        List<LocalTime> timeSlots = List.of(LocalTime.of(18, 0), LocalTime.of(20, 30));
        OpeningHours openingHours = new OpeningHours(LocalTime.of(9, 0), LocalTime.of(23, 0));
        restaurant.setNormalOpeningHours(openingHours);
        restaurant.setTableCapacity(20);
        restaurant.setTimeSlots(timeSlots);

        BookingSystem bookingSystem = new BookingSystem(bookingRepo, restaurant);
        Tables table2 = restaurant.getTables().get(1);
        Tables table4 = restaurant.getTables().get(3);
        List<Tables> smallTables = new ArrayList<>();
        smallTables.add(table2);
        smallTables.add(table4);
        bookingSystem.setSmallTables(smallTables);


        LocalDate date = LocalDate.of(2026, 3, 10);
        LocalTime time = LocalTime.of(18, 0);
        int numGuests = 2;

        Mockito.when(bookingRepo.sumGuestsByDateAndTime(date, time)).thenReturn(0);
        List<Tables> booking1 = bookingSystem.findBooking(date, time, numGuests);
        assertEquals(1, booking1.size());
        assertEquals("T2", booking1.getFirst().getName());

        List<Tables> booking2 = bookingSystem.findBooking(date, time, 1);
        assertEquals(1, booking2.size());
        assertEquals("T4", booking2.getFirst().getName());

    }

    @Test
    public void testBigBooking() {

    }

    @Test
    public void testComboBooking() {}
}
