// Orchestrate timeline: 2022 slides left, 2023 enters, later 2025 enters, timeline disappears
const logo = document.getElementById('logo');
const timeline = document.getElementById('timeline');
const y22 = document.querySelector('.y2022');
const y23 = document.querySelector('.y2023');
const y24 = document.querySelector('.y2024');
const y25 = document.querySelector('.y2025');
const finalYears = document.getElementById('finalYears');
const message = document.getElementById('message');

function wait(ms){ return new Promise(r => setTimeout(r, ms)); }
function onAnimEnd(el){ return new Promise(r => el.addEventListener('animationend', r, {once:true})); }

async function runTimeline(){
  // Ensure timeline is visible
  await wait(1200);

  // 2022 out to left
  y22.classList.add('slideLeftOut');
  await wait(350);

  // 2023 in from right to center
  y23.classList.add('slideInFromRight');
  await onAnimEnd(y23);

  // Hold briefly and show 2024 to the right
  await wait(400);
  y24.classList.add('slideInFromRight');
  await onAnimEnd(y24);

  // 2025 enters from right to center, then fade logo and remove full timeline
  await wait(600);
  y25.classList.add('slideInFromRight');
  await onAnimEnd(y25);

  // Fade out timeline, also fade out logo
  timeline.classList.add('fadeOut');
  logo.classList.add('fadeOut');
  await Promise.all([onAnimEnd(timeline), onAnimEnd(logo)]);

  // Bring back logo and show "2023 to 2024"
  finalYears.classList.remove('hidden');
  finalYears.classList.add('fadeIn');
  logo.classList.remove('fadeOut');
  logo.classList.add('fadeIn');
}

runTimeline();

// Click to reverse-water-drop hide both logo and 2023-2024, then show message
function hideWithDrop(){
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

logo.addEventListener('click', hideWithDrop);
finalYears.addEventListener('click', hideWithDrop);
