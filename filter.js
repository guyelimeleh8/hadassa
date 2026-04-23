/* ===== FILTER ===== */
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.color === filter) ? '' : 'none';
    });
  });
});

/* ===== CAROUSELS ===== */
document.querySelectorAll('.carousel').forEach(carousel => {
  const imgs = carousel.querySelectorAll('.carousel-track img');
  const dots = carousel.querySelectorAll('.dot');
  if (!imgs.length) return;
  let cur = 0;

  function show(n) {
    imgs[cur].classList.remove('active');
    if (dots[cur]) dots[cur].classList.remove('active');
    cur = (n + imgs.length) % imgs.length;
    imgs[cur].classList.add('active');
    if (dots[cur]) dots[cur].classList.add('active');
  }

  const prevBtn = carousel.querySelector('.prev-btn');
  const nextBtn = carousel.querySelector('.next-btn');
  if (prevBtn) prevBtn.addEventListener('click', e => { e.stopPropagation(); show(cur - 1); });
  if (nextBtn) nextBtn.addEventListener('click', e => { e.stopPropagation(); show(cur + 1); });
  dots.forEach((dot, i) => dot.addEventListener('click', e => { e.stopPropagation(); show(i); }));

  imgs.forEach((img, i) => {
    img.addEventListener('click', () => openLightbox([...imgs].map(x => x.src), i));
  });
});

/* ===== LIGHTBOX ===== */
const lb    = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
let lbSrcs  = [];
let lbCur   = 0;

function openLightbox(srcs, startIdx) {
  lbSrcs = srcs;
  lbCur  = startIdx;
  lbImg.src = lbSrcs[lbCur];
  lb.classList.add('open');
}

function lbShow(n) {
  lbCur = (n + lbSrcs.length) % lbSrcs.length;
  lbImg.src = lbSrcs[lbCur];
}

document.getElementById('lbClose')?.addEventListener('click', () => lb.classList.remove('open'));
document.getElementById('lbPrev')?.addEventListener('click', () => lbShow(lbCur - 1));
document.getElementById('lbNext')?.addEventListener('click', () => lbShow(lbCur + 1));
lb?.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('open'); });

document.addEventListener('keydown', e => {
  if (!lb?.classList.contains('open')) return;
  if (e.key === 'Escape') lb.classList.remove('open');
  if (e.key === 'ArrowLeft')  lbShow(lbCur + 1);
  if (e.key === 'ArrowRight') lbShow(lbCur - 1);
});

document.querySelectorAll('.single-img').forEach(img => {
  img.addEventListener('click', () => openLightbox([img.src], 0));
});
