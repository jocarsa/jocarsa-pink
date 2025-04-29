// File: jocarsa-pink.js
/*! jocarsa-pink library v1.2
 *  A tooltip helper that smart-positions towards the screen center,
 *  using each element’s full width/height to decide placement.
 *  (C) 2025 - Jocarsa - MIT License
 */
(function () {
  let helpModeActive = false;

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

      const rect = el.getBoundingClientRect();
      const elCenterX = rect.left + rect.width / 2;
      const elCenterY = rect.top + rect.height / 2;

      const placeRight = elCenterX < centerX;
      const placeBelow = elCenterY < centerY;
      const { offsetWidth: tw, offsetHeight: th } = tip;

      let top  = placeBelow
        ? window.scrollY + rect.bottom + 6
        : window.scrollY + rect.top    - th    - 6;

      let left = placeRight
        ? window.scrollX + rect.right  + 6
        : window.scrollX + rect.left   - tw    - 6;

      tip.style.top  = `${top}px`;
      tip.style.left = `${left}px`;
    });
  }

  function deactivateHelpMode() {
    // remove highlights
    document.querySelectorAll('.jocarsa-pink-highlight')
      .forEach(el => el.classList.remove('jocarsa-pink-highlight'));

    // remove all tooltips
    document.querySelectorAll('.jocarsa-pink-tooltip')
      .forEach(tip => tip.remove());
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

