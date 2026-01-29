import * as authService from "../services/auth.service.js";

export function initLoginPage() {
  const form = document.getElementById("loginForm");

  if (!form) return;

  form.addEventListener("submit", onSubmit);
}

async function onSubmit(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!email || !senha) {
    alert("Informe e-mail e senha");
    return;
  }

  try {
    const token = await authService.login(email, senha);
    localStorage.setItem("token", token);
    window.location.href = "projects.html";
  } catch (err) {
    alert("Login inválido");
  }
}