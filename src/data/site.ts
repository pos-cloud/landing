export const stops = [
  { href: '/', id: 'inicio', label: 'Inicio' },
  { href: '/nucleo', id: 'nucleo', label: 'Núcleo' },
  { href: '/integraciones', id: 'apps', label: 'Aplicaciones' },
  { href: '/modulos', id: 'modulos', label: 'Módulos' },
  { href: '/precios', id: 'precio', label: 'Precio' },
  { href: '/contacto', id: 'contacto', label: 'Contacto' },
] as const

export type StopHref = (typeof stops)[number]['href']

const plans = ['Basic', 'Pro', 'Max'] as const
export type Plan = (typeof plans)[number]

export function whatsappHref(plan?: string | null) {
  const chosen = plans.find((item) => item === plan)
  const text = chosen
    ? `Hola! Quiero el plan ${chosen} de POS Cloud. Mi negocio es: `
    : 'Hola! Quiero una demo de POS Cloud. Mi negocio es: '
  return `https://api.whatsapp.com/send/?phone=5493564368535&text=${encodeURIComponent(text)}`
}

export const rubrosA = [
  ['bi-cup-hot', 'Restaurante'],
  ['bi-truck', 'Distribuidora'],
  ['bi-handbag', 'Tienda de ropa'],
  ['bi-bag', 'Zapatería'],
  ['bi-tools', 'Ferretería'],
  ['bi-capsule', 'Farmacia'],
  ['bi-shop', 'Kiosco'],
  ['bi-basket', 'Panadería'],
  ['bi-shop-window', 'Carnicería'],
  ['bi-tree', 'Verdulería'],
  ['bi-heart-pulse', 'Dietética'],
  ['bi-droplet', 'Perfumería'],
  ['bi-gem', 'Joyería'],
  ['bi-eyeglasses', 'Óptica'],
  ['bi-book', 'Librería'],
  ['bi-controller', 'Juguetería'],
  ['bi-bag-heart', 'Pet shop'],
  ['bi-phone', 'Electrónica'],
] as const

export const rubrosB = [
  ['bi-lamp', 'Mueblería'],
  ['bi-droplet', 'Vinoteca'],
  ['bi-cup-straw', 'Heladería'],
  ['bi-cup-hot', 'Cafetería'],
  ['bi-egg-fried', 'Rotisería'],
  ['bi-shop', 'Almacén'],
  ['bi-cart', 'Supermercado'],
  ['bi-building', 'Fábrica'],
  ['bi-wrench', 'Taller'],
  ['bi-boxes', 'Mayorista'],
  ['bi-bicycle', 'Bicicletería'],
  ['bi-balloon', 'Cotillón'],
  ['bi-gift', 'Regalería'],
  ['bi-bricks', 'Corralón'],
  ['bi-gear', 'Repuestos'],
  ['bi-tree', 'Agro'],
  ['bi-flower1', 'Florería'],
  ['bi-scissors', 'Peluquería'],
  ['bi-heart-pulse', 'Veterinaria'],
  ['bi-stars', 'Bazar'],
  ['bi-pc-display', 'Informática'],
  ['bi-lightning-charge', 'Iluminación'],
  ['bi-pencil', 'Papelería'],
  ['bi-printer', 'Gráfica'],
  ['bi-layers', 'Blanquería'],
  ['bi-trophy', 'Casa de deportes'],
] as const

export const practices = [
  ['bi-receipt', 'Ventas', 'Controlá todas tus ventas, vengan de donde vengan: nosotros las registramos. Y mantené al día las cuentas corrientes para saber quién te debe.'],
  ['bi-bag', 'Compras', 'Cargás tus compras y el sistema actualiza el stock y las cuentas corrientes de tus proveedores.'],
  ['bi-box-seam', 'Stock', 'Tu inventario al día, siempre: sabés qué tenés, qué entró y qué salió.'],
  ['bi-cash-stack', 'Caja', 'Entendé el flujo de tu caja y descubrí dónde se te escapa la plata.'],
  ['bi-journal-text', 'Contabilidad', 'Toda la base que necesita una empresa para llevar las cuentas en regla.'],
  ['bi-gear-wide-connected', 'Producción', 'Un módulo que se adapta a la forma de producir de cada empresa.'],
] as const

export const apps = [
  ['/assets/img/logo-mercadolibre.png', 'Mercado Libre', 'Publicás el mismo producto que vendés en el local.'],
  ['/assets/img/logo-tiendanube-mark.png', 'Tienda Nube', 'El pedido entra y descuenta el mismo depósito.'],
  ['/assets/img/logo-woo-mark.png', 'WooCommerce', 'La tienda manda el pedido y el stock baja.'],
  ['/assets/img/logo-arca.png', 'ARCA', 'Facturás en el momento, con el certificado de tu CUIT.'],
  ['/assets/img/logo-claude.svg', 'Claude', 'Le preguntás y te responde con lo que ya se cobró.'],
  ['/assets/img/logo-whatsapp.svg', 'WhatsApp', 'Arman el pedido y te llega listo para preparar.'],
] as const

export const modules = [
  ['img', '/assets/img/logo-mayorista.svg', 'Tienda mayorista', 'Tus clientes ven productos y precios, y piden sin llamarte. Te armamos la web.'],
  ['icon', 'bi-shop-window', 'Tienda minorista', 'La vidriera para quien compra por unidad. Mira, elige y te deja el pedido.'],
  ['img', '/assets/img/logo-celular.svg', 'App para pedidos', 'El vendedor anota en la calle. La venta entra al mismo stock y a la misma caja.'],
  ['icon', 'bi-gear-wide-connected', 'Producción a tu medida', 'Fabricás y el depósito cambia solo: menos insumo, más producto terminado. Armado como producís vos.'],
  ['img', '/assets/img/logo-carta-digital.png', 'Carta digital', 'El cliente mira la carta en el teléfono. La mesa se cobra en el salón.'],
] as const

export const offers = [
  {
    name: 'Basic',
    who: 'negocios chicos',
    price: '30000',
    label: '$30.000',
    items: ['1.000 transacciones', 'Hasta 3 usuarios'],
  },
  {
    name: 'Pro',
    who: 'en crecimiento',
    price: '45000',
    label: '$45.000',
    items: ['5.000 transacciones', 'Hasta 10 usuarios'],
  },
  {
    name: 'Max',
    who: 'varias sucursales',
    price: '60000',
    label: '$60.000',
    items: ['Transacciones ilimitadas', 'Usuarios ilimitados'],
  },
] as const
