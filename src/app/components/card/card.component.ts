import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() title: string = "";
  @Input() value: string | null = "";
  @Input() type: string = "";
  @Input() icon: string = "";
  @Output() cardClick = new EventEmitter<string>();

  constructor() {}

  onCardClick() {
    console.log('Card clicado! Tipo: ', this.type);
    this.cardClick.emit(this.type);
  }
}
