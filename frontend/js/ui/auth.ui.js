// js/ui/auth.ui.js
export function getLoginData() {
  return {
    email: document.getElementById("email").value.trim(),
    senha: document.getElementById("senha").value.trim()
  };
}

export function getRegisterData() {
  return {
    nome: document.getElementById("nome").value.trim(),
    email: document.getElementById("email").value.trim(),
    senha: document.getElementById("senha").value.trim()
  };
}