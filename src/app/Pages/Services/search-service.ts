import { Injectable } from '@angular/core';
import { SEARCH_DATA } from '../Model/search-data';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  search(text:string){
    const value = text.toLowerCase();
    return SEARCH_DATA.filter(item =>
      item.page.toLowerCase().includes(value)||
      item.description.toLowerCase().includes(value)
    );
  }
}
