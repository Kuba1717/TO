package org.example.backend.mapper;

import org.example.backend.dto.TypeDto;
import org.example.backend.dto.UserProfile;
import org.example.backend.dto.VehicleDto;
import org.example.backend.model.Type;
import org.example.backend.model.User;
import org.example.backend.model.Vehicle;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserMapper {

    public UserProfile toDto(User user) {
        if (user == null) {
            return null;
        }

        UserProfile dto = new UserProfile();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());

        return dto;
    }


/*    public User toEntity(UserProfileResponse dto) {
        if (dto == null) {
            return null;
        }
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());

        return user;
    }
*/
    public void updateEntity(User user, UserProfile dto) {
        if (dto == null || user == null) {
            return;
        }
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
    }
}