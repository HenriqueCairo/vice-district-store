import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
})
export class ProductGridComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = false;
  activeCategory = 'Todos';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  get categories(): string[] {
    const set = new Set(this.products.map((p) => p.category));
    return ['Todos', ...Array.from(set)];
  }

  get filtered(): Product[] {
    if (this.activeCategory === 'Todos') return this.products;
    return this.products.filter((p) => p.category === this.activeCategory);
  }

  setCategory(cat: string): void {
    this.activeCategory = cat;
  }

  trackById(_index: number, product: Product): string {
    return product.id;
  }
}
