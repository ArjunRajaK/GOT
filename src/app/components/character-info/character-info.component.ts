import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { ICharacter } from '../../models/got.model';

@Component({
  selector: 'app-character-info',
  standalone: true,
  imports: [ChipModule, CommonModule],
  templateUrl: './character-info.component.html',
})
export class CharacterInfoComponent {
  @Input() character!: ICharacter;
}
