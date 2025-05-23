/*! jocarsa-pink library v1.3
 *  A tooltip helper that smart-positions towards the screen center,
 *  de-overlaps tooltips, draws connector lines,
 *  and highlights on hover.
 *  (C) 2025 - Jocarsa - MIT License
 */
(function () {
  let helpModeActive = false;
  let connectorLayer;

  function toggleHelpMode() {
    helpModeActive = !helpModeActive;
    helpModeActive ? activateHelpMode() : deactivateHelpMode();
  }

  function createConnectorLayer() {
    connectorLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    connectorLayer.classList.add('jocarsa-pink-connector-layer');
    connectorLayer.setAttribute('style', 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99998;');
    document.body.appendChild(connectorLayer);
  }

  function clearConnectors() {
    if (connectorLayer) {
      connectorLayer.remove();
      connectorLayer = null;
    }
  }

  function activateHelpMode() {
    const elements = Array.from(document.querySelectorAll('[title]'));
    createConnectorLayer();

    // create tooltips and record their data
    const tips = elements.map(el => {
      el.classList.add('jocarsa-pink-highlight');
      const tip = document.createElement('div');
      tip.className = 'jocarsa-pink-tooltip';
      tip.textContent = el.getAttribute('title');
      document.body.appendChild(tip);

      // add hover handlers
      tip.addEventListener('mouseenter', () => highlightItem(item));
      tip.addEventListener('mouseleave', () => resetItem(item));

      const rect = el.getBoundingClientRect();
      return { el, tip, rect };
    });

    const vw = window.innerWidth, vh = window.innerHeight;
    const centerX = vw / 2, centerY = vh / 2;

    // initial placement
    tips.forEach(item => {
      const { el, tip, rect } = item;
      const elCenterX = rect.left + rect.width / 2;
      const elCenterY = rect.top + rect.height / 2;
      const placeRight = elCenterX < centerX;
      const placeBelow = elCenterY < centerY;
      const { offsetWidth: tw, offsetHeight: th } = tip;

      let top = placeBelow
        ? window.scrollY + rect.bottom + 6
        : window.scrollY + rect.top - th - 6;
      let left = placeRight
        ? window.scrollX + rect.right + 6
        : window.scrollX + rect.left - tw - 6;

      tip.style.top = `${top}px`;
      tip.style.left = `${left}px`;

      item.box = tip.getBoundingClientRect();
    });

    // simple de-overlap: shift overlapping tips
    for (let i = 0; i < tips.length; i++) {
      for (let j = i + 1; j < tips.length; j++) {
        const a = tips[i].box;
        const b = tips[j].box;
        if (!(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom)) {
          const shift = a.bottom - b.top + 6;
          const newTop = b.top + shift;
          tips[j].tip.style.top = `${newTop + window.scrollY}px`;
          tips[j].box = tips[j].tip.getBoundingClientRect();
        }
      }
    }

    // draw connectors and setup hover linkage
    tips.forEach(item => {
      const { el, tip, box, rect } = item;
      // element center
      const ex = rect.left + rect.width / 2 + window.scrollX;
      const ey = rect.top + rect.height / 2 + window.scrollY;
      // tip center
      const tx = box.left + box.width / 2;
      const ty = box.top + box.height / 2;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', ex);
      line.setAttribute('y1', ey);
      line.setAttribute('x2', tx);
      line.setAttribute('y2', ty);
      line.setAttribute('stroke', 'pink');
      line.setAttribute('stroke-width', '1');
      connectorLayer.appendChild(line);

      // store line reference
      item.line = line;

      // adjust hover handlers now that item is defined
      tip.addEventListener('mouseenter', () => highlightItem(item));
      tip.addEventListener('mouseleave', () => resetItem(item));
    });

    function highlightItem({ el, tip, line }) {
      el.style.outline = '3px solid deeppink';
      tip.style.border = '2px solid deeppink';
      tip.style.background = '#ffd0d0';
      line.setAttribute('stroke-width', '2');
    }

    function resetItem({ el, tip, line }) {
      el.style.outline = '';
      tip.style.border = '';
      tip.style.background = '';
      line.setAttribute('stroke-width', '1');
    }
  }

  function deactivateHelpMode() {
    document.querySelectorAll('.jocarsa-pink-highlight')
      .forEach(el => {
        el.classList.remove('jocarsa-pink-highlight');
        el.style.outline = '';
      });
    document.querySelectorAll('.jocarsa-pink-tooltip')
      .forEach(tip => tip.remove());
    clearConnectors();
  }

  function createHelpButton() {
    const btn = document.createElement('div');
    btn.className = 'jocarsa-pink-help-button';
    btn.textContent = '?';
    btn.addEventListener('click', toggleHelpMode);
    document.body.appendChild(btn);
  }

  window.jocarsaPink = { toggleHelpMode, activateHelpMode, deactivateHelpMode };
  window.addEventListener('load', createHelpButton);
})();

