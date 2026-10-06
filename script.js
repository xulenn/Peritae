(() => {
  'use strict';

  // Contact email used by the request form (mailto). Replace with the real one.
  const CONTACT_EMAIL = 'hola@peritae.eus';

  const BLOCKS = [
    { n: 1, t: 'Estructura y elementos constructivos', p: '≈25 puntos',
      d: 'Distinguir un movimiento natural de un asiento estructural puede ser la diferencia entre 0 € y 30.000 €.',
      i: [['Fisuras y grietas', 'ancho, dirección y gravedad con fisurómetro'],
          ['Forjados', 'flechas y deformaciones con nivel láser'],
          ['Pilares y vigas', 'armadura vista, óxido y abombamientos'],
          ['Muros de carga vs. tabiquería', 'qué se puede derribar en una reforma'],
          ['Aluminosis', 'indicios en edificios de 1955–1975'],
          ['Fachada y cubierta accesible', 'desprendimientos, impermeabilización y sumideros']] },
    { n: 2, t: 'Humedades y patologías', p: '≈20 puntos',
      d: 'Recorremos toda la vivienda con higrómetro y cámara termográfica, midiendo los puntos de riesgo.',
      i: [['Capilaridad', 'humedad ascendente en planta baja o sótano'],
          ['Filtraciones', 'por cubierta, fachada, terraza o instalación'],
          ['Condensación', 'en puentes térmicos, confirmada con termografía'],
          ['Moho y hongos', 'presencia, extensión y ventilación asociada'],
          ['Pintura reciente', 'comprobación sistemática sobre zonas húmedas']] },
    { n: 3, t: 'Instalación eléctrica', p: '≈25 puntos',
      d: 'Evaluamos el estado y la adecuación aparente (REBT, RD 842/2002). No se emite certificado.',
      i: [['Cuadro general', 'ICP, IGA, diferencial, magnetotérmicos y circuitos'],
          ['Toma de tierra', 'comprobada en enchufes'],
          ['Polaridad y tensión', 'en cada estancia'],
          ['Cableado visible', 'tipo, antigüedad, aluminio o instalación anterior a 1973'],
          ['Mecanismos', 'puntos de luz, enchufes e interruptores'],
          ['Boletín eléctrico (CIE)', 'existencia y fecha']] },
    { n: 4, t: 'Fontanería, saneamiento y gas', p: '≈25 puntos',
      d: 'Identificamos materiales críticos y comprobamos el funcionamiento real de la instalación.',
      i: [['Tuberías', 'plomo, hierro galvanizado, cobre o multicapa'],
          ['Presión y caudal', 'apertura simultánea de grifos'],
          ['Fugas visibles', 'fregadero, lavabos, cisternas y llaves de paso'],
          ['Desagües', 'evacuación, olores, sifones y bajantes'],
          ['Agua caliente', 'aparato, antigüedad, ubicación y ventilación'],
          ['Gas', 'instalación vista, revisión quinquenal y detección de fugas']] },
    { n: 5, t: 'Envolvente, carpintería y confort', p: '≈20 puntos',
      d: 'Lo que determina el confort diario y la factura energética de la vivienda.',
      i: [['Carpintería exterior', 'material, estanqueidad, persianas y cajones'],
          ['Vidrio', 'monolítico o doble acristalamiento y sello perimetral'],
          ['Aislamiento y puentes térmicos', 'verificación por termografía'],
          ['Orientación y ventilación', 'luz natural y ventilación cruzada'],
          ['Extracción', 'ventilación forzada en baños y cocina'],
          ['Aislamiento acústico', 'percibido respecto a calle, vecinos y patio']] },
    { n: 6, t: 'Acabados y distribución', p: '≈30 puntos',
      d: 'Estado de cada estancia documentado con fotografía y posibilidades de reforma.',
      i: [['Pavimentos y alicatados', 'estado general y defectos'],
          ['Falsos techos y carpintería interior', 'conservación y funcionamiento'],
          ['Pintura, encimeras y sanitarios', 'estado de cada estancia'],
          ['Distribución y altura libre', 'medidas y posibilidades de reforma']] },
    { n: 7, t: 'Edificio, comunidad y accesibilidad', p: '≈30 puntos',
      d: 'El bloque que más valor aporta y que otros servicios tratan de forma superficial.',
      i: [['Zonas comunes', 'portal, escalera, patios, cubierta, garaje y trastero'],
          ['Ascensor', 'existencia, antigüedad, revisión y accesibilidad'],
          ['ITE del edificio', 'si está realizada, resultado y deficiencias pendientes'],
          ['Actas y derramas', 'aprobadas, en ejecución o previsibles'],
          ['Cuota y gastos de comunidad', 'impacto en el coste anual'],
          ['Accesibilidad', 'del portal a la vivienda']] },
    { n: 8, t: 'Comprobación documental y registral', p: '≈35 puntos',
      d: 'Contrastamos lo que dicen los papeles con lo que hay físicamente en la vivienda.',
      i: [['Nota simple', 'titularidad, cargas, hipotecas, embargos y servidumbres'],
          ['Superficie real', 'medida con láser frente a escritura y catastro'],
          ['Obras sin licencia aparentes', 'cierres de terraza, divisiones y ampliaciones'],
          ['Datos catastrales', 'referencia, año de construcción y uso'],
          ['Cédula de habitabilidad y CEE', 'existencia y vigencia']] }
  ];

  // Header: scrolled state + mobile menu
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const setMenu = (open) => {
    menu.classList.toggle('open', open);
    nav.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
  };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });

  // Checklist tabs
  const list = document.getElementById('tablist');
  const panel = document.getElementById('tabpanel');
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const select = (idx, focus) => {
    list.querySelectorAll('.tab').forEach((b, i) => {
      b.setAttribute('aria-selected', String(i === idx));
      b.tabIndex = i === idx ? 0 : -1;
      if (i === idx && focus) b.focus();
    });
    const b = BLOCKS[idx];
    panel.setAttribute('aria-labelledby', 'tab' + idx);
    panel.innerHTML =
      `<span class="pts">${esc(b.p)}</span><h3>${esc(b.t)}</h3><p>${esc(b.d)}</p><ul>` +
      b.i.map(([a, c]) => `<li><b>${esc(a)}:</b> ${esc(c)}</li>`).join('') + '</ul>';
  };

  BLOCKS.forEach((b, i) => {
    const btn = document.createElement('button');
    btn.className = 'tab';
    btn.id = 'tab' + i;
    btn.setAttribute('role', 'tab');
    btn.innerHTML = `<span class="tab__n">${b.n}</span><span>${esc(b.t)}</span><small>${esc(b.p)}</small>`;
    btn.addEventListener('click', () => select(i));
    btn.addEventListener('keydown', (e) => {
      const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (k) { e.preventDefault(); select((i + k + BLOCKS.length) % BLOCKS.length, true); }
    });
    list.appendChild(btn);
  });
  select(0);

  // Reveal on scroll
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('in'));
  }

  // Price calculator (tarifas del plan económico, IVA incluido)
  const SIZES = ['Hasta 100 m²', '100 – 199 m²', '200 – 299 m²', 'Más de 300 m²'];
  const SERVICES = [
    { id: 'informe', n: 'Informe Peritae', p: [329, 369, 419, 499], req: true },
    { id: 'cee', n: 'Certificado de eficiencia energética', p: [95, 125, 155, 195] },
    { id: 'pre', n: 'Pre-informe IA', p: [69, 89, 99, 119] }
  ];
  const eur = (n) => n.toLocaleString('es-ES') + ' €';
  const sizeBox = document.getElementById('calcSize');
  const svcBox = document.getElementById('calcSvc');
  const state = { size: 0, svc: new Set(['informe']) };

  SIZES.forEach((t, i) => {
    sizeBox.insertAdjacentHTML('beforeend',
      `<label class="opt"><input type="radio" name="size" value="${i}"${i === 0 ? ' checked' : ''}><span>${t}</span></label>`);
  });
  SERVICES.forEach((s) => {
    svcBox.insertAdjacentHTML('beforeend',
      `<label class="opt"><input type="checkbox" value="${s.id}"${s.id === 'informe' ? ' checked' : ''}><span>${s.n}</span><b data-p="${s.id}"></b></label>`);
  });
  document.querySelectorAll('[data-from]').forEach((el) => {
    const s = SERVICES.find((x) => x.id === el.dataset.from);
    el.textContent = eur(s.p[0]);
  });

  const renderCalc = () => {
    let total = 0;
    const lines = [];
    SERVICES.forEach((s) => {
      const price = s.p[state.size];
      svcBox.querySelector(`[data-p="${s.id}"]`).textContent = eur(price);
      if (state.svc.has(s.id)) { total += price; lines.push(`<li><span>${s.n}</span><b>${eur(price)}</b></li>`); }
    });
    document.getElementById('calcTotal').textContent = eur(total);
    document.getElementById('calcLines').innerHTML = lines.join('') || '<li><span>Selecciona un servicio</span></li>';
  };
  sizeBox.addEventListener('change', (e) => { state.size = +e.target.value; renderCalc(); });
  svcBox.addEventListener('change', (e) => {
    e.target.checked ? state.svc.add(e.target.value) : state.svc.delete(e.target.value);
    renderCalc();
  });
  renderCalc();

  // Prefill the request form from the calculator
  document.getElementById('calcCta').addEventListener('click', () => {
    const f = document.getElementById('form');
    f.m2.value = SIZES[state.size];
    const has = (id) => state.svc.has(id);
    const label = has('informe')
      ? (has('cee') && has('pre') ? 'Informe + Certificado + Pre-informe IA' : has('cee') ? 'Informe Peritae + Certificado energético' : has('pre') ? 'Informe Peritae + Pre-informe IA' : 'Informe Peritae')
      : (has('cee') && has('pre') ? null : has('cee') ? 'Solo Certificado energético' : has('pre') ? 'Solo Pre-informe IA' : null);
    if (label) f.servicio.value = label;
  });

  // Request form -> opens the user's mail client with the data prefilled
  const form = document.getElementById('form');
  const msg = document.getElementById('formmsg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach((f) => {
      const bad = f.type === 'checkbox' ? !f.checked : !f.value.trim() || (f.type === 'email' && !f.checkValidity());
      f.classList.toggle('invalid', bad);
      if (bad) ok = false;
    });
    msg.className = 'form__msg';
    if (!ok) { msg.classList.add('err'); msg.textContent = 'Revisa los campos marcados y acepta el tratamiento de datos.'; return; }
    const d = Object.fromEntries(new FormData(form));
    const body = [
      `Nombre: ${d.nombre}`, `Teléfono: ${d.tel}`, `Email: ${d.email}`,
      `Municipio: ${d.municipio}`, `Superficie: ${d.m2}`, `Perfil: ${d.perfil}`,
      `Servicio: ${d.servicio}`, '', d.msg || ''
    ].join('\n');
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Solicitud de inspección · ' + d.municipio)}&body=${encodeURIComponent(body)}`;
    msg.textContent = 'Se abrirá tu correo con la solicitud preparada. ¡Gracias!';
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
