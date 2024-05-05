package com.cinemas;

import com.cinemas.entities.Celebrity;
import com.cinemas.entities.User;
import com.cinemas.enums.Gender;
import com.cinemas.enums.RoleCeleb;
import com.cinemas.enums.RoleType;
import com.cinemas.repositories.CelebrityRepository;
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
        List<Celebrity> allCelebrities = celebrityRepository.findAll();
        if(allCelebrities.isEmpty()){
            String[] actorNames = {
                    "Chris Evans", "Scarlett Johansson", "Robert Downey Jr.",
                    "Tom Hanks", "Leonardo DiCaprio", "Meryl Streep", "Brad Pitt",
                    "Angelina Jolie", "Denzel Washington", "Natalie Portman", "Johnny Depp",
                    "Jennifer Lawrence", "Will Smith", "Emma Stone", "Tom Cruise",
                    "Anne Hathaway", "George Clooney", "Jennifer Aniston", "Matt Damon",
                    "Cate Blanchett", "Christian Bale", "Julia Roberts", "Nicole Kidman",
                    "Jackie Chan", "Harrison Ford", "Kate Winslet", "Sandra Bullock",
                    "Daniel Radcliffe", "Joaquin Phoenix", "Gal Gadot"};
            String[] nationalities = {
                    "American", "British", "Canadian", "Australian",
                    "French", "German", "Italian", "Spanish", "Japanese",
                    "Chinese", "Russian", "Brazilian", "Indian", "Mexican",
                    "South Korean", "Swedish", "Dutch", "Norwegian", "Swiss", "Greek"};

            List<Celebrity> celebrities = new ArrayList<>();
            Random random = new Random();
            for (int i = 0; i < 30; i++) {

                int year = random.nextInt(100) + 1900;
                int month = random.nextInt(12) + 1;
                int day = random.nextInt(28) + 1;

                String nationality = nationalities[random.nextInt(nationalities.length)];

                Celebrity celebrity = Celebrity.builder()
                        .id(i + 1)
                        .name(actorNames[i % actorNames.length])
                        .dateOfBirth(LocalDate.of(year, month, day))
                        .nationality(nationality)
                        .biography("Biography content")
                        .description("Description content")
                        .role(RoleCeleb.ACTOR)
                        .image("image_url")
                        .build();
                celebrities.add(celebrity);
            }
            celebrityRepository.saveAll(celebrities);

        }

    }
}
