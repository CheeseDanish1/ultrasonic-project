import SerialHandler from "./serialHandler.js";

const bird = document.querySelector("[data-bird]");
const BIRD_SPEED = 0.5;
const JUMP_DURATION = 125;
let timeSinceLastJump = Number.POSITIVE_INFINITY;

export function setupBird() {
  setTop(window.innerHeight / 2);
  read();
}

async function read() {
  return SerialHandler.read().then(() => {
    handleJump();
    read();
  });
}

export function updateBird(delta) {
  if (timeSinceLastJump < JUMP_DURATION) setTop(getTop() - BIRD_SPEED * delta);
  else setTop(getTop() + BIRD_SPEED * delta);

  timeSinceLastJump += delta;
}

export function getBirdRect() {
  return bird.getBoundingClientRect();
}

function setTop(top) {
  bird.style.setProperty("--bird-top", top);
}

function getTop() {
  return parseFloat(getComputedStyle(bird).getPropertyValue("--bird-top"));
}

function handleJump(event) {
  timeSinceLastJump = 0;
}
