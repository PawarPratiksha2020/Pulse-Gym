import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../Services/theme-service';

@Component({
  selector: 'app-dashboardheader',
  imports: [NgIf],
  templateUrl: './dashboardheader.html',
  styleUrl: './dashboardheader.css',
})
export class Dashboardheader {
 showThemeMenu =false;
 constructor(private themeServices :ThemeService){}
 toggleThemeMenu(){
  this.showThemeMenu =! this.showThemeMenu
 }
 changeTheme(theme:string){
  this.themeServices.setTheme(theme);
  this.showThemeMenu = false
 }

}