export interface Pitch {
  eyebrow: string
  title: string
  intro: string
  points?: ReadonlyArray<readonly [string, string]>
  faqs?: ReadonlyArray<readonly [string, string]>
  cta?: string
}

export const nucleoPitch: Pitch = {
  eyebrow: 'Por qué POS Cloud',
  title: 'Dejá de cruzar planillas. Empezá a manejar tu empresa.',
  intro:
    'Cada venta, cada compra y cada movimiento de caja quedan en el mismo sistema. Sabés cuánto vendiste, qué te queda en el depósito y cómo cerró el turno, sin esperar a fin de mes ni pedirle el dato a nadie.',
  points: [
    ['Vendés y el stock se mueve solo', 'Cobrás en el mostrador o en la mesa y el producto se descuenta en el momento. Se terminan los faltantes que descubrís tarde.'],
    ['Una caja que cierra', 'Cada turno cierra con lo que pasó: ventas, cobros y movimientos. Sin diferencias que nadie sabe explicar.'],
    ['Compras bajo control', 'La mercadería que entra impacta en el depósito y en los costos. Comprás con datos, no a ojo.'],
    ['Contabilidad sin cargar dos veces', 'El comprobante genera el asiento. Tu contador recibe la información ordenada.'],
    ['Producción conectada', 'Si fabricás, el sistema baja el insumo y suma el producto terminado cuando producís.'],
    ['Desde cualquier dispositivo', 'POS Cloud funciona en la nube: entrás desde la computadora, la tablet o el celular, estés donde estés.'],
  ],
  faqs: [
    ['¿Sirve para mi rubro?', 'Sí. POS Cloud trabaja con restaurantes, distribuidoras, tiendas de ropa, ferreterías, farmacias, kioscos, fábricas, mayoristas y muchos rubros más. Chica, mediana o grande, el núcleo se adapta a cómo trabajás.'],
    ['¿Tengo que instalar algo?', 'No hace falta un servidor propio. POS Cloud funciona en la nube y entrás desde tus dispositivos.'],
    ['¿Puedo empezar con lo básico y sumar después?', 'Sí. El núcleo es la base, y sobre él sumás integraciones como Mercado Libre, Tienda Nube o ARCA, y módulos a medida cuando tu negocio los necesite.'],
  ],
  cta: 'Quiero ver una demo',
}

export const integracionesPitch: Pitch = {
  eyebrow: 'Vendé en todos lados',
  title: 'Un solo stock para el local, la web y los marketplaces.',
  intro:
    'Tus clientes compran en el local, en Mercado Libre, en tu tienda online o por WhatsApp. Con POS Cloud todo eso entra al mismo sistema, así no vendés lo que no tenés ni cargás el mismo producto cinco veces.',
  points: [
    ['Mercado Libre', 'Publicás el mismo producto que vendés en el local, desde el mismo catálogo.'],
    ['Tienda Nube y WooCommerce', 'El pedido de tu tienda online entra al sistema y descuenta el mismo depósito que usa el mostrador.'],
    ['Facturación electrónica ARCA', 'Emitís la factura en el momento de la venta, con el certificado de tu CUIT. Sin pasar por otra página.'],
    ['Pedidos por WhatsApp', 'Tus clientes arman el pedido y te llega listo para preparar.'],
    ['Inteligencia artificial con Claude', 'Le preguntás cuánto vendiste, qué producto rota más o cómo viene la caja, y te responde con los datos reales de tu negocio.'],
  ],
  faqs: [
    ['¿POS Cloud hace factura electrónica?', 'Sí. Está integrado con ARCA: facturás en el momento, con el certificado de tu CUIT.'],
    ['¿Si vendo en la tienda online, se descuenta el stock del local?', 'Sí. Los pedidos de Tienda Nube y WooCommerce entran al sistema y descuentan el mismo depósito.'],
    ['¿Tengo que dejar de usar lo que ya uso?', 'No. POS Cloud se conecta con las plataformas donde ya vendés y las une en un solo lugar.'],
  ],
  cta: 'Quiero conectar mis canales',
}

