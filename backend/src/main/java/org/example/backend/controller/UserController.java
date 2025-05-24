package org.example.backend.controller;

import org.example.backend.dto.AnnouncementDto;
import org.example.backend.dto.UserProfile;
import org.example.backend.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @GetMapping("/{email}")
    public ResponseEntity<UserProfile> getUserProfileResponseByEmail(@PathVariable String email) {
        UserProfile userProfileResponse = userDetailsService.getUserProfileResponseByEmail(email);
        return userProfileResponse != null ? ResponseEntity.ok(userProfileResponse) : ResponseEntity.notFound().build();
    }
    @PutMapping("/{email}")
    public ResponseEntity<UserProfile> updateUserProfile(@PathVariable String email, @RequestBody UserProfile userProfile) {
        UserProfile updatedUserProfile = userDetailsService.updateUserProfile(email, userProfile);
        return updatedUserProfile != null ? ResponseEntity.ok(updatedUserProfile) : ResponseEntity.notFound().build();
    }

}
