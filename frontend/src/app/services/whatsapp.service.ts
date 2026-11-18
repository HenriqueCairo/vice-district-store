import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  /** Link genérico, usado no botão flutuante e no rodapé. */
  getGenericLink(message = 'Oi! Vim pela loja Vice District e queria saber mais.'): string {
    return this.buildLink(message);
  }

  /** Link já com o produto (e quantidade) preenchidos na mensagem. */
  getProductLink(product: Product, qty = 1): string {
    const message =
      `Oi! Quero comprar: ${product.name}` +
      (qty > 1 ? ` (${qty} unidades)` : '') +
      ` — vi na loja Vice District.`;
    return this.buildLink(message);
  }

  private buildLink(message: string): string {
    const text = encodeURIComponent(message);
    return `https://wa.me/${environment.whatsappNumber}?text=${text}`;
  }
}
