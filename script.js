// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitSymbols = ['♥︎', '♦︎', '♣︎', '♠︎'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSuitSymbol = suitSymbols[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let display = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        display = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        display = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        display = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        display = 'K';
      }
      let currentColour;
      if (suitIndex === 0 || suitIndex === 1) {
        currentColour = 'red';
      } else if (suitIndex === 2 || suitIndex === 3) {
        currentColour = 'black';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        suitSymbol: currentSuitSymbol,
        displayName: display,
        colour: currentColour,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// =======================================
const deck = shuffleCards(makeDeck());

let player1Card;
let cardContainer1;
let cardContainer2;
let cardNum = 0;
let player1Ranks = [];
let player2Ranks = [];
let player1Cards = [];
let player2Cards = [];
let reset = false;

const buttonsDiv = document.createElement('div');
const player1Button = document.createElement('button');
const player2Button = document.createElement('button');
player1Button.innerText = 'Player 1 Draw';
buttonsDiv.appendChild(player1Button);
player2Button.innerText = 'Player 2 Draw';
buttonsDiv.appendChild(player2Button);

// Number of Cards
const inputContainer = document.createElement('div');
const inputNumber = document.createElement('input');
const inputSubmit = document.createElement('button');
inputSubmit.innerText = 'Submit';
inputNumber.placeholder = 'No. of cards to play';

inputContainer.appendChild(inputNumber);
inputContainer.appendChild(inputSubmit);
document.body.appendChild(inputContainer);

const gameInfo = document.createElement('div');

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerHTML = message;
};

const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card', cardInfo.rank);

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

const evaluate = () => { const player1Diff = Math.max(...player1Ranks) - Math.min(...player1Ranks);
  const player2Diff = Math.max(...player2Ranks) - Math.min(...player2Ranks);

  // player1 new card display
  let lowest1Card = player1Cards[0];
  for (let i = 1; i < player1Cards.length; i += 1) {
    if (player1Cards[i].rank < lowest1Card.rank) {
      lowest1Card = player1Cards[i];
    }
  }
  player1Cards.splice(player1Cards.indexOf(lowest1Card), 1);
  player1Cards.unshift(lowest1Card);

  let highest1Card = player1Cards[0];
  for (let i = 1; i < player1Cards.length; i += 1) {
    if (player1Cards[i].rank > highest1Card.rank) {
      highest1Card = player1Cards[i];
    }
  }
  player1Cards.splice(player1Cards.indexOf(highest1Card), 1);
  player1Cards.unshift(highest1Card);

  cardContainer1.innerHTML = '';
  for (let i = 0; i < player1Cards.length; i += 1) {
    const newCardElement = createCard(player1Cards[i]);
    cardContainer1.appendChild(newCardElement);
  }

  // player2 new card display
  let lowest2Card = player2Cards[0];
  for (let i = 1; i < player2Cards.length; i += 1) {
    if (player2Cards[i].rank < lowest2Card.rank) {
      lowest2Card = player2Cards[i];
    }
  }
  player2Cards.splice(player2Cards.indexOf(lowest2Card), 1);
  player2Cards.unshift(lowest2Card);

  let highest2Card = player2Cards[0];
  for (let i = 1; i < player2Cards.length; i += 1) {
    if (player2Cards[i].rank > highest2Card.rank) {
      highest2Card = player2Cards[i];
    }
  }
  player2Cards.splice(player2Cards.indexOf(highest2Card), 1);
  player2Cards.unshift(highest2Card);

  cardContainer2.innerHTML = '';
  for (let i = 0; i < player2Cards.length; i += 1) {
    const newCardElement = createCard(player2Cards[i]);
    cardContainer2.appendChild(newCardElement);
  }
  // Determine and output winner
  if (player1Diff > player2Diff) {
    output(`player 1 wins. player 1 diff: <b>${player1Diff}</b>; player 2 diff: <b>${player2Diff}</b> (highest & lowest card are displayed on the left)`);
  } else if (player1Diff < player2Diff) {
    output(`player 2 wins. player 1 diff: <b>${player1Diff}</b>; player 2 diff: <b>${player2Diff}</b> (highest & lowest card are displayed on the left)`);
  } else {
    output(`tie. player 1 diff: <b>${player1Diff}</b>; player 2 diff: <b>${player2Diff}</b> (highest & lowest card are displayed on the left)`);
  }
  reset = true; };

const player1Click = () => {
  if (reset === true) {
    reset = false;
    cardNum = 0;
    player1Ranks = [];
    player2Ranks = [];
    player1Cards = [];
    player2Cards = [];
    cardContainer1.innerHTML = '';
    cardContainer2.innerHTML = '';
    output('');
    inputContainer.appendChild(inputNumber);
    inputContainer.appendChild(inputSubmit);
    buttonsDiv.remove();
    cardContainer1.remove();
    cardContainer2.remove();
  }
  if (player1Ranks.length < cardNum) {
    // Pop player 1's card metadata from the deck
    player1Card = deck.pop();
    player1Ranks.push(player1Card.rank);
    player1Cards.push(player1Card);

    const cardElement = createCard(player1Card);
    cardContainer1.appendChild(cardElement);
  }
  if (player2Ranks.length === cardNum && player1Ranks.length === cardNum && cardNum !== 0) {
    evaluate();
  }
};

const player2Click = () => {
  if (cardNum > player2Ranks.length) {
    // Pop player 2's card metadata from the deck
    const player2Card = deck.pop();
    player2Ranks.push(player2Card.rank);
    player2Cards.push(player2Card);

    // Create card element from card metadata
    const cardElement = createCard(player2Card);
    // Append card element to card container
    cardContainer2.appendChild(cardElement);

    if (player2Ranks.length === cardNum && player1Ranks.length === cardNum) {
      evaluate();
    }
  }
};

player1Button.addEventListener('click', player1Click);
player2Button.addEventListener('click', player2Click);
cardContainer1 = document.createElement('div');
cardContainer1.classList.add('card-container', 'player1');
cardContainer2 = document.createElement('div');
cardContainer2.classList.add('card-container', 'player2');

const initGame = () => {
  document.body.appendChild(buttonsDiv);
  gameInfo.innerText = 'Click any to get started and draw a card!';
  document.body.appendChild(gameInfo);
  document.body.appendChild(cardContainer1);
  document.body.appendChild(cardContainer2);
};

inputSubmit.addEventListener('click', () => { if (inputNumber.value > 1) { cardNum = Number(inputNumber.value); inputNumber.value = ''; inputNumber.remove(); inputSubmit.remove(); initGame(); } });
