# Base

Front-end boilerplate for projects

## Installation

```
npm install 
```

## Usage

```
# Build dev 
npm run dev

# Build production 
npm run prod

# Watch
npm run watch

# Stylelint 
npm run stylelint

# eslint 
npm run eslint
```

## Animtions

- https://material.io/design/motion/
- https://material.io/design/motion/speed.html
- https://material.io/design/motion/choreography.html
- https://material-components.github.io/material-components-web-catalog/#/

#### Inspirations

- https://codepen.io/hone/pen/jERzmd
- https://codepen.io/search/pens?q=material&page=1&order=popularity&depth=everything
- https://github.com/ben-rogerson/agency-webpack-mix-config



# CSS

https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/

### BEM

- **Block:** The sole root of the component.
- **Element:** A component part of the Block.
- **Modifier:** A variant or extension of the Block.

```css
.block {}
.block__element {}
.block--modifier {}
```

### Namespaces

- **Layout (l-)** :
  Il regroupe tous les éléments faisant partie de la mise en page. C'est l'une des parties générales et structurelles de votre UI, utilisée généralement sur tous les écrans de votre site.
  Exemple : `l-header` `l-main` `l-sidebar` `l-footer` `...`
- **Object (o-)** :
  Il signifie que cet élément est un objet. C'est une partie d'UI déterminée et identifiable (*"Ceci est un bouton", "Ceci est une modale"...*) qui peut être utilisée de manière répétée dans votre projet.
  Exemple : `o-button` `o-text` `o-tag` `o-heading` `...`
- **Component (c-)** :
  Il signifie que cet élément est un composant. C'est un élément spécifique (parfois même abstrait), qui peut être utilisé de manière ciblée, sans discernement de sa position dans le code.
  Exemple : `c-banner` `c-slider` `c-hero` `c-block-alert` `...`
- **Utility (tailwindcss)** :
  C'est une classe utilitaire. Elle est utilisée pour écraser et modifier le comportement des éléments ciblés.  [tailwindcss](https://tailwindcss.com) est utilisé pour cette partie.
  Exemple : mt-1 `px-1 ` `flex` `...`
- **State (is-) / (has-)** :
  C'est une classe d'état.
  Elle sert à indiquer un changement visuel lié à une action effectuée sur la page. Exemple : `is-loading` `is-collapsed` `has-error` `has-result` `...`
- **JavaScript (js-)** :
  Cette dernière classe indique la présence d'une interaction JavaScript.
  Exemple : `js-map` `js-slider` `...`

## Suggestions modules

**SWUP**

Complete, flexible, extensible and easy to use page transition library for your web.

https://github.com/swup/swup#readme

**Swiper** 

Swiper - is the free and most modern mobile touch slider with hardware accelerated transitions and amazing native behavior.

https://swiperjs.com/

**gsap (greensock)**

Think of GSAP as the Swiss Army Knife of javascript animation...but better. It animates anything JavaScript can touch (CSS properties, canvas library objects, SVG, React, Vue, generic objects, whatever) and it solves countless browser inconsistencies, all with blazing speed (up to 20x faster than jQuery), including automatic GPU-acceleration of transforms.

https://greensock.com/gsap/

**simpleparallax**

simpleParallax is a simple and tiny JavaScript library which adds parallax animations on any images.

https://simpleparallax.com/

**rellax**

Rellax is a buttery smooth, super lightweight, vanilla javascript parallax library.

https://dixonandmoe.com/rellax/
