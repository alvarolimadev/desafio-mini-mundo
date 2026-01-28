const form = document.getElementById("loginForm");
const alertBox = document.getElementById("alert");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    if (!response.ok) {
      throw new Error("Login inválido");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    window.location.href = "projects.html";

  } catch (err) {
    alertBox.textContent = err.message;
    alertBox.classList.remove("d-none");
  }
});