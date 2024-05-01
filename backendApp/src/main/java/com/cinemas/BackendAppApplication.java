package com.cinemas;

import com.cinemas.entities.User;
import com.cinemas.enums.Gender;
import com.cinemas.enums.RoleType;
import com.cinemas.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;

@SpringBootApplication
public class BackendAppApplication implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;

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
    }
}
