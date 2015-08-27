# jquery-element

### What is it ?
Since June (2015), I am writing a project: [jquery-element](https://github.com/Mr21/jquery-element) about the **webcomponents**.
This project transforms automatically several DOM elements (`div`, `span`, `input`, etc.) into some dynamic elements with a complex (or not) HTML structure with CSS, events, etc.

### Some demos:
* [**nicerange-html5**](https://mr21.github.io/nicerange-html5/)
* [**joystick-html5**](https://mr21.github.io/joystick-html5/)

### Why this and not polymer/x-tags/etc. ?
My idea is to have the possibility to create and use some web components as **easily** than we create and use the jQuery plugins.
Without any learning curve (except learning jQuery and the JavaScript itself). The style of the code will looks like to some basics jQuery code.

### What is the API ?
Actually I wrote only two methods: `$.element()` and `$.fn.element()`.  
The first one let you create a new type of *jquery-element*.  
The second one let you access to the API of the *jquery-element* already initialised.

### Example: creating a new type of *jquery-element*: `"number"`
``` javascript
$.element({
	name: "number",
	init: function() {
		// `this.jqElement` corresponds to the jQuery object
		// of the element who are just initialised.
		this.num = +this.jqElement.text() || 0;
	},
	prototype: {
		inc: function( n ) {
			this.jqElement.text( ++this.num );
			return this;
		}
	}
});
```
This code, will scan all the `*[data-jquery-element="number"]` elements who are on the page already and watch all the new inserted elements with that specific attribute by using a [MutationObserver](https://developer.mozilla.org/en/docs/Web/API/MutationObserver).

### How can we interact with these elements?
The methode `$.fn.element()` return the prototype, etc. relative to the selected element by jQuery. Example:
``` html
<div id="jqNumber" data-jquery-element="number">21</div><!-- will become 22 -->
<script>
$( function() {
	
	// This line...
	$( "#jqNumber" ).element().inc();
	
	// ... is equivalent to...
	// $( "#jqNumber" ).eq( 0 ).element().inc();
});
</script>
```

`$.fn.element()` can also perform a `$.each()` for you:
``` html
<div class="jqNumber" data-jquery-element="number">21</div><!-- will become 22 -->
<div class="jqNumber" data-jquery-element="number">23</div><!-- will become 24 -->
<script>
$( function() {
	
	// This line...
	$( ".jqNumber" ).element( "inc" );

	/* ... is equivalent to...
	$( ".jqNumber" ).each( function() {
		var proto = $( this ).element();
		if ( proto && proto.inc ) {
			proto.inc();
		}
	}); */

	// It is possible to passe some arguments to $.fn.element(), like:
	// $( ".many" ).element( "methode", argA, argB, ... );
});
</script>
```
All the combinaisons of loading is supported:
``` html
<script src="jquery.js"></script>
<script src="jquery-element.js"></script>
<script src="jquery-element-myElement.js"></script>
<div data-jquery-element="myElement"></div>
<script>
$(function() {
	$( "div" ).element(); // <-- works
})
</script>
```
If you add `jquery-element-myElement.js` after the `div` itself, it's work faster. If you add the `$(fn)` in the `<head>`, it's okay, with `window.onload` etc. all these different possibilities are working and tested [here](https://github.com/Mr21/jquery-element/tree/master/tests/load/ok).

### What `$.element({ ... })` can do ?
Except the `name` attribute, all the others are optionnal.
``` javascript
$.element({

	// The name for this specific type of jquery-element.
	// It correspond to the <xxx data-jquery-element="foo"></xxx>
	name: "foo",
	
	// This CSS will be appended to the <head> in a <style> element.
	css: ".foo { ... }",
	
	// This attribute will perform a simple
	// innerHTML to the element "number" with this content.
	html: "<div class='child'></div>",

	// This attribute is like "html" above, but allows you to
	// detach the element "number" and re-inserte it in some new HTML.
	// The string "{{html}}" represente the element with the data-jquery-element.
	htmlReplace:
		"<div class='number'>"+
			"{{html}}"+
			"<b>hello</b>"+
		"</div>",

	// This function is called when the jquery-element is ready.
	// If there was need 
	init: function() {
		// This attribute correspond to the jquery-element
		// already wrapped into a jQuery object.
		this.jqElement;
	},
	
	// Each element will be extended with this prototype
	// to be use after the initialisation, with $.fn.element().
	prototype: {
		methode: function() {}
	}
});
```

### The code: `jquery-element.js`
I hope the file: [jquery-element.js](https://github.com/Mr21/jquery-element/blob/master/jquery-element.js) is correctly written and enough simple, I've added several comments every where and I wrote some [unit-tests](https://github.com/Mr21/jquery-element/tree/master/tests).

Please enjoy :)
