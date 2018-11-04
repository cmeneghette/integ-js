
/* global integJs */

/**
 * @module integJs-input
 * @namespace integJs.input
 */
(function() {
    
    /**
     *      
     * @example
     * 
     *      var element = integJs.input.Numeric({
     *          element: document.getElementById("elementId"),
     *          cssClass: "Classe estilo que será aplicada ao objeto",
     *          style: "Definições de estilo que serão aplicados ao objeto",
     *          min: "Menor valor válido",
     *          max: "Maior valor válido",
     *          error: {
     *              min: "Mensagem de erro para valor mínimo inválido",
     *              max: "Mensagem de erro para valor máximo inválido",
     *          },
     *          decinalSeparator: "Separador de casas decimais (. ou ,)", 
     *          negative: "true/false informa se o valor pode ser negativo",
     *          integer: "true/false informa se o valor para ser fracionado"
     *     });    
     *     
     * 
     * @class Numeric
     * @constructor
     * @param {Object} params
     * @return {Element}
     */
    this.Numeric = function(params) {
        var element;

        params = params || {};

        if (params && params.element) {
            element = params.element;
        }

        if (!element) {
            element = document.createElement("input");
            element.setAttribute("type", "text");            
        }
        
        element.style.textAlign = "right";
        if(params.step) {
            element.setAttribute("step", params.step);
        }

        if (params.cssClass) {
            element.setAttribute("class", params.cssClass);
        }
        integJs.Document.setStyle(element, params);

        for (var param in params) {
            element[param] = params[param];
        }

        element.error = params.error;
        if (element.error === undefined) {
            element.error = {};
        }
        if (element.error.min === undefined) {
            element.error.min = "Error, the value is less than the minimum";
        }
        if (element.error.max === undefined) {
            element.error.max = "Error, the value is greater than the maximum";
        }

        if (!element.decinalSeparator) {
            element.decimalSeparator 
                    = Number("1.2").toLocaleString().substr(1, 1);
        }

        element.enterPress = function() {
            return false;
        };

        element.addEventListener("blur", function(event) {
            if (element.value === "") {
                return true;
            }
            var value = new Number(element.value.replace(/\,/g, '.'));
            if (element.min) {
                element.min = new Number(element.min);
                if (value < element.min) {
                    alert("(" + value + "/" + element.min + ") " 
                            + element.error.min);
                }
            }
            if (element.max) {
                element.max = new Number(element.max);
                if (value > element.max) {
                    alert("(" + value + "/" + element.max + ") " 
                            + element.error.max);
                }
            }
            return true;
        }, false);

        element.addEventListener("keydown", function(event) {
            var key = integJs.getKey(event);
            if (integJs.isControlKey(event)) {
                if (key === 13) {
                    return element.enterPress();
                }
                return true;
            } else if (integJs.isNumericKey(event)) {
                return true;
            } else if (element.negative && integJs.isNegativeKey(event)) {
                return true;
            } else if (!element.integer && (integJs.isCommaKey(event) 
                    || integJs.isPointKey(event))) {
                if (element.decimalSeparator) {
                    if (element.decimalSeparator === '.' 
                            && integJs.isPointKey(event)) {
                        return true;
                    } else if (element.decimalSeparator === ',' 
                            && integJs.isCommaKey(event)) {
                        return true;
                    }
                } else {
                    return true;
                }
            }            
            event.preventDefault();
            return false;
        }, false);

        return element;
    };
    
}).apply(namespace('integJs.input'));