export const modulosPitch: Pitch = {
  eyebrow: 'Hecho a tu medida',
  title: 'Lo que tu negocio necesita y un sistema enlatado no trae.',
  intro:
    'Cada empresa trabaja distinto. Por eso, además del núcleo, desarrollamos módulos exclusivos que usan el mismo stock y la misma caja. Nada de sistemas sueltos que después no se hablan entre sí.',
  points: [
    ['Tu mayorista online', 'Tus clientes ven productos y precios y te hacen el pedido sin llamarte. Nosotros te armamos la web.'],
    ['Vidriera para el minorista', 'Quien compra por unidad mira, elige y te deja el pedido a cualquier hora.'],
    ['Vendedores en la calle', 'Con la app de pedidos, el vendedor carga la venta en el momento y entra directo al stock y a la caja.'],
    ['Producción como la hacés vos', 'Armamos el circuito de fabricación a tu medida: menos insumo, más producto terminado, sin cargas manuales.'],
    ['Carta digital', 'El cliente mira la carta en el celular y la mesa se cobra en el salón.'],
  ],
  faqs: [
    ['¿Los módulos usan el mismo stock y la misma caja?', 'Sí. Todos los módulos se construyen sobre el núcleo de POS Cloud, así que comparten productos, stock y caja.'],
    ['¿Me arman la tienda online?', 'Sí. Para la tienda mayorista te armamos la web lista para que tus clientes hagan pedidos.'],
    ['¿Cuánto cuesta un módulo a medida?', 'Depende de lo que necesites. Escribinos por WhatsApp, nos contás cómo trabajás y te pasamos una propuesta.'],
  ],
  cta: 'Contame qué necesitás',
}

export const preciosPitch: Pitch = {
  eyebrow: 'Elegí tu plan',
  title: 'Un precio fijo por mes, según el tamaño de tu negocio.',
  intro:
    'Elegís el plan por la cantidad de transacciones y de usuarios que necesitás. Si tu negocio crece, POS Cloud crece con vos.',
  faqs: [
    ['¿Qué plan me conviene?', 'Basic es para negocios chicos: 1.000 transacciones y hasta 3 usuarios. Pro es para negocios en crecimiento: 5.000 transacciones y hasta 10 usuarios. Max es para empresas con varias sucursales: transacciones y usuarios ilimitados.'],
    ['¿El precio es mensual?', 'Sí. Basic cuesta $30.000, Pro $45.000 y Max $60.000 por mes.'],
    ['¿Cómo contrato?', 'Tocá el plan que te interesa y escribinos por WhatsApp. Te mostramos el sistema y lo dejamos andando.'],
  ],
  cta: 'Quiero que me asesoren',
}

export const contactoPitch: Pitch = {
  eyebrow: 'Cómo seguimos',
  title: 'De la charla al sistema andando.',
  intro: 'Escribinos por WhatsApp y te respondemos personalmente. Sin formularios ni call centers.',
  points: [
    ['1. Nos contás tu negocio', 'Qué vendés, cómo cobrás, cuántos usuarios y sucursales tenés.'],
    ['2. Te mostramos POS Cloud', 'Coordinamos una demo y ves el sistema funcionando con casos como los tuyos.'],
    ['3. Elegís el plan y arrancás', 'Te recomendamos el plan que te conviene y te acompañamos en el arranque.'],
  ],
  cta: 'Escribinos por WhatsApp',
}

export const homeFaqs: ReadonlyArray<readonly [string, string]> = [
  ['¿Sirve para mi rubro?', 'Sí. POS Cloud trabaja con restaurantes, distribuidoras, tiendas de ropa, ferreterías, farmacias, kioscos, fábricas, mayoristas y muchos rubros más. Chica, mediana o grande, el núcleo se adapta a cómo trabajás.'],
  ['¿POS Cloud hace factura electrónica?', 'Sí. Está integrado con ARCA: facturás en el momento, con el certificado de tu CUIT.'],
  ['¿Tengo que instalar algo?', 'No hace falta un servidor propio. POS Cloud funciona en la nube y entrás desde la computadora, la tablet o el celular.'],
  ['¿Si vendo en la tienda online, se descuenta el stock del local?', 'Sí. Los pedidos de Tienda Nube y WooCommerce entran al sistema y descuentan el mismo depósito.'],
  ['¿Qué plan me conviene?', 'Basic es para negocios chicos: 1.000 transacciones y hasta 3 usuarios. Pro es para negocios en crecimiento: 5.000 transacciones y hasta 10 usuarios. Max es para empresas con varias sucursales: transacciones y usuarios ilimitados.'],
]
