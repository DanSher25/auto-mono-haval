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

      allowTouchMove: false,

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
     });
   };

   Fancybox.bind("[data-fancybox='']", {
     closeButton: true,
     autoFocus: false,
     backdropClick: false,
     on: {
       done: () => {
         initPhoneMask();
       },
     },
   });

   initPhoneMask();
   initHeroSlider();
   initSalesSlider();
});
