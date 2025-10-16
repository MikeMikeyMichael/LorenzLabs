// Click logo to hide for 2 seconds, then return with a soft animation
const logo = document.getElementById('logo');

function hideThenReturn(){
  logo.classList.remove('returning');
  logo.classList.add('leaving');
  const onOut = () => {
    logo.classList.remove('leaving');
    logo.classList.add('hidden');
    logo.removeEventListener('animationend', onOut);
    setTimeout(() => {
      logo.classList.remove('hidden');
      logo.classList.add('returning');
    }, 2000); // 2 seconds
  };
  logo.addEventListener('animationend', onOut);
}

logo.addEventListener('click', (e) => {
  e.preventDefault();
  hideThenReturn();
});
