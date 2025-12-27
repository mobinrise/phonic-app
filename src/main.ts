import './style.css'
// register service-worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}

let voicesLoaded = false
const loadVoices = () => {
  if (!voicesLoaded) {
    speechSynthesis.getVoices()
    voicesLoaded = true
  }
}
// 1. basic DOM
document.querySelector<HTMLDivElement>('#app')!.innerHTML = (
  `<main class="game">
    <h1>Tap the picture that starts with <span id="target">A</span></h1>
    <div class="pics">
      <button data-letter="A">🍎 Apple</button>
      <button data-letter="B">⚽ Ball</button>
      <button data-letter="C">🐈 Cat</button>
      <button data-letter="D">🐕 Dog</button>
      <button data-letter="E">🐘 Elephant</button>
      <button data-letter="F">🐟 Fish</button>
    </div>
    <p id="msg"></p>
    <button id="next">Next</button>
  </main>`
)

// 2. tiny game logic
const letters = ['A', 'B', 'C', 'D', 'E', 'F']
const target = letters[Math.floor(Math.random() * letters.length)]
document.getElementById('target')!.textContent = target
const msg = document.getElementById('msg')!

;(document.querySelectorAll('.pics button') as NodeListOf<HTMLButtonElement>).forEach(btn =>
  btn.addEventListener('click', () => {
    loadVoices()
    if (btn.dataset.letter === target) {
      msg.textContent = '✅ Correct!'
      btn.classList.add('right')
      const say = (text: string) => {
        const u = new SpeechSynthesisUtterance(text)
        u.lang = 'en-US'
        speechSynthesis.speak(u)
      }
      say(btn.dataset.letter!)
      setTimeout(() => say(btn.textContent!.split(' ')[1]), 400)
    } else {
      msg.textContent = '❌ Try again'
      btn.classList.add('wrong')
    }
  })
)