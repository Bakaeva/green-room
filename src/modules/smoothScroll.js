const smoothScroll = () => {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link)
      return;

    const href = link.getAttribute('href');
    if (href === '#')
      return;

    const targetElement = document.getElementById(href.slice(1));
    if (!targetElement)
      return;

    e.preventDefault();

    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
};

export default smoothScroll;