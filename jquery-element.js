/*
    jquery-element - 1.0.0
    https://github.com/Mr21/jquery-element
*/

(function( $ ) {

var
    jqElementsType = {}
;

function initElement( obj, el ) {
    var
        that = {
            jqElement : $( el )
        }
    ;
    that = $.extend( that, obj.prototype );
    el.jqueryElementObject = that;
    el.innerHTML = obj.innerHTML;
    obj.init.call( that );
}

if ( MutationObserver = MutationObserver || WebKitMutationObserver ) {
    new MutationObserver( function( mutations ) {
        var i = 0, j, m, el, obj;
        for ( ; m = mutations[ i ]; ++i ) {
            for ( j = 0; el = m.addedNodes[ j ]; ++j ) {
                obj = el.nodeType === 1 && jqElementsType[ el.dataset[ "jqueryElement" ] ];
                if ( obj ) {
                    initElement( obj, el );
                }
            }
        }
    }).observe( document, {
        subtree: true,
        childList: true
    });
}

$.element = function( obj ) {
    var
        nl = document.querySelectorAll( "[data-jquery-element='" + obj.name + "']" ),
        i = 0
    ;
    jqElementsType[ obj.name ] = obj;
    if ( obj.css ) {
        obj.style = document.createElement( "style" );
        obj.style.innerHTML = obj.css;
        document.head.appendChild( obj.style );
    }
    for ( ; i < nl.length ; ++i ) {
        initElement( obj, nl[ i ] );
    }
};

$.fn.element = function( i ) {
    var len = this.length;
    if ( !i ) {
        i = 0;
    } else if ( ( i = i % len ) < 0 ) {
        i += len;
    }
    if ( this[ i ] ) {
        return this[ i ].jqueryElementObject;
    }
};

})( jQuery );
