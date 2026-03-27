package org.example.dat251project.controllers;

import org.example.dat251project.models.Booking;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.net.URL;

@CrossOrigin()
@RestController
@RequestMapping("/")
public class Controller {
    @GetMapping("menu")
    public ResponseEntity<URL> menu() {
        return null;
    }

    @GetMapping("booking")
    public ResponseEntity<String> bookingPage() {
        return null;
    }

    @PostMapping("booking")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        //URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/").toUri();
        return ResponseEntity.status(HttpStatus.CREATED).body(booking);
    }

    @GetMapping("dashboard")
    public ResponseEntity<String> dashboardPage() {
        return null;
    }
}
