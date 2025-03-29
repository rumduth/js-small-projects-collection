const DECK_URL = "https://deckofcardsapi.com/api/deck/new/shuffle";
const CARL_URL = "https://deckofcardsapi.com/api/deck/[deck-id]/draw";

const btn = document.querySelector("button");
const imagesHolder = document.querySelector(".images-holder");

let deckID = null;
async function getDeckId() {
  let res = await fetch(DECK_URL);
  let data = await res.json();
  return data.deck_id;
}

let zIndex = 0;
let randomRotateDegree = () => {
  let deg = Math.floor(Math.random() * 30 + 1);
  if (Math.random() > 0.5) return deg;
  return -deg;
};

async function handleDrawingCard() {
  if (deckID === null) deckID = await getDeckId();
  let res = await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw`);
  let data = await res.json();
  let card = data.cards;
  let img = document.createElement("img");
  img.src = card[0].image;
  img.className = "img";
  img.style.zIndex = zIndex;
  img.style.position = "absolute";
  img.style.transform = `translateX(-50%) translateY(60%) rotate(${randomRotateDegree()}deg)`;
  zIndex += 1;
  imagesHolder.insertAdjacentElement("afterbegin", img);
  if (data.remaining === 0) {
    window.alert("All cards are picked!");
    imagesHolder.innerHTML = "";
    deckID = null;
  }
}

btn.addEventListener("click", handleDrawingCard);
