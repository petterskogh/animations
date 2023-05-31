initAnimations();

function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReducedMotion) {
    return;
  }
  
  const eagerElements = document.querySelectorAll('[data-animation-eager]');
  const lazyElements = document.querySelectorAll('[data-animation]:not([data-animation-eager])');
  
  console.log(eagerElements.length);

  triggerOnEnterScreen((element) => {
    animate(element, element.dataset.animation);
  }, lazyElements);
  
  eagerElements.forEach((element) => {
    animate(element, element.dataset.animation, element.dataset.animationDelay);
  });
}

function animate(element, animation, delay = 0) {
  if(element === null) {
    return;
  }

  if(delay === null || delay === 0) {
    element.style.visibility = 'visible';
    element.classList.add(animation);
    return;
  }

  setTimeout(() => {
    element.style.visibility = 'visible';
    element.classList.add(animation);
  }, delay);
}

function triggerOnEnterScreen(enterScreenCallback, elements) {
  const enterScreenObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        const element = entry.target;
        enterScreenCallback(element);
        enterScreenObserver.unobserve(element);
      }
    });
  });

  elements.forEach((element) => {
    enterScreenObserver.observe(element);
  });
}