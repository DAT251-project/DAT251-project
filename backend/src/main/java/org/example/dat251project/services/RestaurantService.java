package org.example.dat251project.services;

import org.example.dat251project.models.Restaurant;
import org.example.dat251project.repositories.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.*;

@Service
public class RestaurantService {
    @Autowired
    RestaurantRepository restaurantRepo;

    public Restaurant createRestaurant(String name, String address, Integer phonenumber,
                                       Integer tableCapacity, OpeningHours opHours, Integer minuteInterval,
                                       Set<DayOfWeek> closedDays) {
        if (restaurantRepo.findByName(name).isEmpty()) {
            Map<DayOfWeek, OpeningHours> openingDays = generateOpeningDays(opHours, closedDays);
            Restaurant restaurant = new Restaurant(
                    name, address, phonenumber, tableCapacity, openingDays, opHours,
                    generateTimeSlots(opHours, minuteInterval)
            );
            restaurantRepo.save(restaurant);
            return restaurant;
        }
        return null;
    }

    private List<LocalTime> generateTimeSlots(OpeningHours opHours, Integer minuteInterval) {
        // Add timeslot for every 30 minutes
        List<LocalTime> timeSlots = new ArrayList<>();
        LocalTime current = opHours.getOpen();
        while (!current.isAfter(opHours.getClose())) {
            timeSlots.add(current);
            current = current.plusMinutes(minuteInterval);
        }
        return timeSlots;
    }

    private Map<DayOfWeek, OpeningHours> generateOpeningDays(OpeningHours normalOpeningHours, Set<DayOfWeek> closedDays) {
        Map<DayOfWeek, OpeningHours> openingDays = new HashMap<>();
        for (DayOfWeek day : DayOfWeek.values()) {
            // Don't add closed days
            if (!closedDays.contains(day)) {
                openingDays.put(day, normalOpeningHours);
            }
        }
        return openingDays;
    }
}
