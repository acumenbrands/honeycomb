# Honeycomb.js

Honeycomb is an object-oriented hover intent library. A lot of hover intent libraries give you a single in-point for
invoking hover functionality, assuming you will always want action to take place on hover in and hover out. This can allow for fairly light weight libraries
but can be very difficult to work with if you need any customization.
If you have use cases for hover intent that aren't always straight forward, Honeycomb may be a good fit for you.


## API

Honeycomb gives you several API in-points, the first being `hover`. Calling Honeycomb, passing an HTMLElement as the first argument will give you
`hoverin` and `hoverout` events you can listen to on this element.

## Honeycomb.Hover

```js
var button = document.querySelector('.btn .success');
new Honeycomb.Hover(button);

button.addEventListener('hoverin', function() {
  // do stuff with button
});

button.addEventListener('hoverout', function() {
});
```

## Honeycomb.HoverOver

In the case that you only want something to happen on `hoverin` use the HoverOver object.

```js
var hover-in-button = document.querySelector('button-for-enter');

new Honeycomb.HoverOver(hover-in-button);

$(hover-in-button).on('hoverin', function() {
});
```

## Honeycomb.HoverOut

And when you just want `hoverout` functionality:

```js
var hover-out-button = document.querySelector('button-for-leave');

new Honeycomb.HoverOut(hover-out-button);

$(hover-out-button).on('hoverout', function() {
});
```

## Options

There are a few options that you can pass to any of the above API objects as a second argument.

```js
new Honeycomb.Hover(el, {
  overDelay: 250,
  outDelay: 100,
  sensitivity: 5,
  ignore_bubbles: true
});
```

### overDelay
This is the amount of time that you want Honeycomb to wait before executing your callbacks on `hoverin`.

### outDelay
This is the amount of time Honeycomb will wait before executing your callbacks on `hoverout`.

### sensitivity
This is how long you want the user to 'wait' before their mouse is considered hovering. This
is the 'intent' part of the library.

The way Honeycomb works is by capturing the user's mouse coordinates when they initially hover over the
desired element and then recording all following movements. If the amount of pixels they moved their mouse is less than
the specified `sensitivity` option then it will execute your callbacks; otherwise it will continue to wait until the
user keeps their mouse still.

### ignore_bubbles

By default when you give an element to a Honeycomb object, all `hoverin` events will bubble. Let's say you have an HTML structure like so:

```html
<ul class='list'>
  <li>
    <a href='#'></a>
  <li>
<ul>
```

And what you want to do is track the amount of times this list is hovered. Your javascript is as follows:
```js
$('.list').honeyhover();

$('.list').on('hoverin', function() {
  HoverTracker.log({ el: this, timestamp: Date.getTime() });
});
```

When your mouse hovers over `.list` it will fire your callback once logging the initial hover. However once the user's mouse moves to the `li` and then the `a`
it will log the hover two more times because the `hoverin` event bubbles. If this is not the desired functionality, you only want your callback to fire when you
hover over the actual `.list` object. Setting `ignore_bubbles` to `true` will keep your `hoverin` event from firing on each DOM element as it bubble upward.

```js
$('.list').honeyhover({ ignore_bubbles: true})
```

For a visual representation [see the difference between jQuery's mouseenter event and JavaScript's mouseover event.](http://api.jquery.com/mouseenter/)

### Defaults and Overriding
The default options are specified under `Honeycomb.Options.prototype.defaults` and can be overriden as desired.
The current defaults for all Honeycomb objects are:

| overDelay | outDelay | sensitivity | ignore_bubbles |
| --------- | -------- | ----------- | -------------- |
| 50        | 0        | 7           | false          |

You can override these globally if desired:

```js
Honeycomb.Options.prototype.defaults = {
  overDelay: 70,
  outDelay: 25,
  sensitivity: 5
  ignore_bubbles: false
}
```

__warning__ overriding this object will affect the default options passed into all `Honeycomb.Hover`, `Honeycomb.HoverOver` and `Honeycomb.HoverOut` objects.

## jQuery

A jQuery plug-in is provided to reduce the amount of syntax needed.

### $.fn.honeyhover

```js
var $success-btn = $('.btn .success')
$success-btn.honeyhover();

$success-btn.on('hoverin', function() {
});
```

This will let you listen for `hoverin` and `hoverout` events.

## Data Attributes
In the case that you do not care about the options being passed in and you just want hover functionality, you can
add data-attributes to automatically get your hover events.

You can set `data-bindable` to any of the following attributes:
* honey-hover
* honey-over
* honey-out

```html
<div data-bindable='honey-hover' class='outer-container'>
  <div data-bindable='honey-out' class='inner-container'>
  </div>
</div>
```

```js
$('.outer-container').on('hoverin', function() {
});

$('.outer-container').on('hoverout', function() {
});

$('.inner-container').on('hoverout', function() {
});

```

## Running the Tests

To run the tests you can either run them in your browser via `spec/SpecRunner.html` or if you have ruby installed you can run them
from your terminal. Simply

```ruby
bundle install
```

and then run
```ruby
rake
```

## Contributing

Fork the repo, make a pull request. Please test your code with Jasmine. Please use the existing polyfills when needed, and when adding new ones
do not override or add onto global JavaScript objects like `Array` or `Object`. Hang all polyfills off of `Honeycomb`.

Please follow the object oriented convention defined throughout the source.

```js
Honeycomb.NewObject = (function() {
  function NewObject() {
  };

  NewObject.prototype.myMethod = function() {
  };

  return NewObject;
})();
```

## Licence

Licensed under the GNU General Public License.

Copyright Acumen Brands Inc. 2014
