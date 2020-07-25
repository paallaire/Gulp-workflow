
/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = module.exports = require('@frctl/fractal').create();
const twigAdapter = require('@frctl/twig')();

fractal.components.engine(twigAdapter);
fractal.components.set('ext', '.twig');

/* Set the title of the project */
fractal.set('project.title', 'Styleguide');

/* Tell Fractal where the components will live */
fractal.components.set('path', `${__dirname}/styleguide/components`);

/* Tell Fractal where the documentation pages will live */
fractal.docs.set('path', `${__dirname}/styleguide/docs`);

fractal.web.set('builder.dest', `${__dirname}/styleguide-docs`);

/* Hard-code a port number to start the server on. */
fractal.web.set('server.port', 4000);

/* Specify a directory of static assets */
fractal.web.set('static.path', `${__dirname}/public/dist`);

// fractal.components.set('default.preview', '@preview');
