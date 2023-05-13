export const greet = () => 'Hello, Gulp & Grunt!';

window.onload =()=> {
  document.getElementById('greeting')
    .textContent = greet();
}