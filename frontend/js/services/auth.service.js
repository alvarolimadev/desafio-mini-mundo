import { apiFetch } from "../core/api.js";

const API_URL = "http://localhost:8080/auth";

export async function login(email, senha) {
  const response = await apiFetch(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ email, senha })
  });

  if (!response.ok) {
    throw new Error("Login inválido");
  }

  const data = await response.json();
  return data.token;
}

export async function register(nome, email, senha, confirmacaoSenha) {
  const response = await apiFetch(`${API_URL}/register`, {
    method: "POST",
    body: JSON.stringify({
      nome,
      email,
      senha,
      confirmacaoSenha
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Erro ao registrar");
  }

  return response.text();
}