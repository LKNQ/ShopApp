const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    if (username === "" || email === "" || password === "") {
        message.textContent = "Please fill in every field.";
        return;
    }

    if (password.length < 8) {
        message.textContent = "Password must be at least 8 characters.";
        return;
    }

    if (password === password.toLowerCase()) {
        message.textContent = "Password needs at least one capital letter.";
        return;
    }

    if (password === password.toUpperCase()) {
        message.textContent = "Password needs at least one lowercase letter.";
        return;
    }

    if (!/[0-9]/.test(password)) {
        message.textContent = "Password needs at least one number.";
        return;
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
        message.textContent = "Password needs at least one special character.";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    let taken = false;

    users.forEach((user) => {
        if (user.email === email || user.username === username) {
            taken = true;
        }
    });

    if (taken) {
        message.textContent = "That username or email is already registered.";
        return;
    }

    users.push({ username: username, email: email, password: password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created! Please log in.");
    window.location.href = "login.html";
});