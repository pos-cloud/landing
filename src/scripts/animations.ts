import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const words = [
  'empresa',
  'restaurante',
  'distribuidora',
  'tienda de ropa',
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
  'mayorista',
  'cafetería',
  'supermercado',
  'verdulería',
]

let ctx: gsap.Context | undefined
let listeners = new AbortController()

/** Comportamiento que no es animación: tiene que andar también con movimiento reducido. */
function bindUi(signal: AbortSignal) {
  const header = document.querySelector<HTMLElement>('[data-header]')
  if (header) {
    const update = () => header.classList.toggle('is-scrolled', window.scrollY > 12)
    update()
    window.addEventListener('scroll', update, { passive: true, signal })
  }

  const menu = document.querySelector<HTMLDetailsElement>('[data-menu]')
  if (menu) {
    document.addEventListener(
      'click',
      (event) => {
        if (menu.open && !menu.contains(event.target as Node)) menu.open = false
      },
      { signal },
    )
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => (menu.open = false), { signal }))
  }
}

function bindFaq(signal: AbortSignal) {
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
      { signal },
    )
  })
}

function boot() {
  ctx?.revert()
  listeners.abort()
  listeners = new AbortController()

  bindUi(listeners.signal)

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return

  ctx = gsap.context(() => {
    bindFaq(listeners.signal)

    // Entrada del hero
    const intro = gsap.utils.toArray<HTMLElement>('[data-intro]')
    if (intro.length) {
      gsap.from(intro, { autoAlpha: 0, y: 40, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.1 })
    }

    // Pantalla del hero: arranca inclinada y se endereza al hacer scroll
    const mock = document.querySelector<HTMLElement>('[data-hero-mock]')
    if (mock) {
      gsap.fromTo(
        mock,
        { rotateX: 18, scale: 0.94, autoAlpha: 0, y: 60 },
        { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.45 },
      )
      gsap.to(mock, {
        rotateX: 0,
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: mock, start: 'top 85%', end: 'top 25%', scrub: 0.6 },
      })
    }

    // Rotación de rubros en el título
    const spin = document.querySelector<HTMLElement>('[data-spin]')
    if (spin) {
      let index = 0
      const spinTl = gsap.timeline({ repeat: -1, repeatDelay: 1.1, delay: 1.8 })
      spinTl.to(spin, { autoAlpha: 0, y: -14, duration: 0.3, ease: 'power2.in' })
      spinTl.call(() => {
        index = (index + 1) % words.length
        spin.textContent = words[index] ?? 'empresa'
      })
      spinTl.fromTo(spin, { y: 14 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' })
    }

    // Carruseles infinitos
    gsap.utils.toArray<HTMLElement>('[data-marquee]').forEach((box) => {
      const track = box.querySelector<HTMLElement>('[data-track]')
      if (!track) return
      if (!track.dataset.cloned) {
        track.dataset.cloned = '1'
        ;[...track.children].forEach((node) => track.append(node.cloneNode(true)))
      }
      const amount = track.scrollWidth / 2
      gsap.fromTo(track, { x: 0 }, { x: -amount, duration: 60, ease: 'none', repeat: -1 })
    })

    // Bloques que aparecen al hacer scroll
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        autoAlpha: 0,
        y: 32,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
      })
    })

    // Grupos de tarjetas en cascada
    gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
      gsap.from(group.children, {
        autoAlpha: 0,
        y: 36,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: group, start: 'top 86%', once: true },
      })
    })

    // Montos que cuentan hasta su valor
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
        snap: { n: 100 },
        onUpdate: render,
        onComplete: render,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true, onEnter: render },
      })
    })

    // Líneas que se dibujan
    gsap.utils.toArray<SVGPathElement>('[data-draw], [data-mock-line]').forEach((path) => {
      const length = path.getTotalLength()
      gsap.fromTo(
        path,
        { strokeDasharray: length, strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: path, start: 'top 90%', once: true },
        },
      )
    })

    // Flujo de datos en el diagrama de integraciones
    gsap.utils.toArray<SVGPathElement>('[data-flow]').forEach((path, i) => {
      const length = path.getTotalLength()
      const dash = Math.max(length * 0.18, 4)
      gsap.set(path, { strokeDasharray: `${dash} ${length}`, strokeDashoffset: dash })
      gsap.to(path, {
        strokeDashoffset: -length,
        duration: 2.4,
        ease: 'none',
        repeat: -1,
        delay: (i % 6) * 0.35,
      })
    })

    // Anillos que laten alrededor del nodo central
    gsap.utils.toArray<HTMLElement>('[data-pulse]').forEach((ring, i) => {
      gsap.fromTo(
        ring,
        { scale: 1, autoAlpha: 0.7 },
        { scale: 1.9, autoAlpha: 0, duration: 2.6, ease: 'power1.out', repeat: -1, delay: i * 1.3 },
      )
    })
  })
}

document.addEventListener('astro:page-load', boot)
document.addEventListener('astro:before-swap', () => {
  ctx?.revert()
  listeners.abort()
})
