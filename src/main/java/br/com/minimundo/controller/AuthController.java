package br.com.minimundo.controller;

import br.com.minimundo.dto.RegisterRequest;
import br.com.minimundo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        service.register(request);
        return ResponseEntity.ok("Cadastro realizado com sucesso");
    }
}