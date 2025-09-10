let secretNumber = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100 
let attempts = 0;

document.getElementById('submitGuess').addEventListener('click', function() {
    const Guess = Number(document.getElementById('guessInput').value);
    attempts++;

    if (Guess === secretNumber) {
        document.getElementById('message').textContent = `Congratulations! You've guessed the number ${secretNumber} in ${attempts} attempts.`;
        document.getElementById('submitGuess').disabled = true; // Disable button after correct guess
    } else if (Guess < secretNumber) { 
        document.getElementById('message').textContent = 'Too low! Try again.';
    } else if (Guess > secretNumber) {
        document.getElementById('message').textContent = 'Too high! Try again.';
    }   

    document.getElementById('guessInput').value = ''; // Clear input field
    document.getElementById('guessInput').focus(); // Focus back to input field
});


