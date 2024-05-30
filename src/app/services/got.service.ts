import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICharacter, IHouse } from '../model/got.model';

@Injectable({
  providedIn: 'root',
})
export class GOTService {
  private url = 'https://www.anapioficeandfire.com/api';
  constructor(private httpClient: HttpClient) {}

  getHouses(pageNumber: number, pagSize: number): Observable<IHouse[]> {
    return this.httpClient.get<IHouse[]>(
      `${this.url}/houses?page=${pageNumber}&pageSize=${pagSize}`
    );
  }

  getCharacter(url: string): Observable<ICharacter> {
    return this.httpClient.get<ICharacter>(url);
  }
}
