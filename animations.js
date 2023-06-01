initAnimations();

function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReducedMotion) {
    return;
  }
  
  const eagerElements = document.querySelectorAll('[data-animation-eager]');
  const lazyElements = document.querySelectorAll('[data-animation]:not([data-animation-eager])');

  triggerOnEnterScreen((element) => {
    animate(element, element.dataset.animation, element.dataset.animationDelay);
  }, lazyElements);
  
  eagerElements.forEach((element) => {
    animate(element, element.dataset.animation, element.dataset.animationDelay);
  });
}

function animate(element) {
  if(element === null) {
    return;
  }

  const delay = element.dataset.animationDelay;
  if(delay === null || delay === 0) {
    addAnimationClass(element, element.dataset.animation);
    return;
  }

  addAnimationClass(element, element.dataset.animation);

  if(element.dataset.animationChildren !== undefined) {
    animateChildren(element);
  }
}

function addAnimationClass(element, animation) {
  element.style.visibility = 'visible';
  element.classList.add(animation);
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

function animateChildren(element) {
  const children = element.children;
  for(let i = 0; i < children.length; i++) {
    const delay = element.dataset.animationChildren * i;
    children[i].style.visibility = 'hidden';
    setTimeout(() => {
      addAnimationClass(children[i], element.dataset.animation);
    }, delay);
  }
}