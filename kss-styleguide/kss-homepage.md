# Styleguide

## TO-DO

- [x] Form label floating
- [ ] Form toggle On/Off
- [x] Form message error
- [x] Form note
- [ ] Base list ul & ol
- [ ] stikcy nav up & down
- [ ] update modal https://alligator.io/vuejs/vue-modal-component/
- [ ] import hyperform from 'hyperform'; not working for IE 10-11

# Collections
[https://github.com/sorrycc/awesome-javascript](https://github.com/sorrycc/awesome-javascript)

## Documentation syntax

[The official KSS spec on the KSS-node repository](https://github.com/kss-node/kss/blob/spec/SPEC.md)
[michelangelo theme](https://github.com/stamkracht/michelangelo)

## Accessibility
https://a11y-style-guide.com/style-guide/

## SASS
https://sass-guidelin.es/fr/

## Reference

https://ustyle.guide/pattern-library/typography.html

Custom styles 
--------------

```
kss-styleguide\custom-template\kss-assets\css
```

## Mamespaces
Here’s a list of namespaces I use:

<ol>
<li><code>.l-</code>: layouts</li>
<li><code>.o-</code>: objects</li>
<li><code>.c-</code>: components</li>
<li><code>.js</code>: JavaScript hooks</li>
<li><code>.is-</code>|<code>.has-</code>: state classes</li>
<li><code>.h1</code>|<code>.t1</code>: typography sizes</li>
<li><code>.u-</code>: utility classes</li>
</ol>

## Custom markup

When you're dealing with a high amount of example markup and you don't want to cause any code-bloat, seperate your example markup from your css modules. In your css module, link to the file for your example markup. (e.g., Markup: ../kss_styleguide/markup/components.form.html)
