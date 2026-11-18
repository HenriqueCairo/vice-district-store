
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-trailer-player',
  templateUrl: './trailer-player.component.html',
  styleUrls: ['./trailer-player.component.scss']
})
export class TrailerPlayerComponent {
  // Trailer 2 oficial de GTA VI
  videoId = 'VQRLujxTm3c';

  playing = false;
  safeUrl?: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  get thumbnailUrl(): string {
    return `https://img.youtube.com/vi/${this.videoId}/hqdefault.jpg`;
  }

  play(): void {
    const videoUrl =
      `https://www.youtube-nocookie.com/embed/${this.videoId}?autoplay=1&rel=0&playsinline=1`;

    this.safeUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);

    this.playing = true;
  }
}
