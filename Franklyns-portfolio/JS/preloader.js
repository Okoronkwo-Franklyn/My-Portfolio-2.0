(() => {
  const DURATION = 2200;
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Only run the full animation once per browser session — skip it on
  // internal page-to-page navigation so it doesn't refire on every click.
  if (sessionStorage.getItem('devfrank-preloaded')) {
    preloader.remove();
    return;
  }

  document.documentElement.style.setProperty('--preloader-duration', `${DURATION}ms`);

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      sessionStorage.setItem('devfrank-preloaded', '1');
      setTimeout(() => preloader.remove(), 500);
    }, DURATION);
  });
})();
