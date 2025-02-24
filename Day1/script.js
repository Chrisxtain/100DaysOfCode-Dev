document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const name = document.getElementById("name");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const number = document.getElementById("number");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");

    function showError(input, message) {
        const errorMessage = input.nextElementSibling;
        errorMessage.textContent = message;
        input.classList.add("invalid");
        input.classList.remove("valid");
    }

    function showSuccess(input){
        const errorMessage = input.nextElementSibling;
        errorMessage.textContent = "";
        input.classList.add("valid");
        input.classList.remove("invalid");
    }

    function isValidName(name) {
        const re = /^[A-Za-z\s]{3,}$/; // Only letters and spaces, at least 3 characters
        return re.test(name);
    }

    function isValidEmail(email){
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function isValidPassword(password){
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    }

    name.addEventListener("input", () => {
        if (!isValidName(name.value)) {
            showError(name, "Name must be at least 3 characters and contain only letters.");
        } else {
            showSuccess(name);
        }
    });

    username.addEventListener("input", () => {
        if (username.value.trim().length < 5) {
            showError(username, "username must be at least 5 characters long.");
        } else{
            showSuccess(username);
        }
        
    });

    email.addEventListener("input", () => {
        if (!isValidEmail (email.value)) {
            showError(email, "Invalid email format.");
        }else {
            showSuccess(email);
        }
        
    });

    phone.addEventListener("input", () => {
        if (!isValidPhone(phone.value)) {
            showError(phone, "Phone number must include a country code (e.g., +234 0123456789).");
        } else {
            showSuccess(phone);
        }
    });

    password.addEventListener("input", () => {
        if (!isValidPassword(password.value)) {
            showError(password, "Password must be 8+ characters, contain 1 uppercase, 1 number, and 1 special character.");
        } else {
            showSuccess(password);
        }
    });

    confirmPassword.addEventListener("input", () => {
        if (confirmPassword.value !== password.value) {
            showError(confirmPassword, "Passwords do not match.");
        } else {
            showSuccess(confirmPassword);
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (
            username.classList.contains("valid") &&
            email.classList.contains("valid") &&
            password.classList.contains("valid") &&
            confirmPassword.classList.contains("valid") &&
            phone.classList.contains("valid")
        ) {
            alert("Registration successful!");
            form.reset();
            document.querySelectorAll("input").forEach(input => input.classList.remove("valid", "invalid"));
        } else {
            alert("Please correct the errors in the form before submitting.");
        }
    });
});