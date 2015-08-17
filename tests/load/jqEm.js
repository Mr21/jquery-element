jQuery.element({
	name: "myElement",
	html: "<s>ok</s>",
	css: ".myElement s { text-decoration: none; }",
	init: function() {
        this.jqElement.addClass( "myElement" );
	},
	prototype: {
		test: function() { return true; }
	}
});
