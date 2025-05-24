package org.example.backend.dto;
import lombok.Data;

@Data
public class UserProfile {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
}