
let roundScore = 0,
    activePlayer = 0;
    scores = [0,0];
let winningScore, dice, isPlaying, previousDice;

// Start the game
init();

// Let the user choose the winning score
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  winningScore = document.querySelector('#score-input').value;
  document.querySelector('form').style.display = 'none';
  document.querySelector('.final-score').setAttribute('placeholder', winningScore);
  document.querySelector('#score-input').value = '';
});

// Roll button event listener
document.querySelector('.btn-roll').addEventListener('click', () => {
  if (isPlaying) {
    // Get the number between 1 and 6
    dice = Math.floor(Math.random() * 6) + 1;

    // show dice in the UI
    const diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.setAttribute('src', `dice-${dice}.png`);

    // if the dice is 1, current score become 0 and other player's turn.
    // otherwise, keep adding to current score
    if (dice !== 1) {
      // Update the the current score
      roundScore += dice;
      document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    } 
    // if player gets 6 twice in a row the all scores become 0;
    else if (dice === 6 && previousDice === 6) {
      scores[activePlayer] = 0;
      document.querySelector(`#score-${activePlayer}`).textContent = '0';
      nextPlayer();
    } else {  
      document.querySelector(`#current-${activePlayer}`).textContent = 0;
      roundScore = 0;
      nextPlayer();
    }
    previousDice = dice;
  }
});

// Hold button event listener
document.querySelector('.btn-hold').addEventListener('click', () => {
  if (isPlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
    // win if score reaches winning score
    if (scores[activePlayer] >= winningScore) {
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      document.querySelector(`#name-${activePlayer}`).textContent = 'Winner';
      isPlaying = false;
    }
    roundScore = 0;
    document.getElementById(`current-${activePlayer}`).textContent = '0';
    nextPlayer();
  }
});

// Reset the game
document.querySelector('.btn-new').addEventListener('click', init);

// Initial state of the game;
function init() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  isPlaying = true;
  document.querySelector('form').style.display = 'flex';
  document.querySelector('.dice').style.display = 'none';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1'
  document.getElementById('name-1').textContent = 'Player 2'
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.final-score').setAttribute('placeholder', 'Final Score');
}

// Switch player;
function nextPlayer() {
  // change active player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.querySelector(`.player-0-panel`).classList.toggle('active');
  document.querySelector(`.player-1-panel`).classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';

}
