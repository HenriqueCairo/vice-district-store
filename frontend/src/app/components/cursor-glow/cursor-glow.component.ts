import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-cursor-glow',
  template: `<div #glow class="cursor-glow"></div>`,
  styles: [
    `
      .cursor-glow {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 30;
        opacity: 0;
        transition: opacity 0.3s ease;
        background: radial-gradient(
          340px circle at var(--mx, 50%) var(--my, 50%),
          rgba(232, 41, 156, 0.08),
          transparent 70%
        );
      }
    `,
  ],
})
export class CursorGlowComponent {
  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  @HostListener('document:mousemove', ['$event'])
  onMove(e: MouseEvent): void {
    const target = this.el.nativeElement.firstElementChild as HTMLElement | null;
    if (!target) return;
    this.renderer.setStyle(target, '--mx', `${e.clientX}px`);
    this.renderer.setStyle(target, '--my', `${e.clientY}px`);
    this.renderer.setStyle(target, 'opacity', '1');
  }

  @HostListener('document:mouseleave')
  onLeave(): void {
    const target = this.el.nativeElement.firstElementChild as HTMLElement | null;
    if (target) this.renderer.setStyle(target, 'opacity', '0');
  }
}
