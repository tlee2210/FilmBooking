package com.cinemas.initializer;

import com.cinemas.entities.User;
import com.cinemas.enums.Gender;
import com.cinemas.enums.RoleType;
import com.cinemas.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class UserDataInitializer {
    @Autowired
    private UserRepository userRepository;

    public void initUsers() {
        User adminAccount = userRepository.findByRole(RoleType.ADMIN);
        if (adminAccount == null) {
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
