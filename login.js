const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    let found = null;

    users.forEach((user) => {
        if (user.email === email && user.password === password) {
            found = user;
        }
    });

    if (!found) {
        message.textContent = "Wrong email or password.";
        return;
    }

    localStorage.setItem(
        "currentUser",
        JSON.stringify({ username: found.username, email: found.email })
    );

    window.location.href = "index.html";
});