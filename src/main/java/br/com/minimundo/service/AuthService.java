package br.com.minimundo.service;

import br.com.minimundo.domain.User;
import br.com.minimundo.dto.LoginRequest;
import br.com.minimundo.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository repository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository repository) {
        this.repository = repository;
    }

    public User authenticate(LoginRequest request) {

        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Credenciais inválidas"));

        if (!encoder.matches(request.getSenha(), user.getSenha())) {
            throw new IllegalArgumentException("Credenciais inválidas");
        }

        return user;
    }
}