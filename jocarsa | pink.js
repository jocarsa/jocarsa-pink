// File: jocarsa-pink.js
/*! jocarsa-pink library v1.1
 *  A tooltip helper that smart-positions towards the screen center.
 *  (C) 2025 - Jocarsa - MIT License
 */
(function () {
  let helpModeActive = false;
  // Store a map of each element → its tooltip node
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
      // 1) Highlight the element
      el.classList.add('jocarsa-pink-highlight');

      // 2) Create tooltip DIV
      const tip = document.createElement('div');
      tip.className = 'jocarsa-pink-tooltip';
      tip.textContent = el.getAttribute('title');
      document.body.appendChild(tip);
      tooltips.set(el, tip);

      // 3) Compute element position and decide where tooltip goes
      const rect = el.getBoundingClientRect();
      const placeRight = rect.left < centerX;
      const placeBelow = rect.top < centerY;

      // Measure tooltip dimensions (must do after insertion)
      const { offsetWidth: tw, offsetHeight: th } = tip;
      let top, left;

      // Vertical placement
      if (placeBelow) {
        top = window.scrollY + rect.bottom + 6;
      } else {
        top = window.scrollY + rect.top - th - 6;
      }

      // Horizontal placement
      if (placeRight) {
        left = window.scrollX + rect.right + 6;
      } else {
        left = window.scrollX + rect.left - tw - 6;
      }

      // 4) Position it
      tip.style.top = `${top}px`;
      tip.style.left = `${left}px`;
    });
  }

  function deactivateHelpMode() {
    // Remove highlight classes
    document.querySelectorAll('.jocarsa-pink-highlight')
      .forEach(el => el.classList.remove('jocarsa-pink-highlight'));

    // Remove all tooltip nodes
    tooltips.forEach((tip) => {
      if (tip.parentNode) tip.parentNode.removeChild(tip);
    });
    // Clear the map (if supported)
    if (tooltips.clear) tooltips.clear();
  }

  function createHelpButton() {
    const btn = document.createElement('div');
    btn.className = 'jocarsa-pink-help-button';
    btn.textContent = '?';
    btn.addEventListener('click', toggleHelpMode);
    document.body.appendChild(btn);
  }

  // Expose API
  window.jocarsaPink = {
    toggleHelpMode,
    activateHelpMode,
    deactivateHelpMode
  };

  // Auto-inject button on load
  window.addEventListener('load', createHelpButton);
})();

