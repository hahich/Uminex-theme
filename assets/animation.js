// js animation

class AnimationsModule {
  constructor() {
    this.SCROLL_ANIMATION_TRIGGER_CLASSNAME = '.scroll-trigger:not(.slide_in)';
    this.SCROLL_ANIMATION_OFFSCREEN_CLASSNAME = 'scroll-trigger--offscreen';
    this.SCROLL_ZOOM_IN_TRIGGER_CLASSNAME = 'animate--zoom-in';
    this.SCROLL_ANIMATION_CANCEL_CLASSNAME = 'scroll-trigger--cancel';
  }

  throttle(fn, delay) {
    let lastCall = 0;
    return (...args) => {
      const now = new Date().getTime();
      const throttleDelay = typeof delay === 'number' ? delay : 0;
      if (now - lastCall < throttleDelay) {
        return;
      }
      lastCall = now;
      return fn(...args);
    };
  }

  init() {
    window.addEventListener('DOMContentLoaded', () => {
      this.removeInitialSwiperOpacity();
      this.initializeScrollAnimationTrigger();
      this.bindAnimationEndMarkers();
      this.initializeScrollZoomAnimationTrigger();
    });

    this.registerDesignModeListeners();
  }

  bindAnimationEndMarkers() {
    const animates = document.querySelectorAll(
      this.SCROLL_ANIMATION_TRIGGER_CLASSNAME
    );
    if (animates.length > 0) {
      animates.forEach((element) => {
        element.addEventListener('animationend', (e) => {
          setTimeout(() => {
            e.target.setAttribute('animation-end', '');
          }, 1000);
        });
      });
    }
  }

  onIntersection(entries, observer) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const elementTarget = entry.target;
        if (
          elementTarget.classList.contains(
            this.SCROLL_ANIMATION_OFFSCREEN_CLASSNAME
          )
        ) {
          elementTarget.classList.remove(
            this.SCROLL_ANIMATION_OFFSCREEN_CLASSNAME
          );
          if (elementTarget.hasAttribute('data-cascade'))
            elementTarget.setAttribute('style', `--animation-order: ${index};`);
        }
        observer.unobserve(elementTarget);
      } else {
        entry.target.classList.add(
          this.SCROLL_ANIMATION_OFFSCREEN_CLASSNAME
        );
        entry.target.classList.remove(this.SCROLL_ANIMATION_CANCEL_CLASSNAME);
      }
    });
  }

  initializeScrollAnimationTrigger(rootEl = document, isDesignModeEvent = false) {
    const animationTriggerElements = Array.from(
      rootEl.querySelectorAll(this.SCROLL_ANIMATION_TRIGGER_CLASSNAME)
    );
    if (animationTriggerElements.length === 0) return;

    if (isDesignModeEvent) {
      animationTriggerElements.forEach((element) => {
        element.classList.add('scroll-trigger--design-mode');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => this.onIntersection(entries, obs),
      {
        rootMargin: '0px 0px -50px 0px',
      }
    );
    animationTriggerElements.forEach((element) => observer.observe(element));
  }

  initializeScrollZoomAnimationTrigger() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const animationTriggerElements = Array.from(
      document.getElementsByClassName(this.SCROLL_ZOOM_IN_TRIGGER_CLASSNAME)
    );

    if (animationTriggerElements.length === 0) return;

    const scaleAmount = 0.2 / 100;

    animationTriggerElements.forEach((element) => {
      let elementIsVisible = false;
      const observer = new IntersectionObserver((elements) => {
        elements.forEach((entry) => {
          elementIsVisible = entry.isIntersecting;
        });
      });
      observer.observe(element);

      element.style.setProperty(
        '--zoom-in-ratio',
        1 + scaleAmount * this.percentageSeen(element)
      );

      window.addEventListener(
        'scroll',
        this.throttle(() => {
          if (!elementIsVisible) return;

          element.style.setProperty(
            '--zoom-in-ratio',
            1 + scaleAmount * this.percentageSeen(element)
          );
        }),
        { passive: true }
      );
    });
  }

  percentageSeen(element) {
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const elementPositionY = element.getBoundingClientRect().top + scrollY;
    const elementHeight = element.offsetHeight;

    if (elementPositionY > scrollY + viewportHeight) {
      return 0;
    } else if (elementPositionY + elementHeight < scrollY) {
      return 100;
    }

    const distance = scrollY + viewportHeight - elementPositionY;
    let percentage = distance / ((viewportHeight + elementHeight) / 100);
    return Math.round(percentage);
  }

  removeInitialSwiperOpacity() {
    const elements = document.querySelectorAll('.swiper-slide.opacity-0');
    elements.forEach((el) => {
      el.classList.remove('opacity-0');
    });
  }

  registerDesignModeListeners() {
    if (typeof Shopify !== 'undefined' && Shopify.designMode) {
      document.addEventListener('shopify:section:load', (event) => {
        this.initializeScrollAnimationTrigger(event.target, true);
      });
      document.addEventListener('shopify:section:reorder', () => {
        this.initializeScrollAnimationTrigger(document, true);
      });
    }
  }
}

(() => {
  const animationsModule = new AnimationsModule();
  animationsModule.init();
  if (typeof window !== 'undefined') {
    window.AnimationsModule = AnimationsModule;
    window.animationsModule = animationsModule;
    // Backward compatibility shim for existing theme references
    window.BlsAnimations = window.BlsAnimations || {
      innit: () => animationsModule.bindAnimationEndMarkers(),
      animates: () => animationsModule.bindAnimationEndMarkers(),
    };
  }
})();