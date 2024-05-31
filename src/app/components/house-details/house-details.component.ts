import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ICharacter, IHouse } from '../../models/got.model';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { GOTService } from '../../services/got.service';
import { lastValueFrom } from 'rxjs';
import { CharacterInfoComponent } from '../character-info/character-info.component';
@Component({
  selector: 'app-house-details',
  standalone: true,
  imports: [
    SidebarModule,
    CommonModule,
    ChipModule,
    DividerModule,
    CharacterInfoComponent,
  ],
  templateUrl: './house-details.component.html',
})
export class HouseDetailsComponent implements OnChanges {
  @Input() visibility!: boolean;
  @Input() data!: IHouse;
  @Output() onHide = new EventEmitter();
  currentLord!: ICharacter | undefined;
  heir!: ICharacter | undefined;
  founder!: ICharacter | undefined;
  charactersCache = new Map<string, ICharacter>();
  gotService = inject(GOTService);

  ngOnChanges(changes: SimpleChanges): void {
    const data = <IHouse>changes['data']?.currentValue;
    if (data) {
      this.clearCharacterInfo();
      if (data?.currentLord) this.getCurrentLord(data.currentLord);
      if (data?.founder) this.getFounder(data.founder);
      if (data?.heir) this.getHeir(data.heir);
    }
  }

  private clearCharacterInfo(): void {
    this.currentLord = undefined;
    this.founder = undefined;
    this.heir = undefined;
  }

  hideDetailsWindow(): void {
    this.onHide.emit();
  }

  private getCurrentLord(url: string): void {
    if (this.charactersCache.has(url)) {
      this.currentLord = this.charactersCache.get(url);
      return;
    }
    (async () => {
      const currentLord = await lastValueFrom(
        this.gotService.getCharacter(url)
      );
      this.charactersCache.set(url, currentLord);
      this.currentLord = currentLord;
    })();
  }

  private getHeir(url: string): void {
    if (this.charactersCache.has(url)) {
      this.heir = this.charactersCache.get(url);
      return;
    }
    (async () => {
      const heir = await lastValueFrom(this.gotService.getCharacter(url));
      this.charactersCache.set(url, heir);
      this.heir = heir;
    })();
  }

  private getFounder(url: string): void {
    if (this.charactersCache.has(url)) {
      this.founder = this.charactersCache.get(url);
      return;
    }
    (async () => {
      const founder = await lastValueFrom(this.gotService.getCharacter(url));
      this.charactersCache.set(url, founder);
      this.founder = founder;
    })();
  }
}
