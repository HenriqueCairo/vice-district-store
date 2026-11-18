import { Component } from '@angular/core';
import { WhatsappService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-whatsapp-float',
  templateUrl: './whatsapp-float.component.html',
  styleUrls: ['./whatsapp-float.component.scss'],
})
export class WhatsappFloatComponent {
  constructor(public whatsapp: WhatsappService) {}
}
