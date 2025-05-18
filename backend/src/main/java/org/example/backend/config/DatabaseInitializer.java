package org.example.backend.config;


import jakarta.transaction.Transactional;
import org.example.backend.model.Role;
import org.example.backend.model.RoleName;
import org.example.backend.model.User;
import org.example.backend.repository.RoleRepository;
import org.example.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@Configuration
public class DatabaseInitializer {

    @Bean
    @Transactional
    public CommandLineRunner initDatabase(
            RoleRepository roleRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            for (RoleName roleName : RoleName.values()) {
                if (roleRepository.findByName(roleName).isEmpty()) {
                    Role role = new Role();
                    role.setName(roleName);
                    roleRepository.save(role);
                }
            }

            if (Boolean.FALSE.equals(userRepository.existsByEmail("admin@example.com"))) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@example.com");
                admin.setPassword(passwordEncoder.encode("admin"));

                Role adminRole = roleRepository.findByName(RoleName.ADMIN)
                        .orElseThrow(() -> new RuntimeException("Error: Admin Role not found."));

                Set<Role> roles = new HashSet<>();
                roles.add(adminRole);
                admin.setRoles(roles);

                userRepository.save(admin);
            }


            if (Boolean.FALSE.equals(userRepository.existsByEmail("1@1.pl"))) {
                User client = new User();
                client.setUsername("123");
                client.setEmail("1@1.pl");
                client.setPassword(passwordEncoder.encode("123456"));

                Role clientRole = roleRepository.findByName(RoleName.CLIENT)
                        .orElseThrow(() -> new RuntimeException("Error: CLIENT Role not found."));

                Set<Role> roles = new HashSet<>();
                roles.add(clientRole);
                client.setRoles(roles);

                userRepository.save(client);
            }
        };
    }
}

