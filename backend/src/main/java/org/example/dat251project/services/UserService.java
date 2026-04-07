package org.example.dat251project.services;

import org.example.dat251project.configs.Role;
import org.example.dat251project.models.User;
import org.example.dat251project.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(String name, String email, String password, Role role) {
        // Can't have two of the same name
        if (userRepo.findByName(name).isEmpty()) {
            User user = new User(name, email, passwordEncoder.encode(password), role);
            userRepo.save(user);
            return user;
        }
        return null;
    }
}
