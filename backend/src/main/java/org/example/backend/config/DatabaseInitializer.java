package org.example.backend.config;


import jakarta.transaction.Transactional;
import org.example.backend.model.*;
import org.example.backend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

@Configuration
public class DatabaseInitializer {

    @Bean
    @Transactional
    public CommandLineRunner initDatabase(
            RoleRepository roleRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            MarkRepository markRepository,
            ModelRepository modelRepository,
            TypeRepository typeRepository,
            VehicleRepository vehicleRepository) {
        return args -> {
            for (RoleName roleName : RoleName.values()) {
                if (roleRepository.findByName(roleName).isEmpty()) {
                    Role role = new Role();
                    role.setName(roleName);
                    roleRepository.save(role);
                }
            }

            User admin = null;
            if (Boolean.FALSE.equals(userRepository.existsByEmail("1"))) {
                admin = new User();
                admin.setUsername("1");
                admin.setEmail("1");
                admin.setPassword(passwordEncoder.encode("1"));
                admin.setFirstName("Andrzej");
                admin.setLastName("Nowak");
                admin.setPhoneNumber("645 332 723");
                admin.setEmail("andrzejnowak@gmail.com");

                Role adminRole = roleRepository.findByName(RoleName.ADMIN)
                        .orElseThrow(() -> new RuntimeException("Error: Admin Role not found."));

                Set<Role> adminRoles = new HashSet<>();
                adminRoles.add(adminRole);
                admin.setRoles(adminRoles);

                admin = userRepository.save(admin);
            } else {
                admin = userRepository.findByEmail("admin@example.com").orElse(null);
            }

            User client = null;
            if (Boolean.FALSE.equals(userRepository.existsByEmail("1@1.pl"))) {
                client = new User();
                client.setUsername("123");
                client.setEmail("1@1.pl");
                client.setPassword(passwordEncoder.encode("123456"));

                Role clientRole = roleRepository.findByName(RoleName.CLIENT)
                        .orElseThrow(() -> new RuntimeException("Error: CLIENT Role not found."));

                Set<Role> clientRoles = new HashSet<>();
                clientRoles.add(clientRole);
                client.setRoles(clientRoles);

                client = userRepository.save(client);
            } else {
                client = userRepository.findByEmail("1@1.pl").orElse(null);
            }

            if (markRepository.count() == 0) {
                List<Mark> marks = createMarks();
                markRepository.saveAll(marks);
            }

            if (typeRepository.count() == 0) {
                List<Type> types = createTypes();
                typeRepository.saveAll(types);
            }

            if (modelRepository.count() == 0) {
                List<Mark> marks = markRepository.findAll();
                List<Model> models = createModels(marks);
                modelRepository.saveAll(models);
            }

            if (vehicleRepository.count() == 0) {
                List<Model> models = modelRepository.findAll();
                List<Type> types = typeRepository.findAll();
                List<Vehicle> vehicles = createVehicles(models, types);
                vehicleRepository.saveAll(vehicles);
            }
        };
    }

    private List<Mark> createMarks() {
        List<Mark> marks = new ArrayList<>();
        String[] markNames = {"Toyota", "Honda", "Ford", "BMW", "Mercedes", "Audi", "Volkswagen", "Nissan", "Hyundai", "Kia"};

        for (String name : markNames) {
            Mark mark = new Mark();
            mark.setName(name);
            marks.add(mark);
        }

        return marks;
    }

    private List<Type> createTypes() {
        List<Type> types = new ArrayList<>();
        String[] typeNames = {"Sedan", "SUV", "Hatchback", "Coupe", "Convertible", "Wagon", "Pickup", "Van", "Crossover"};

        for (String name : typeNames) {
            Type type = new Type();
            type.setName(name);
            types.add(type);
        }

        return types;
    }

    private List<Model> createModels(List<Mark> marks) {
        List<Model> models = new ArrayList<>();
        Map<String, String[]> markModels = new HashMap<>();

        markModels.put("Toyota", new String[]{"Corolla", "Camry", "RAV4", "Highlander"});
        markModels.put("Honda", new String[]{"Civic", "Accord", "CR-V", "Pilot"});
        markModels.put("Fiat", new String[]{"Punto", "Bravo <3",});
        markModels.put("BMW", new String[]{"3 Series", "5 Series", "X3", "X5"});
        markModels.put("Mercedes", new String[]{"C-Class", "E-Class", "GLC", "S-Class"});
        markModels.put("Audi", new String[]{"A3", "A4", "Q5", "Q7"});
        markModels.put("Volkswagen", new String[]{"Golf", "Passat", "Tiguan", "Atlas"});


        for (Mark mark : marks) {
            String[] modelNames = markModels.get(mark.getName());
            if (modelNames != null) {
                for (String name : modelNames) {
                    Model model = new Model();
                    model.setName(name);
                    model.setMark(mark);
                    models.add(model);
                }
            }
        }

        return models;
    }

    private List<Vehicle> createVehicles(List<Model> models, List<Type> types) {
        List<Vehicle> vehicles = new ArrayList<>();
        Random random = new Random();
        String[] colors = {"Red", "Blue", "Black", "White", "Silver", "Gray", "Purple"};
        String[] fuelTypes = {"Gasoline", "Diesel", "Electric", "Hybrid",  "LPG"};

        for (int i = 0; i < 20; i++) {
            Vehicle vehicle = new Vehicle();

            Model model = models.get(random.nextInt(models.size()));
            Type type = types.get(random.nextInt(types.size()));

            vehicle.setModel(model);
            vehicle.setType(type);
            vehicle.setProductionYear(2010 + random.nextInt(16));
            vehicle.setRegistrationNumber("REG" + (10000 + random.nextInt(90000)));
            vehicle.setColour(colors[random.nextInt(colors.length)]);
            vehicle.setVin("VIN" + (1000000 + random.nextInt(9000000)));
            vehicle.setFuelType(fuelTypes[random.nextInt(fuelTypes.length)]);
            vehicle.setEngineCapacity(1000 + random.nextInt(3000));
            vehicle.setCondition2(random.nextBoolean() ? "New" : "Used");
            vehicle.setPower(100 + random.nextInt(400));
            vehicle.setMileage(random.nextInt(150000));

            vehicles.add(vehicle);
        }

        return vehicles;
    }
}
