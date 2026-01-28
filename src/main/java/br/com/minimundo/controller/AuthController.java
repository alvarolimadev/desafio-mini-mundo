package br.com.minimundo.controller;

import br.com.minimundo.domain.User;
import br.com.minimundo.dto.LoginRequest;
import br.com.minimundo.dto.RegisterRequest;
import br.com.minimundo.security.JwtUtil;
import br.com.minimundo.service.AuthService;
import br.com.minimundo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    public AuthController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        userService.register(request);
        return ResponseEntity.ok("Cadastro realizado com sucesso");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        User user = authService.authenticate(request);
        String token = JwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(token);
    }
}