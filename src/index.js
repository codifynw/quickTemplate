// Test import of a JavaScript module
// import { example } from '@/js/example'

// Test import of an asset
// import webpackLogo from '@/images/webpack-logo.svg'

// Test import of styles
import '@/styles/index.scss'
import { gsap } from 'gsap'

// // Appending to the DOM
// const logo = document.createElement('img')
// logo.src = webpackLogo

// const heading = document.createElement('h1')
// heading.textContent = example()

// const app = document.querySelector('#root')
// app.append(logo, heading)

let i = 1
const headline = document.getElementById('headline')
const text = [
  'Wir bauen deine digitalen Lösungen für die <em class="gradientA">Zukunft</em>',
  'Wir schaffen fassbare Erlebnisse mit <em class="gradientB">Emotionen</em>',
  'Das digitale Zeitalter ist unser Spielplatz. Want to <em class="gradientC">play?</em>',
  'Da is das Ding',
]

function tweenTo(el, duration, vars, position) {
  return new Promise((resolve, reject) => {
    let landingTimeLineTween = new gsap.timeline().timeScale(1.0)
    landingTimeLineTween.to(
      el,
      duration,
      {
        ...vars,
        onComplete: resolve,
      },
      position
    )
  })
}

function animateHeadline() {
  return tweenTo(headline, 1, { transform: 'translateX(-50px)', opacity: 0 })
    .then(() => {
      headline.innerHTML = text[text.length - i]
      if (i >= 3) {
        i = 1
      } else {
        i++
      }
    })
    .then(() => tweenTo(headline, 1, { transform: 'translateX(50px)' }, '-=1'))
    .then(() =>
      tweenTo(headline, 1, { transform: 'translateX(0px)', opacity: 1 })
    )
    .then(() => {
      setTimeout(() => {
        animateHeadline()
      }, 3000)
    })
}

setTimeout(() => {
  console.log('call animateHeadline')
  animateHeadline()
}, 1000)
