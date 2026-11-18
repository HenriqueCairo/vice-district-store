import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @ViewChild('card', { static: true }) cardRef!: ElementRef<HTMLElement>;

  transform = 'none';

  get discountPercent(): number | null {
    if (!this.product.oldPrice || this.product.oldPrice <= this.product.price) return null;
    return Math.round(100 - (this.product.price / this.product.oldPrice) * 100);
  }

  get lowStock(): boolean {
    return !!this.product.stock && this.product.stock <= 3;
  }

  /** Inclinação 3D do card seguindo o mouse — responde ao gesto do usuário. */
  onMouseMove(event: MouseEvent): void {
    const el = this.cardRef.nativeElement;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const rotateY = x * 10;
    const rotateX = -y * 10;
    this.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
  }

  resetTransform(): void {
    this.transform = 'perspective(700px) rotateX(0) rotateY(0) scale3d(1,1,1)';
  }
}
