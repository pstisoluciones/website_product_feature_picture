# -*- coding: utf-8 -*-
import odoo.addons.website_sale.controllers.main
from odoo import http
from odoo.http import request

class thumbandbig(odoo.addons.website_sale.controllers.main.WebsiteSale):

    @http.route(['/get_image'], type='json', auth="public", website=True)
    def get_image(self,id,type,lang):
        cr, uid, context, pool = request.cr, request.uid, request.context, request.registry

        product_context = dict(request.env.context)
        product_context.update({"lang":lang})
        product = http.request.env['product.product'].with_context(product_context).browse([int(id)])
        template = http.request.env['product.template'].with_context(product_context).browse([product.product_tmpl_id.id])

        if type=="big":
                html = request.env['ir.ui.view'].render_template('website_product_feature_picture.product_big',{"product": product})

        if type=="thumb":
                html = request.env['ir.ui.view'].render_template('website_product_feature_picture.product_thumb',{"product": product})

        if type=="logo":
            if len(product.logo_ids)>0:
                html = request.env['ir.ui.view'].render_template('website_product_feature_picture.product_logo',{"product":product})
            else:
                html = request.env['ir.ui.view'].render_template('website_product_feature_picture.product_logo',{"product":template})
        return html















