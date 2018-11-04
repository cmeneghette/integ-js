/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function() {
    
    var ns = 'integJs';
    
    var global = this;

    if (typeof global[ns] === 'undefined') {
        global[ns] = {};
    }
    global[ns].global = global;
    
    global.namespace = function(namespace) {
        var array = namespace.split('.');
        var nsaux = global;
        for(var i = 0; i < array.length; i++) {
            if(typeof nsaux[array[i]] === 'undefined') {
                nsaux[array[i]] = {};
            }
            nsaux = nsaux[array[i]];
        }
        return nsaux;
    };
    
})();
