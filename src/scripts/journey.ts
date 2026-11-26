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

let listeners = new AbortController()

function boot() {
  ctx?.revert()
  listeners.abort()
  listeners = new AbortController()
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

    const intro = gsap.utils.toArray<HTMLElement>('[data-intro]')
    if (intro.length) {
      gsap.from(intro, {
        autoAlpha: 0,
        y: 48,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.14,
        delay: 0.1,
      })
    }

    gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
      const items = [...group.children] as HTMLElement[]
      gsap.from(items, {
        autoAlpha: 0,
        y: 36,
        scale: 0.97,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: { trigger: group, start: 'top 86%', once: true },
      })
    })

    gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
      const target = Number(el.dataset.count)
      if (!Number.isFinite(target)) return
      const value = { n: 0 }
      const render = () => {
        el.textContent = `$${Math.round(value.n).toLocaleString('es-AR')}`
      }
      gsap.to(value, {
        n: target,
        duration: 1.3,
        ease: 'power2.out',
        snap: { n: 500 },
        onUpdate: render,
        onComplete: render,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true, onEnter: render },
      })
    })

    gsap.utils.toArray<HTMLDetailsElement>('[data-faq]').forEach((item) => {
      const summary = item.querySelector('summary')
      const body = item.querySelector<HTMLElement>('[data-faq-body]')
      const icon = item.querySelector<HTMLElement>('[data-faq-icon]')
      if (!summary || !body || !icon) return
      summary.addEventListener(
        'click',
        (event) => {
          event.preventDefault()
          if (item.open) {
            gsap.to(icon, { rotate: 0, duration: 0.3, ease: 'power2.out' })
            gsap.to(body, {
              height: 0,
              autoAlpha: 0,
              duration: 0.35,
              ease: 'power2.inOut',
              onComplete: () => {
                item.open = false
                gsap.set(body, { clearProps: 'height,opacity,visibility' })
              },
            })
          } else {
            item.open = true
            gsap.to(icon, { rotate: 45, duration: 0.3, ease: 'power2.out' })
            gsap.fromTo(
              body,
              { height: 0, autoAlpha: 0 },
              { height: 'auto', autoAlpha: 1, duration: 0.45, ease: 'power2.out', clearProps: 'height' },
            )
          }
        },
        { signal: listeners.signal },
      )
    })

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
