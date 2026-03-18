package org.example.dat251project.configs;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter {

    private final UserDetailsService userDetailsService;
    private final JWTService jwtService;


    public JWTFilter(UserDetailsService userDetailsService, JWTService jwtService) {
        this.userDetailsService = userDetailsService;
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");

        //Extract the token from header
        if (header != null && header.startsWith("Bearer ")) {
            //the token starts at index 7
            String token = header.substring(7);
            String username = jwtService.getUsernameByToken(token);


            //Check if username is linked to the token, and whether it hasn't gone through filters
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                //Check whether the token is connected to the UserDetails
                if (jwtService.validateToken(token, userDetails)) {
                    // Translate the jwt token into an authentication token for Spring Security
                    UsernamePasswordAuthenticationToken authToken = new
                            UsernamePasswordAuthenticationToken(
                            userDetails,
                            null, //since we don't use password, but JWT token
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    // Store the authentication details during the request
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        }
        // add it to the chain of filtering, so that we don't need to go through this process again for each filter
        filterChain.doFilter(request, response);
    }
}
