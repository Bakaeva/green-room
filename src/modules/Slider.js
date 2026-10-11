/**
 * Универсальный класс слайдера
 * @param {Object} config - Конфигурация слайдера
 * @param {string} config.container - CSS селектор контейнера слайдера
 * @param {string} config.slides - CSS селектор слайдов
 * @param {Object} [config.arrows] - Объект с id стрелок
 * @param {string} [config.arrows.left] - id левой стрелки
 * @param {string} [config.arrows.right] - id правой стрелки
 * @param {string} [config.tabs] - CSS селектор табов (кнопок переключения)
 * @param {string} [config.dots] - CSS селектор точек-индикаторов
 * @param {string} [config.counterCurrent] - Селектор элемента текущего слайда в счетчике
 * @param {string} [config.counterTotal] - Селектор элемента общего количества слайдов
 * @param {Function} [config.onChange] - Callback функция, вызываемая при смене слайда
 * @param {string} [config.activeClass='active'] - CSS класс для активного состояния
 * @param {number} [config.inactiveOpacity=0.4] - Непрозрачность неактивных слайдов
 */
class Slider {
  constructor(config = {}) {
    const defaults = {
      container: null,
      slides: null,
      arrows: null,
      tabs: null,
      dots: null,
      counterCurrent: null,
      counterTotal: null,
      onChange: null,
      activeClass: 'active',
      inactiveOpacity: 0.4
    };

    const settings = { ...defaults, ...config };

    // Обязательные параметры:
    this.container = document.querySelector(settings.container);
    if (!this.container) {
      console.warn(`Slider: контейнер "${settings.container}" не найден. Модуль отключён.`);
      return;
    };

    this.slides = this.container.querySelectorAll(settings.slides);
    if (this.slides.length === 0) {
      console.warn(`Slider: Слайды с классом "${settings.slides}" не найдены. Модуль отключён.`);
      return;
    };

    // Элементы управления:
    this.arrows = settings.arrows;
    this.tabs = settings.tabs ? document.querySelectorAll(settings.tabs) : null;
    this.dots = settings.dots ? document.querySelectorAll(settings.dots) : null;

    // Счетчик:
    this.counterCurrent = settings.counterCurrent
      ? document.querySelector(settings.counterCurrent)
      : null;
    this.counterTotal = settings.counterTotal
      ? document.querySelector(settings.counterTotal)
      : null;

    // Callback при смене слайда (для специфичной логики) и CSS-классы для активного/неактивного состояния:
    this.onChange = settings.onChange;
    this.activeClass = settings.activeClass;
    this.inactiveOpacity = settings.inactiveOpacity;

    this.currentIndex = 0;
    this.totalSlides = this.slides.length;

    // Сохраняем селекторы для использования в event listener:
    this.tabsSelector = settings.tabs;
    this.dotsSelector = settings.dots;

    this.init();
  };

  prevSlide(elems, index, activeClass, changeOpacity = false) {
    elems[index].classList.remove(activeClass);
    if (changeOpacity)
      elems[index].style.opacity = this.inactiveOpacity;
  };

  nextSlide(elems, index, activeClass, changeOpacity = false) {
    elems[index].classList.add(activeClass);
    if (changeOpacity)
      elems[index].style.opacity = '1';
  };

  init() {
    this.slides.forEach((slide, index) => {
      if (index === this.currentIndex) {
        slide.style.opacity = '1';
        slide.classList.add(this.activeClass);
      } else {
        slide.style.opacity = this.inactiveOpacity;
        slide.classList.remove(this.activeClass);
      };
    });

    if (this.tabs) {
      this.tabs.forEach((tab, index) => {
        if (index === this.currentIndex) {
          tab.classList.add(this.activeClass);
        } else {
          tab.classList.remove(this.activeClass);
        };
      });
    };

    if (this.dots) {
      this.dots.forEach((dot, index) => {
        if (index === this.currentIndex) {
          dot.classList.add(this.activeClass);
        } else {
          dot.classList.remove(this.activeClass);
        };
      });
    };

    if (this.counterCurrent) {
      this.counterCurrent.textContent = this.currentIndex + 1;
    };

    if (this.counterTotal) {
      this.counterTotal.textContent = this.totalSlides;
    };

    if (this.onChange) {
      this.onChange(this.currentIndex, this.slides[this.currentIndex]);
    };

    this.container.addEventListener('click', (e) => {
      const clickedLeftArrow = this.arrows?.left ? e.target.closest(`#${this.arrows.left}`) : null;
      const clickedRightArrow = this.arrows?.right ? e.target.closest(`#${this.arrows.right}`) : null;
      const arrowClick = clickedLeftArrow || clickedRightArrow;

      const clickedTab = this.tabs && e.target.closest(`.${this.tabsSelector}`);
      const clickedDot = this.dots && e.target.closest(`.${this.dotsSelector}`);
      if (!clickedTab && !clickedDot && !arrowClick)
        return;

      if (clickedTab && clickedTab.tagName === 'A') {
        e.preventDefault();
      }

      this.prevSlide(this.slides, this.currentIndex, this.activeClass, true);
      if (this.tabs)
        this.prevSlide(this.tabs, this.currentIndex, this.activeClass);
      if (this.dots)
        this.prevSlide(this.dots, this.currentIndex, this.activeClass);

      if (clickedTab) {
        this.currentIndex = [...this.tabs].indexOf(clickedTab);
      } else if (clickedDot) {
        this.currentIndex = [...this.dots].indexOf(clickedDot);
      } else if (arrowClick) {
        if (clickedLeftArrow) {
          this.currentIndex--;
          if (this.currentIndex < 0) this.currentIndex = this.totalSlides - 1;
        } else {
          this.currentIndex++;
          if (this.currentIndex == this.totalSlides) this.currentIndex = 0;
        };
      };
      if (this.counterCurrent) {
        this.counterCurrent.textContent = this.currentIndex + 1;
      };

      this.nextSlide(this.slides, this.currentIndex, this.activeClass, true);
      if (this.tabs)
        this.nextSlide(this.tabs, this.currentIndex, this.activeClass);
      if (this.dots)
        this.nextSlide(this.dots, this.currentIndex, this.activeClass);

      if (this.onChange) {
        this.onChange(this.currentIndex, this.slides[this.currentIndex]);
      };
    });
  };
};

export default Slider;