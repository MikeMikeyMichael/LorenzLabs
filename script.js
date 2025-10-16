// Smooth sequencing using Web Animations timing and Promises
const logo = document.getElementById('logo');
const tl = document.getElementById('timeline');
const y22 = document.querySelector('.y2022');
const y23 = document.querySelector('.y2023');
const y24 = document.querySelector('.y2024');
const y25 = document.querySelector('.y2025');
const finalYears = document.getElementById('finalYears');
const message = document.getElementById('message');

const wait = (ms) => new Promise(r => setTimeout(r, ms));
const onAnimEnd = (el) => new Promise(r => el.addEventListener('animationend', r, {once:true}));

async function sequence(){
  // Initial pacing is governed by CSS intro animations
  await wait(900);

  // Flow: 2022 out, 2023 in, 2024 in, 2025 in
  y22.classList.add('slideLeftOut');
  await wait(220);
  y23.classList.add('slideRightIn');
  await onAnimEnd(y23);
  await wait(200);
  y24.classList.add('slideRightIn');
  await onAnimEnd(y24);
  await wait(260);
  y25.classList.add('slideRightIn');
  await onAnimEnd(y25);

  // Fade out timeline and logo together
  tl.classList.add('fadeOut');
  logo.classList.add('fadeOut');
  await Promise.all([onAnimEnd(tl), onAnimEnd(logo)]);

  // Bring back logo and 2023–2024, keep them
  finalYears.classList.remove('hidden');
  finalYears.classList.add('fadeIn');
  logo.classList.remove('invis');
  logo.classList.add('fadeIn');
}
sequence();

// Click to reverse-water-drop hide, then show message
function dropThenMessage(){
  logo.classList.remove('fadeIn');
  finalYears.classList.remove('fadeIn');
  logo.classList.add('dropOut');
  finalYears.classList.add('dropOut');
  Promise.all([onAnimEnd(logo), onAnimEnd(finalYears)]).then(() => {
    logo.style.visibility = 'hidden';
    finalYears.style.visibility = 'hidden';
    message.classList.remove('hidden');
    message.classList.add('fadeIn');
  });
}

logo.addEventListener('click', dropThenMessage);
finalYears.addEventListener('click', dropThenMessage);
