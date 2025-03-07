/*! jocarsa-pink library v1.0
 *  A simple helper to highlight elements with a 'title' attribute.
 *  (C) 2025 - Jocarsa - MIT License (example)
 */
(function () {
  // Create our namespace if it doesn't exist
  window.jocarsaPink = window.jocarsaPink || {};

  // Keep track of whether help/highlight mode is active
  let helpModeActive = false;

  /**
   * Toggles the highlighting of [title] elements on and off.
   */
  function toggleHelpMode() {
    helpModeActive = !helpModeActive;
    if (helpModeActive) {
      activateHelpMode();
    } else {
      deactivateHelpMode();
    }
  }

  /**
   * Adds the red highlight and floating text to all elements
   * currently in the DOM that have the 'title' attribute.
   */
  function activateHelpMode() {
    // Find all elements with a title attribute
    const elementsWithTitle = document.querySelectorAll('[title]');
    elementsWithTitle.forEach((el) => {
      el.classList.add('jocarsa-pink-highlight');
    });
  }

  /**
   * Removes the highlight and floating text from elements
   * by removing the .jocarsa-pink-highlight class.
   */
  function deactivateHelpMode() {
    const highlighted = document.querySelectorAll('.jocarsa-pink-highlight');
    highlighted.forEach((el) => {
      el.classList.remove('jocarsa-pink-highlight');
    });
  }

  /**
   * Creates and injects the floating "?" button in the top-right corner.
   * When clicked, it toggles the help mode.
   */
  function createHelpButton() {
    const btn = document.createElement('div');
    btn.className = 'jocarsa-pink-help-button';
    btn.textContent = '?';

    // Attach toggle event
    btn.addEventListener('click', () => {
      toggleHelpMode();
    });

    // Insert into the body
    document.body.appendChild(btn);
  }

  // Expose the relevant functions on our namespace
  window.jocarsaPink.toggleHelpMode = toggleHelpMode;
  window.jocarsaPink.activateHelpMode = activateHelpMode;
  window.jocarsaPink.deactivateHelpMode = deactivateHelpMode;

  // Automatically create the help button on load
  window.addEventListener('load', () => {
    createHelpButton();
  });
})();

