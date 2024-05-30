import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { IHouse } from '../../model/got.model';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() houseInfo!: IHouse;
  @Output() showSideBar = new EventEmitter<IHouse>();

  openDetailsView(data: IHouse): void {
    this.showSideBar.emit(data);
  }
}
