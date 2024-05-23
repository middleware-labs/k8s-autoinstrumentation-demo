
package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

@RestController
public class FetchController {

    private final RestTemplate restTemplate;

    public FetchController() {
        this.restTemplate = new RestTemplate();
    }

    @GetMapping("/fetch")
    public ResponseEntity<String> fetchHandler() {
        String url = "http://dotnet-service:8080/fetch";
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to fetch data from golang-service service");
        }
    }
}
