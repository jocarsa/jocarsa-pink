# jocarsa-pink

**jocarsa-pink** is a lightweight JavaScript library that makes it easy to highlight HTML elements with a `title` attribute. By toggling a simple help mode with a floating "?" button, you can instantly visualize tooltips and provide additional context without altering your layout.

## Features

- **Instant Visual Feedback:** Highlights elements by adding an outline and floating tooltip derived from the `title` attribute.
- **Non-Intrusive Styling:** Uses CSS outlines with offsets and pseudo-elements, ensuring your app’s layout remains intact.
- **Toggleable Help Mode:** Easily activate or deactivate the highlighting feature with a floating "?" button.
- **Dynamic Element Support:** Automatically works with elements added after page load.
- **Simple Integration:** Just include the CSS and JS files and let the library do the rest!

## Demo

Experience the live demo on GitHub Pages:  
[https://jocarsa.github.io/jocarsa-pink/](https://jocarsa.github.io/jocarsa-pink/)

## Installation

### Download

Download the library from this repository and include it in your project:

```html
<!-- Include CSS -->
<link rel="stylesheet" href="path/to/jocarsa-pink.css">

<!-- Include JS -->
<script src="path/to/jocarsa-pink.js"></script>
Hotlink via GitHub Pages
Alternatively, you can hotlink the library directly:

html
Copiar
<!-- Hotlink CSS -->
<link rel="stylesheet" href="https://jocarsa.github.io/jocarsa-pink/jocarsa-pink.css">

<!-- Hotlink JS -->
<script src="https://jocarsa.github.io/jocarsa-pink/jocarsa-pink.js"></script>
Usage
Add Title Attributes:
Simply add a title attribute to any HTML element you want to highlight:

html
Copiar
<p title="This is a tooltip">Hover to see the tooltip</p>
Activate Help Mode:
The library automatically injects a floating "?" button into the top-right corner. Click it to toggle the help mode on or off.

Dynamic Elements:
Any elements created dynamically with a title attribute will be highlighted when help mode is activated.

Code Structure
bash
Copiar
/jocarsa-pink
├── README.md          # This file
├── index.html         # Demo page
├── jocarsa-pink.css   # CSS styles for highlighting and tooltips
└── jocarsa-pink.js    # JavaScript library for toggling help mode
Contributing
Contributions, bug reports, and feature requests are welcome. Feel free to open an issue or submit a pull request.

License
MIT License © 2025 Jocarsa

Enjoy using jocarsa-pink to enhance your UI with interactive tooltips and highlights effortlessly!
