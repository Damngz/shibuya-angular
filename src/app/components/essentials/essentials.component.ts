import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { GamesListComponent } from '../games-list/games-list.component';

/**
 * @description
 * 
 * Componente de la página principal. Muestra los juegos esenciales
 */
@Component({
  selector: 'app-essentials',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent, GamesListComponent, FooterComponent],
  templateUrl: './essentials.component.html',
  styleUrl: './essentials.component.css'
})
export class EssentialsComponent {}
