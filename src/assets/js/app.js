import gsap from 'gsap';
const bar = document.querySelector('.loading__bar--inner');
const counterNumber = document.querySelector('.loading__counter--number');
let c = 0;

let barInterval = setInterval(() => {
  bar.style.width = c + '%';
  counterNumber.innerText = c + '%';
  c++;
  if (c > 100) {
    clearInterval(barInterval);
    gsap.to(
      `
    .loading__bar,
    .loading__text,
    .loading__counter
    `,
      {
        duration: 1,
        opacity: 0,
      }
    );
    gsap.to(`.loading__box`, {
      duration: 1,
      // height: '500px',
      borderRadius: '50%',
    });
  }
}, 20);
