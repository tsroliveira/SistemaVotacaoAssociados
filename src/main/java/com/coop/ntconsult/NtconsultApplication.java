package com.coop.ntconsult;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication(scanBasePackages = "com.coop.ntconsult")
public class NtconsultApplication {

    public static void main(String[] args) {
        SpringApplication.run(NtconsultApplication.class, args);
    }
}
