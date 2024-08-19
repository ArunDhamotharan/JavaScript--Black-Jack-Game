let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";

let sumEl = document.querySelector("#sum-el");
let messageEl = document.querySelector("#message-el");
let cardsEl = document.querySelector("#cards-el");
let playerEl = document.querySelector("#player-el");

let player = {
    name: "",
    chips: 0,
};

function initializeGame() {
    const playerName = document.getElementById("player-name").value;
    const depositAmount = parseInt(document.getElementById("deposit-amount").value);
    
    if (playerName && depositAmount > 0) {
        player.name = playerName;
        player.chips = depositAmount;
        playerEl.textContent = player.name + ": $" + player.chips;

        document.getElementById("setup").style.display = "none";
        document.getElementById("game").style.display = "block";
    } else {
        alert("Please enter a valid name and deposit amount.");
    }
}

function getRandomCard() {
    let randomCard = Math.floor(Math.random() * 13) + 1;
    if (randomCard === 1) {
        return 11;
    } else if (randomCard > 10) {
        return 10;
    } else {
        return randomCard;
    }
}

function startGame() {
    if (!isAlive && player.chips > 0) {
        isAlive = true;
        let firstCard = getRandomCard();
        let secondCard = getRandomCard();
        cards = [firstCard, secondCard];
        sum = cards[0] + cards[1];
        renderGame();
    }
}

function renderGame() {
    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
        player.chips += 500; // Win reward
    } else {
        message = "You're out of the game!";
        isAlive = false;
        player.chips -= 100; // Loss penalty
    }
    
    sumEl.textContent = "Sum: " + sum;
    messageEl.textContent = message;
    playerEl.textContent = player.name + ": $" + player.chips;
    
    if (player.chips <= 0) {
        messageEl.textContent += " You have no more chips left.";
    }
}

function newCard() {
    if (isAlive && !hasBlackJack) {
        let card = getRandomCard();
        cards.push(card);
        sum += card;
        renderGame();
    }
}

function leaveTable() {
    alert(player.name + ", you are leaving the table with $" + player.chips);
    resetGame();
    document.getElementById("setup").style.display = "block";
    document.getElementById("game").style.display = "none";
}

function depositMoreCash() {
    const additionalCash = parseInt(prompt("Enter the amount you want to deposit:"));
    if (additionalCash > 0) {
        player.chips += additionalCash;
        playerEl.textContent = player.name + ": $" + player.chips;
        alert("You have deposited $" + additionalCash);
    } else {
        alert("Please enter a valid amount.");
    }
}

function resetGame() {
    isAlive = false;
    hasBlackJack = false;
    cards = [];
    sum = 0;
    message = "Want to play a round?";
    sumEl.textContent = "Sum: ";
    cardsEl.textContent = "Cards: ";
    messageEl.textContent = message;
}

// Initialize the game when the script loads
document.getElementById("setup").style.display = "block";
document.getElementById("game").style.display = "none";
