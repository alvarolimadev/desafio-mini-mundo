package br.com.minimundo.service;

import br.com.minimundo.domain.User;
import br.com.minimundo.dto.RegisterRequest;
import br.com.minimundo.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public void register(RegisterRequest request) {

        if (!request.getSenha().equals(request.getConfirmacaoSenha())) {
            throw new IllegalArgumentException("Senha e confirmação não conferem");
        }

        if (repository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("E-mail já cadastrado");
        }

        User user = new User();
        user.setNome(request.getNome());
        user.setEmail(request.getEmail());
        user.setSenha(encoder.encode(request.getSenha()));

        repository.save(user);
    }
}