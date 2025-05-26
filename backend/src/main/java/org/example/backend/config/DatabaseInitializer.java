package org.example.backend.config;


import jakarta.transaction.Transactional;
import org.example.backend.model.*;
import org.example.backend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.*;

@Configuration
public class DatabaseInitializer {

    private static final List<String> IMAGE_URLS = List.of(
            "https://www.bmw.pl/content/dam/bmw/common/all-models/m-series/series-overview/bmw-m-series-seo-overview-ms-04.jpg",
            "https://b-cache.pl/video/modele/bmw1_2024/styl_1_charakter.jpg",
            "https://www.bmw-smorawinski.pl/www/media/mediapool/m3m4/oferr_25_m4coupe_WBS41AZ090CP87271_585x329.jpg",
            "https://kvdbil-object-images.imgix.net/7242577/db05ab55.jpg",
            "https://a.allegroimg.com/original/11e5bd/bc9555db41478ee2a0d73b618076/BMW-X2-F39-xDrive-20-d-190-KM-FULL-OPCJA",
            "https://bmw-uzywane.com.pl/assets/photo/upload/cars/33140/vehicle_8743f-scale-1200-0.jpg"
    );

    @Bean
    @Transactional
    public CommandLineRunner initDatabase(
            RoleRepository roleRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            MarkRepository markRepository,
            ModelRepository modelRepository,
            TypeRepository typeRepository,
            VehicleRepository vehicleRepository,
            AnnouncementRepository announcementRepository,
            VehicleImageRepository vehicleImageRepository
            ) {
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
                admin.setEmail("1@1.pl");
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
                client.setUsername("2");
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
            if (announcementRepository.count() == 0) {
                List<Vehicle> vehicles = vehicleRepository.findAll();
                List<Announcement> announcements = createAnnouncements(vehicles);
                announcementRepository.saveAll(announcements);
            }
            if (vehicleImageRepository.count() == 0) {
                List<Vehicle> vehicles = vehicleRepository.findAll();
                List<VehicleImage> images = createVehicleImages(vehicles);
                vehicleImageRepository.saveAll(images);
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


    private List<Announcement> createAnnouncements(List<Vehicle> vehicles) {
        List<Announcement> announcements = new ArrayList<>();
        Random random = new Random();

        for (int i = 0; i < Math.min(vehicles.size(), 10); i++) {
            Vehicle vehicle = vehicles.get(i);

            Announcement announcement = new Announcement();
            announcement.setName("Ogłoszenie #" + (i + 1));
            announcement.setStatus("ACTIVE");
            announcement.setPlacedDate(LocalDateTime.now().minusDays(random.nextInt(30)));
            announcement.setLocation("Warszawa");
            announcement.setDescription("Opis pojazdu " + vehicle.getModel().getName());
            announcement.setPrice((double) (20000 + random.nextInt(50000)));
            announcement.setVehicle(vehicle);

            announcements.add(announcement);
        }

        return announcements;
    }

    private List<VehicleImage> createVehicleImages(List<Vehicle> vehicles) {
        List<VehicleImage> images = new ArrayList<>();
        Random random = new Random();

        for (int i = 0; i < vehicles.size(); i++) {
            Vehicle vehicle = vehicles.get(i);
            int offset = i % IMAGE_URLS.size();

            int imageCount = 2 + random.nextInt(3);

            for (int j = 0; j < imageCount; j++) {
                String imageUrl = IMAGE_URLS.get((offset + j) % IMAGE_URLS.size());

                VehicleImage image = new VehicleImage();
                image.setFileName("image_" + i + "_" + j + ".jpg");
                image.setFileType("image/jpeg");
                image.setFilePath("/randompath/image_" + i + "_" + j + ".jpg");
                image.setFileUrl(imageUrl);
                image.setVehicle(vehicle);

                images.add(image);
            }
        }

        return images;
    }


}
