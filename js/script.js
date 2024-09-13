const API_BASE_URL = 'https://hotpotato.krooonal.com/game';

async function startGame() {
    const email = document.getElementById('start-email').value;
    if (!email) {
        alert('Please enter your email.');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/start/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_email: email }),
            mode: 'cors', // Ensure CORS is handled
        });
        const data = await response.json();
        if (data.game_id) {
            alert('Game started successfully! Game ID: ' + data.game_id);
            document.getElementById('start-game').style.display = 'none';
            document.getElementById('pass-potato').style.display = 'block';
        } else {
            alert('Error starting game: ' + data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}

async function passPotato() {
    const email = document.getElementById('pass-email').value;
    const gameId = prompt('Enter the Game ID:'); // For simplicity, ask for game ID manually
    
    if (!email || !gameId) {
        alert('Please enter both email and Game ID.');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/pass/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ game_id: gameId, current_user: 'current_user@example.com', new_user: email }),
        });
        const data = await response.json();
        if (data.message) {
            alert('Potato passed successfully to ' + email);
        } else {
            alert('Error passing potato: ' + data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}
