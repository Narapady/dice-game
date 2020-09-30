/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
let scores, roundScore, activePlayer, dice, gamePlaying, previousDice, winningScore;

init();

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  winningScore = document.querySelector('#score-input').value;
  document.querySelector('.final-score').setAttribute('placeholder', winningScore);
  document.querySelector('#score-input').value = '';
  document.querySelector('form').style.display = 'none';
});

document.querySelector('.btn-roll').addEventListener('click', () => {
  if (gamePlaying) {
    // 1. Radom Number
    dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    const diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.setAttribute('src', `dice-${dice}.png`);

    // 3. if the dice is other than 1, add it to the roundScore
    if (dice === 6 && previousDice === 6) {
      scores[activePlayer] = 0;
      document.querySelector(`#score-${activePlayer}`).textContent = '0';
      nextPlayer();
    } 
    else if (dice !== 1) {
      roundScore += dice;
      document.querySelector(`#current-${activePlayer}`).textContent = roundScore; 
    } else {
      nextPlayer();
    }
    previousDice = dice;
  } 
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  if (gamePlaying) {
    // Add current score to the global score
    scores[activePlayer] += roundScore;
    // Update the UI
    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
    // Check if palyer won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector(`#name-${activePlayer}`).textContent = 'Winner'
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      gamePlaying = false;
    } else {
      // Change the player
      nextPlayer();
    }
  }
  
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

function init() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
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


/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
