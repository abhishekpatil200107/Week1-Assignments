// Replays the fade-in demo
const group = document.querySelector('.fade-group');
document.getElementById('replay').addEventListener('click', () => {
  group.classList.remove('play');
  void group.offsetWidth; // restart the animation
  group.classList.add('play');
});
