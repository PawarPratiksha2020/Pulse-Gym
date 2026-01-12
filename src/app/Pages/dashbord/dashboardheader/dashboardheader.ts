import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../Services/theme-service';
import { Router } from '@angular/router';
import { SearchService } from '../../Services/search-service';

@Component({
  selector: 'app-dashboardheader',
  imports: [NgIf,NgFor],
  templateUrl: './dashboardheader.html',
  styleUrl: './dashboardheader.css',
})
export class Dashboardheader {
 showThemeMenu =false;
 searchResults :any[] =[];
 constructor(private themeServices :ThemeService,
  private router:Router,
  private searchServices :SearchService
 ){}
 toggleThemeMenu(){
  this.showThemeMenu =! this.showThemeMenu
 }
 changeTheme(theme:string){
  this.themeServices.setTheme(theme);
  this.showThemeMenu = false
 }
 onSearch(value:string){
  console.log('Search Value:',value);
   if (!value.trim()) {
    this.searchResults = [];
    return;
  }

  this.searchResults = this.searchServices.search(value);
}

goToPage(route: string) {
  this.router.navigate([route]);
  this.searchResults = [];
 }

}