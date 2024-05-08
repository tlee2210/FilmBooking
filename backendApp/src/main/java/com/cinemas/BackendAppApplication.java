package com.cinemas;

import com.cinemas.entities.Celebrity;
import com.cinemas.entities.Country;
import com.cinemas.entities.User;
import com.cinemas.enums.Gender;
import com.cinemas.enums.RoleCeleb;
import com.cinemas.enums.RoleType;
import com.cinemas.repositories.CelebrityRepository;
import com.cinemas.repositories.CountryRepository;
import com.cinemas.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@SpringBootApplication
public class BackendAppApplication implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    CelebrityRepository celebrityRepository;

    @Autowired
    CountryRepository countryRepository;

    public static void main(String[] args) {
        SpringApplication.run(BackendAppApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        User adminAccount = userRepository.findByRole(RoleType.ADMIN);
        if (null == adminAccount) {
            User user = new User();

            user.setEmail("thienle255@gmail.com");
            user.setName("Tlee");
            user.setGender(Gender.Male);
            user.setPhone("0905028073");
            user.setDOB(LocalDate.of(2001, 10, 22));
            user.setRole(RoleType.ADMIN);
            user.setPassword(new BCryptPasswordEncoder().encode("thienle2210"));
            userRepository.save(user);
        }
        List<Country> countryList = countryRepository.findAll();
        if (countryList.size() == 0) {
            String[] nationalities = {
                    "American", "British", "Canadian", "Australian",
                    "French", "German", "Italian", "Spanish", "Japanese",
                    "Chinese", "Russian", "Brazilian", "Indian", "Mexican",
                    "South Korean", "Swedish", "Dutch", "Norwegian", "Swiss", "Greek"};
            List<Country> countries = new ArrayList<>();
            for (String nationality : nationalities) {
                Country country = Country.builder()
                        .name(nationality)
                        .build();
                countries.add(country);
            }
            countryRepository.saveAll(countries);
        }
    }
}
