import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WhatsappFloatComponent } from './components/whatsapp-float/whatsapp-float.component';
import { ParticlesBgComponent } from './components/particles-bg/particles-bg.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';

import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { TrailerPlayerComponent } from './components/trailer-player/trailer-player.component';
import { CursorGlowComponent } from './components/cursor-glow/cursor-glow.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WhatsappFloatComponent,
    ParticlesBgComponent,
    ProductCardComponent,
    ProductGridComponent,
    HomeComponent,
    ProductDetailComponent,
    TrailerPlayerComponent,
    CursorGlowComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
