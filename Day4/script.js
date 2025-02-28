document.getElementById("greetingForm").addEventListener("submit", function(event){
    event.preventDefault(); //prevents page reload

    let userName = document.getElementById("name").value;
    let occasion = document.getElementById("occasion").value;
    let selectedTheme = document.getElementById("theme").value;

    let greetingMessage = "Hi! " + "Wishing You A Happy " + occasion +" "+ userName + "!!";
    let greetingCard = document.getElementById("greetingCard");

    document.getElementById("greetingMessage").innerText = greetingMessage;
    greetingCard.className = ""; //Resets previous class
    greetingCard.classList.add(selectedTheme); //Apply theme
    greetingCard.style.display = "block"; //shows greeting 

});