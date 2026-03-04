import { Fancybox } from "@fancyapps/ui";
import IMask from "imask";
import Swiper from "swiper";
import { Navigation, EffectFade, Pagination, Autoplay } from "swiper/modules";

import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

document.addEventListener("DOMContentLoaded", () => {
  const initPhoneMask = () => {
    const inputs = document.querySelectorAll('input[type="tel"]:not([data-mask-init])');
    if (!inputs.length) return;

    inputs.forEach((input) => {
      IMask(input, {
        mask: "+{7} (000) 000-00-00",
        lazy: false,
      });

      input.dataset.maskInit = "true";
    });
  };

  const initHeroSlider = () => {
    const slider = document.querySelector(".hero-slider__body");
    if (!slider) return;

    const progressBar = slider.querySelector(".hero-slider__progress-bar");

    const swiper = new Swiper(slider, {
      modules: [Navigation, Pagination, EffectFade, Autoplay],

      slidesPerView: 1,
      loop: true,
      speed: 350,

      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },

      // allowTouchMove: false,

      navigation: {
        nextEl: slider.querySelector(".hero-slider__nav--next"),
        prevEl: slider.querySelector(".hero-slider__nav--prev"),
      },

      pagination: {
        el: slider.querySelector(".hero-slider__pagination"),
        clickable: true,
      },

      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },

      on: {
        autoplayTimeLeft(swiper, timeLeft, percentage) {
          if (progressBar) {
            progressBar.style.width = (1 - percentage) * 100 + "%";
          }
        },
      },
    });

    slider.addEventListener("mouseenter", () => {
      swiper.autoplay.stop();

      if (progressBar) {
        progressBar.style.opacity = "0";
      }
    });

    slider.addEventListener("mouseleave", () => {
      if (progressBar) {
        progressBar.style.width = "0%";
        progressBar.style.opacity = "1";
      }

      swiper.autoplay.start();
    });
  };

  const initSalesSlider = () => {
    const slider = document.querySelector(".sales__slider");
    if (!slider) return;

    const wrapper = slider.closest(".sales__slider-wrapper");
    if (!wrapper) return;

    const swiper = new Swiper(slider, {
      modules: [Navigation],
      loop: true,
      slidesPerView: 4,
      spaceBetween: 16,
      navigation: {
        nextEl: wrapper.querySelector(".sales__slider-nav--next"),
        prevEl: wrapper.querySelector(".sales__slider-nav--prev"),
      },
      breakpoints: {
        0: {
          slidesPerView: "auto",
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
      },
    });
  };

  const initModelSlider = () => {
    const sliders = document.querySelectorAll(".model__picture");
    if (sliders.length < 0) return;

    sliders.forEach((el) => {
      const slider = el.querySelector(".model__slider");
      const swiper = new Swiper(slider, {
        modules: [Pagination, EffectFade],

        slidesPerView: 1,
        speed: 350,

        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },

        allowTouchMove: false,
      });

      const colors = el.querySelectorAll(".model__color");
      const colorTitle = el.querySelector(".model__color-title");

      if (colors.length > 0 && colorTitle) {
        colorTitle.innerHTML = colors[0].getAttribute("data-color");
        colors.forEach((color, index) => {
          color.addEventListener("click", () => {
            swiper.slideTo(index);
            colors.forEach((c) => c.classList.remove("model__color--active"));
            color.classList.add("model__color--active");
            colorTitle.innerHTML = color.getAttribute("data-color");
          });
        });
      }
    });
  };

  const initTriggerGallery = () => {
    const albums = document.querySelectorAll(".model__album");

    if (albums.length > 0) {
      albums.forEach((el) => {
        el.addEventListener("click", (e) => {
          e.preventDefault();

          const gallery = el.getAttribute("data-trigger");
          if (!gallery) return;

          const galleryItems = document.querySelectorAll(`[data-fancybox="${gallery}"]`);

          if (galleryItems.length) {
            galleryItems[0].click();
          }
        });
      });
    }
  };

  Fancybox.bind("[data-fancybox], [data-fancybox-trigger]", {
    closeButton: true,
    autoFocus: false,
    on: {
      done: () => {
        initPhoneMask();
      },
    },
  });

  initPhoneMask();
  initHeroSlider();
  initSalesSlider();
  initModelSlider();
  initTriggerGallery();
});
