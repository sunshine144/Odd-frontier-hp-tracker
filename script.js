let player1HP = 137;
let player2HP = 137;
let turnNumber = 1;
const historyPlayer1Div = document.getElementById('history-player1');
const historyPlayer2Div = document.getElementById('history-player2');
const player1NameInput = document.getElementById('player1-name');
const player2NameInput = document.getElementById('player2-name');
const player1HistoryTitle = document.getElementById('player1-history-title');
const player2HistoryTitle = document.getElementById('player2-history-title');
const endTurnButton = document.getElementById('end-turn-button');
const printButton = document.getElementById('print-button');
const turnCounterSpan = document.getElementById('turn-counter');

// Function to get player names on load
function getPlayerNames() {
    const name1 = prompt("Enter the name for Player 1:", "Player 1");
    if (name1) {
        player1NameInput.value = name1;
        player1HistoryTitle.textContent = `${name1} History`;
    }

    const name2 = prompt("Enter the name for Player 2:", "Player 2");
    if (name2) {
        player2NameInput.value = name2;
        player2HistoryTitle.textContent = `${name2} History`;
    }
}

// Call getPlayerNames when the page loads
window.onload = getPlayerNames;

function updatePlayerNames() {
    player1HistoryTitle.textContent = `${player1NameInput.value} History`;
    player2HistoryTitle.textContent = `${player2NameInput.value} History`;
}

player1NameInput.addEventListener('input', updatePlayerNames);
player2NameInput.addEventListener('input', updatePlayerNames);

function addPoints(player) {
    const addInput = document.getElementById(`add-${player}`);
    const hpDisplay = document.getElementById(`hp-${player}`);
    const pointsToAdd = parseInt(addInput.value) || 0;
    const historyDiv = (player === 'player1') ? historyPlayer1Div : historyPlayer2Div;
    const playerName = (player === 'player1') ? player1NameInput.value : player2NameInput.value;

    if (pointsToAdd !== 0) {
        const newEntry = document.createElement('div');
        newEntry.classList.add('history-entry');
        newEntry.innerHTML = `<span>${playerName} +</span> <span>${pointsToAdd}</span>`;
        historyDiv.appendChild(newEntry);

        if (player === 'player1') {
            player1HP += pointsToAdd;
            hpDisplay.textContent = player1HP;
        } else {
            player2HP += pointsToAdd;
            hpDisplay.textContent = player2HP;
        }
        addInput.value = '';
    }
}

function minusPoints(player) {
    const minusInput = document.getElementById(`minus-${player}`);
    const hpDisplay = document.getElementById(`hp-${player}`);
    const pointsToMinus = parseInt(minusInput.value) || 0;
    const historyDiv = (player === 'player1') ? historyPlayer1Div : historyPlayer2Div;
    const playerName = (player === 'player1') ? player1NameInput.value : player2NameInput.value;

    if (pointsToMinus !== 0) {
        const newEntry = document.createElement('div');
        newEntry.classList.add('history-entry');
        newEntry.innerHTML = `<span>${playerName} -</span> <span>${pointsToMinus}</span>`;
        historyDiv.appendChild(newEntry);

        if (player === 'player1') {
            player1HP -= pointsToMinus;
            hpDisplay.textContent = player1HP;
        } else {
            player2HP -= pointsToMinus;
            hpDisplay.textContent = player2HP;
        }
        minusInput.value = '';
    }
}

function endTurn() {
    const player1EndHP = document.createElement('div');
    player1EndHP.classList.add('history-entry');
    player1EndHP.innerHTML = `<span>End Turn ${turnNumber} HP:</span> <span>${player1HP}</span>`;
    historyPlayer1Div.appendChild(player1EndHP);

    const player2EndHP = document.createElement('div');
    player2EndHP.classList.add('history-entry');
    player2EndHP.innerHTML = `<span>End Turn ${turnNumber} HP:</span> <span>${player2HP}</span>`;
    historyPlayer2Div.appendChild(player2EndHP);

    turnNumber++;
    turnCounterSpan.textContent = turnNumber;

    const separator1 = document.createElement('hr');
    historyPlayer1Div.appendChild(separator1);
    const separator2 = document.createElement('hr');
    historyPlayer2Div.appendChild(separator2);
}

function printPage() {
    window.print();
}

window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    event.returnValue = 'Are you sure you want to leave? All activity will be lost.';
    return 'Are you sure you want to leave? All activity will be lost.';
});

endTurnButton.addEventListener('click', endTurn);
printButton.addEventListener('click', printPage);
