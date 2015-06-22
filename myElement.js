$.element({
    name: "myElement",
    innerHTML: '\
        <div class="circle"></div>\
    ',
    css: '\
        .myElement,\
        .myElement .circle {\
            border-radius: 50%;\
            background: rgba(0,0,0,.5);\
            transition: all .5s;\
            }\
        .myElement {\
            display: inline-block;\
            margin: 0 10px 10px 0;\
            vertical-align: top;\
            padding: 10px;\
            cursor: pointer;\
            }\
            .myElement:active {\
                border-radius: 10%;\
                }\
            .myElement .circle {\
                width: 50px;\
                height: 50px;\
                background: rgba(255,255,255,.5);\
                border: 3px solid rgb(255,255,255);\
                box-sizing: border-box;\
                }\
                .myElement:active .circle {\
                    border-width: 10px;\
                    }\
    ',
    init: function() {
        var jqElement = this.jqElement;
        jqElement.mousedown( function() {
            jqElement.css("background", "rgb(" +
                ~~(Math.random() * 255) + ", " +
                ~~(Math.random() * 255) + ", " +
                ~~(Math.random() * 255) + ")"
            );
        });
    },
    prototype: {
        getColor: function() {
            return this.jqElement.css("background-color");
        }
    }
});
