const authArea = document.getElementById("authArea");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

if (authArea) {
    if (currentUser) {
        authArea.innerHTML =
            '<span class="me-2" id="helloName"></span>' +
            '<button class="btn btn-outline-primary btn-sm" onclick="logout()">Logout</button>';
    } else {
        authArea.innerHTML =
            '<a href="login.html" class="btn btn-outline-primary btn-sm me-2">Log In</a>' +
            '<a href="register.html" class="btn btn-primary btn-sm">Sign Up</a>';
    }
}