# Base

## TO DO

workflow email

- See https://github.com/paallaire/Email-workflow

SVG

- https://sarasoueidan.com/blog/icon-fonts-to-svg/ ( Using font-blast )
- https://github.com/jkphl/gulp-svg-sprite#basic-example
- https://github.com/jonathantneal/svg4everybody

## Installation 

npm install && bower install && gulp

## Projet architecture

root/ 

- assets/ # Static asset files (images, videos, fonts, etc.)

- static/ # Source files, development is done here

- public/ # Distribution files are automatically generated here, this is where you check your work in a browser.

  ​
## SASS architecture

styles/ 

- settings/ 

  -  _variables.scss   # Sass Variables 

- tools/ 

  -  _functions.scss   # Sass Functions 
  -  _mixins.scss      # Sass Mixins 

- base/ 

  -  _reset.scss       # Reset/normalize 
  -  _fonts.scss       # Fonts rules 
  -  _icons.scss       # Icons rules 
  -  _typography.scss  # Typography rules 

- elements/ 

  -  _buttons.scss     # Buttons 
  -  ...                  # Etc… 

- components/

  -  _carousel.scss    # Carousel 
  -  ...                  # Etc… 

- objects/ 

  -  _grid.scss        # Grid system 
  -  _containers.scss  # Containers

- 
  layout/ 

  -  _header.scss      # Header 
  -  _footer.scss      # Footer 
  -  _sidebar.scss     # Sidebar 

- 
  pages/ 

  -  _home.scss        # Home specific styles 
  -  ...                  # Etc… 

- 
  themes/ 

  -  _styleguide.scss  # Stylesguide 
  -  ...                  # Etc… 

- 
  utils/ 

  -  _mq-status.scss      # Mediaquries status 
  -  _mq-visibility.scss  # Mediaquries visibility 
  -  ...                     # Etc… 

- 
  vendors/ 

  -  _bootstrap.scss   # Bootstrap 
  -  _jquery-ui.scss   # jQuery UI 
  -  ...                  # Etc… 

- main.scss             # primary Sass file 

----------------------------------------------------------------------

**Settings** – used with preprocessors and contain font, colors definitions, etc.

**Tools** – globally used mixins and functions.

**Base** – reset and/or normalize styles, box-sizing definition, etc. 

**Elements** – styling for bare HTML elements (like H1, A, etc.). These come with default styling from the browser so we can redefine them here.

**Objects** – class-based selectors which define undecorated design patterns, for example media object known from OOCSS

**Components** – specific UI components. This is where majority of our work takes place and our UI components are often composed of Objects and Components

**Layout** - layout styles can also be divided into major and minor styles based on reuse. 

**Pages** - pages that requires special elements, components etc...

**Themes** - Override base styles like default link colours. It could change module elements such as chrome colours and borders. 

**Utils** – utilities and helper classes with ability to override anything which goes before in the triangle, eg. hide helper class

**Vendors** – external libraries

