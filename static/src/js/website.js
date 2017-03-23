odoo.define('website_product_feature_picture.frontend', function (require) {
'use strict';

var ajax = require('web.ajax');
var core = require('web.core');
var base = require('web_editor.base');
var animation = require('web_editor.snippets.animation');
var qweb = core.qweb;


animation.registry.website_product_feature_picture = animation.Class.extend({

        selector: "input.js_product_change,input.js_variant_change, select.js_variant_change",

        start : function() {
            var self = this;
            $('.oe_website_sale').each(function () {
                $('.oe_website_sale').on('change', 'input.js_variant_change,input.js_product_change, select.js_variant_change', function (ev) {
                var $ul = $(this).parents('ul.js_add_cart_variants:first');
                var $parent = $ul.closest('.js_product');
                var $product_id = $parent.find('input.product_id').first();
                var variant_ids = $ul.data("attribute_value_ids");
                var values = [];
                $parent.find('input.js_variant_change:checked, select.js_variant_change').each(function () {
                    values.push(+$(this).val());
               });

            var product_id = false;
            for (var k in variant_ids) {
                if (_.isEmpty(_.difference(variant_ids[k][1], values))) {
                    product_id = variant_ids[k][0];
                    break;
                }
            }

            if (!product_id){
                 product_id=+$(this).val();
            }

            if (product_id) {
            var html = document.documentElement;
            var lang=html.getAttribute('lang').replace('-', '_');
                ajax.jsonRpc('/get_image','call', {"id":product_id,"type":"logo","lang":lang}).then(function(data) {
                    $("div[id='list-logo']").empty();
                    $(data).appendTo("div[id='list-logo']");
                });

                ajax.jsonRpc('/get_image','call', {"id":product_id,"type":"big","lang":lang}).then(function(data) {
                    $("div[id='list-big']").empty();
                    $(data).appendTo("div[id='list-big']");
                });

                ajax.jsonRpc('/get_image','call', {"id":product_id,"type":"thumb","lang":lang}).then(function(data) {
                    $("div[id='list-thumb']").empty();
                    $(data).appendTo("div[id='list-thumb']");
                });



            }
            });
        });
        },
    });
});

