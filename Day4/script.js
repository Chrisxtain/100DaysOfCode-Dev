document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("name");
  const occasionInput = document.getElementById("occasion");
  const generateButton = document.getElementById("generate");
  const greetingElement = document.getElementById("greeting");

  generateButton.onclick = () => {
    const name = nameInput.value.trim();
    const occasion = occasionInput.value.trim();
    let message = "";

    if (name && occasion) {
      message = `Hello, ${name}! Happy ${occasion}!`;
    } else if (name) {
      message = `Hello, ${name}!`;
    } else {
      message = "Please enter your name and occasion.";
    }

    greetingElement.textContent = message;
  };
});
