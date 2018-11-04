/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/* global integJs */

/**
 * IntegJS é um conjunto de ferramentas desenvolvido com o objetivo de facilitar a
 * implementação de aplicações em JavaScript radando no lado do navegador.
 * 
 * @module integJs
 * @method getContext
 * @method init
 * @method run
 */

(function() {

    this.init = {
        initFunctions: [],
        add: function(initFunction) {
            if (typeof initFunction === 'function') {
                this.initFunctions.push(initFunction);
            }
        },
        run: function() {
            this.initFunctions = this.initFunctions.reverse();
            while (this.initFunctions.length > 0) {
                this.initFunctions.pop()();
            }
        }
    };

    window.addEventListener("load", function() {
        integJs.init.run();
    }, false);

}).apply(namespace('integJs'));

