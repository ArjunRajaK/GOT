import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CardModule } from 'primeng/card';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import {
  MAX_COUNT_OF_DATA,
  SKELETON_DIMENSION,
  TOTAL_HOUSES,
} from '../../constants/got-constant';
import { GOTService } from '../../services/got.service';
import { IHouse } from '../../model/got.model';
import { HouseDetailsComponent } from '../house-details/house-details.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardModule,
    PaginatorModule,
    SkeletonComponent,
    HouseDetailsComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  skeletonCount = new Array(MAX_COUNT_OF_DATA).fill(0);
  dataLoading = false;
  first: number = 0;
  rows: number = MAX_COUNT_OF_DATA;
  houseData: IHouse[] = [];
  houseCache = new Map<number, IHouse[]>();
  showSideBar = false;
  currentlySelectedHouse!: IHouse;
  skeletonDimension = SKELETON_DIMENSION;
  totalHouses = TOTAL_HOUSES;

  gotService = inject(GOTService);

  ngOnInit(): void {
    this.getHouseData();
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 0;
    const pageNumber = event.page ?? 0;
    this.getHouseData(pageNumber + 1);
  }

  private getHouseData(pageNumber: number = 1): void {
    if (this.houseCache.has(pageNumber)) {
      this.houseData = this.houseCache.get(pageNumber) ?? [];
      return;
    }
    this.dataLoading = true;
    this.gotService.getHouses(pageNumber, MAX_COUNT_OF_DATA).subscribe({
      next: (houses: IHouse[]) => {
        this.houseData = houses;
        this.dataLoading = false;
        this.houseCache.set(pageNumber, houses);
      },
      error: (err) => {
        this.dataLoading = false;
        console.error(err);
      },
    });
  }

  openSideBar(data: IHouse): void {
    this.currentlySelectedHouse = data;
    this.showSideBar = true;
  }

  handleSideBarHide(): void {
    this.showSideBar = false;
  }
}
