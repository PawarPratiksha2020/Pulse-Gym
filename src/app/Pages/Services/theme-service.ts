import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  setTheme(theme:string){
    const html = document.documentElement;
    html.className= '';
    html.classList.add(theme);
    localStorage.setItem('theme',theme);
  }
  loadTheme(){
    const theme = localStorage.getItem('theme');
    if(theme){
       document.documentElement.classList.add(theme);
    }
  }
}
