import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const words = [
  'empresa',
  'restaurante',
  'distribuidora',
  'tienda de ropa',
  'zapatería',
  'ferretería',
  'farmacia',
  'panadería',
  'fábrica',
  'kiosco',
  'vinoteca',
  'óptica',
  'librería',
  'taller',
  'carnicería',
  'heladería',
  'corralón',
  'dietética',
  'mueblería',
  'pet shop',
  'mayorista',
  'cafetería',
  'juguetería',
  'supermercado',
  'verdulería',
  'joyería',
  'bicicletería',
  'perfumería',
  'rotisería',
]

let ctx: gsap.Context | undefined

function normalize(path: string) {
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1)
  return path || '/'
}

function boot() {
  ctx?.revert()
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  ctx = gsap.context(() => {
    const lines = gsap.utils.toArray<SVGLineElement>('[data-path-draw]')
    lines.forEach((line) => {
      const length = line.getTotalLength()
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
    })

    const here = normalize(window.location.pathname)
    const stops = gsap.utils.toArray<HTMLAnchorElement>('[data-stop]')
    const paint = (href: string) => {
      stops.forEach((stop) => {
        stop.classList.toggle('is-on', stop.getAttribute('href') === href)
      })
    }
    paint(here)

    if (reduce) {
      const progress = Number(document.body.dataset.progress || '1')
      lines.forEach((line) => {
        const length = line.getTotalLength()
        gsap.set(line, { strokeDashoffset: length * (1 - progress) })
      })
      return
    }

    const spin = document.querySelector<HTMLElement>('[data-spin]')
    if (spin) {
      let index = 0
      const spinTl = gsap.timeline({ repeat: -1, repeatDelay: 0.9, delay: 1.6 })
      spinTl.to(spin, { autoAlpha: 0, duration: 0.28 })
      spinTl.call(() => {
        index = (index + 1) % words.length
        spin.textContent = words[index] ?? 'empresa'
      })
      spinTl.to(spin, { autoAlpha: 1, duration: 0.35 })
    }

    gsap.utils.toArray<HTMLElement>('[data-marquee]').forEach((box) => {
      const track = box.querySelector<HTMLElement>('[data-track]')
      if (!track) return
      if (!track.dataset.cloned) {
        track.dataset.cloned = '1'
        ;[...track.children].forEach((node) => track.append(node.cloneNode(true)))
      }
      const vertical = box.dataset.axis === 'y'
      const amount = vertical ? track.scrollHeight / 2 : track.scrollWidth / 2
      const reverse = box.hasAttribute('data-reverse')
      const prop = vertical ? 'y' : 'x'
      gsap.fromTo(
        track,
        { [prop]: reverse ? -amount : 0 },
        {
          [prop]: reverse ? 0 : -amount,
          duration: vertical ? 28 : 42,
          ease: 'none',
          repeat: -1,
        },
      )
    })

    const practices = gsap.utils.toArray<HTMLElement>('.practice')
    if (practices.length) {
      const practiceTl = gsap.timeline({ repeat: -1 })
      practices.forEach((_, index) => {
        practiceTl.call(() => {
          practices.forEach((item, itemIndex) => item.classList.toggle('is-on', itemIndex === index))
        })
        practiceTl.to({}, { duration: 1.4 })
      })
    }

    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        autoAlpha: 0,
        y: 32,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 84%',
          once: true,
        },
      })
    })

    const journey = document.body.dataset.journey
    if (journey === 'home') {
      lines.forEach((line) => {
        gsap.to(line, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: 'main',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.45,
          },
        })
      })

      stops.forEach((stop) => {
        const id = stop.dataset.stop
        const section = id ? document.getElementById(id) : null
        if (!section) return
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) paint(stop.getAttribute('href') || '/')
          },
        })
      })
      return
    }

    const progress = Number(document.body.dataset.progress || '0')
    lines.forEach((line) => {
      const length = line.getTotalLength()
      gsap.to(line, {
        strokeDashoffset: length * (1 - progress),
        duration: 1.15,
        ease: 'power2.out',
      })
    })
  })
}

document.addEventListener('astro:page-load', boot)
document.addEventListener('astro:before-swap', () => {
  ctx?.revert()
})

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true })
} else {
  boot()
}
