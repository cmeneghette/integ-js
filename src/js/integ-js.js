/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Crbm é um conjunto de ferramentas desenvolvido com o objetivo de facilitar a
 * implementação de aplicações em JavaScript radando no lado do navegador.
 * 
 * @module crbm
 * @method getContext
 * @method init
 * @method run
 */

(function() {

    this.Init = {
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
        up.Init.run();
    }, false);

}).apply(namespace('up'));

