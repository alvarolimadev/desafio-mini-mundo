const form = document.getElementById("registerForm");
const alertBox = document.getElementById("alert");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmacaoSenha = document.getElementById("confirmacaoSenha").value;

  if (senha !== confirmacaoSenha) {
    alertBox.textContent = "As senhas não conferem";
    alertBox.classList.remove("d-none");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha, confirmacaoSenha })
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar");
    }

    alert("Cadastro realizado! Faça login.");
    window.location.href = "index.html";

  } catch (err) {
    alertBox.textContent = err.message;
    alertBox.classList.remove("d-none");
  }
});