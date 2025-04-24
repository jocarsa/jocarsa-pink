// File: jocarsa-pink.js
/*! jocarsa-pink library v1.2
 *  A tooltip helper that smart-positions towards the screen center,
 *  using each element’s full width/height to decide placement.
 *  (C) 2025 - Jocarsa - MIT License
 */
(function () {
  let helpModeActive = false;
  const tooltips = new WeakMap();

  function toggleHelpMode() {
    helpModeActive = !helpModeActive;
    helpModeActive ? activateHelpMode() : deactivateHelpMode();
  }

  function activateHelpMode() {
    const elements = document.querySelectorAll('[title]');
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const centerX = vw / 2;
    const centerY = vh / 2;

    elements.forEach(el => {
      el.classList.add('jocarsa-pink-highlight');

      const tip = document.createElement('div');
      tip.className = 'jocarsa-pink-tooltip';
      tip.textContent = el.getAttribute('title');
      document.body.appendChild(tip);
      tooltips.set(el, tip);

      const rect = el.getBoundingClientRect();

      // Compute element’s center
      const elCenterX = rect.left + rect.width  / 2;
      const elCenterY = rect.top  + rect.height / 2;

      // Decide horizontal: if element’s center is left of screen center, place tooltip to right
      const placeRight = elCenterX < centerX;
      // Decide vertical: if element’s center is above screen center, place tooltip below
      const placeBelow = elCenterY < centerY;

      // Measure tooltip
      const { offsetWidth: tw, offsetHeight: th } = tip;
      let top, left;

      // Vertical offset
      if (placeBelow) {
        top  = window.scrollY + rect.bottom + 6;
      } else {
        top  = window.scrollY + rect.top    - th    - 6;
      }

      // Horizontal offset
      if (placeRight) {
        left = window.scrollX + rect.right  + 6;
      } else {
        left = window.scrollX + rect.left   - tw    - 6;
      }

      tip.style.top  = `${top}px`;
      tip.style.left = `${left}px`;
    });
  }

  function deactivateHelpMode() {
    document.querySelectorAll('.jocarsa-pink-highlight')
      .forEach(el => el.classList.remove('jocarsa-pink-highlight'));

    tooltips.forEach(tip => {
      if (tip.parentNode) tip.parentNode.removeChild(tip);
    });
    if (tooltips.clear) tooltips.clear();
  }

  function createHelpButton() {
    const btn = document.createElement('div');
    btn.className = 'jocarsa-pink-help-button';
    btn.textContent = '?';
    btn.addEventListener('click', toggleHelpMode);
    document.body.appendChild(btn);
  }

  window.jocarsaPink = {
    toggleHelpMode,
    activateHelpMode,
    deactivateHelpMode
  };

  window.addEventListener('load', createHelpButton);
})();

