# Base

Front-end boilerplate for projects

## Installation

```
npm install 
```

## Usage

```
# Build the styleguide
npm run kss

# Stylelint 
npm run kss

# Build dev 
npm run dev

# Build production 
npm run prod

# Watch
npm run watch
```

## Configuration

See *gulpfile.config.js*

## CSS/SASS

- [Sass](http://sass-lang.com/) for CSS Preprocessor
- BEM like CSS Syntax: `.block_element -modifier`

### Sass import order

- **Abstracts**: Folder gathers all Sass tools and helpers used across the project. Every global variable, function, mixins and placeholder should be put in here. 
- **Base**: Folder holds what we might call the boilerplate code for the project. In there, you might find the reset file, some typographic rules, and probably a stylesheet defining some standard styles for commonly used HTML elements. 
- **Elements**: Explicitly named designed pieces of UI. The cosmetic layer, includes more specific styling instructions. 
- **Components:** Discrete, complete chunks of UI (e.g. `.c-carousel {}`).
- **Objects:** Objects, abstractions, and design patterns (e.g. `.o-media {}`).
- **Layout:** Folder contains everything that takes part in laying out the site or application. This folder could have stylesheets for the main parts of the site (header, footer, navigation, sidebar…), the grid system or even CSS styles for all the forms. 
- **Pages:** If you have page-specific styles, it is better to put them in a pages/ folder, in a file named after the page. For instance, it’s not uncommon to have very specific styles for the home page hence the need for a _home.scss file in pages/. 
- **Utilities:** Utility classes are helper classes that perform one thing extremely well. They do it so well, they override everything else. As such, they often only contain one property, and they include the !important declaration. 

### Namespaces

- **.l-** layouts

- **.o-** objects

- **.c-** components

- **.js** JavaScript hooks

- **.is-**|**.has-** state classes

- **.h1**|**.t1** typography sizes

- **.u-** utility classes

## Javascript

...

## TO-DO

- [x] Form label floating
- [x] Form toggle On/Off
- [x] Form message error
- [x] Form note
- [x] Base list ul & ol
- [ ] stikcy nav up & down
- [ ] update modal https://alligator.io/vuejs/vue-modal-component/
- [ ] import hyperform from 'hyperform'; not working for IE 10-11
