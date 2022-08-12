package com.tim23.fishnchill;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FishNChillApplication {

    public static void main(String[] args) {
        SpringApplication.run(FishNChillApplication.class, args);
    }

}
