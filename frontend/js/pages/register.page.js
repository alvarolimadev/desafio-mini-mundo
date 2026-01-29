import { register } from "../services/auth.service.js";

export function initRegisterPage() {
  const form = document.getElementById("registerForm");
  if (!form) return;

  form.addEventListener("submit", onSubmit);
}

async function onSubmit(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const confirmar = document.getElementById("confirmarSenha").value.trim();

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos");
    return;
  }

  if (senha !== confirmar) {
    alert("As senhas não conferem");
    return;
  }

  try {
    await register(nome, email, senha, confirmar);
    alert("Cadastro realizado com sucesso");
    window.location.href = "index.html";
  } catch {
    alert("Erro ao cadastrar usuário");
  }
}