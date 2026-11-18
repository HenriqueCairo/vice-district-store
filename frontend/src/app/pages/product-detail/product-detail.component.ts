import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { WhatsappService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  loading = true;
  notFound = false;
  activeImage = 0;
  qty = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    public whatsapp: WhatsappService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.productService.getBySlug(slug).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notFound = true;
      },
    });
  }

  get discountPercent(): number | null {
    if (!this.product?.oldPrice || this.product.oldPrice <= this.product.price) return null;
    return Math.round(100 - (this.product.price / this.product.oldPrice) * 100);
  }

  setActiveImage(i: number): void {
    this.activeImage = i;
  }

  increment(): void {
    this.qty++;
  }

  decrement(): void {
    if (this.qty > 1) this.qty--;
  }

  get whatsappLink(): string {
    if (!this.product) return '#';
    return this.whatsapp.getProductLink(this.product, this.qty);
  }
}
