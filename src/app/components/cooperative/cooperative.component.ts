import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderComponent } from '../header/header.component';
import { GamesListComponent } from '../games-list/games-list.component';
import { FooterComponent } from '../footer/footer.component';

/**
 * @description
 * 
 * Componente de la categoría Cooperativo
 */
@Component({
  selector: 'app-cooperative',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent, GamesListComponent, FooterComponent],
  templateUrl: './cooperative.component.html',
  styleUrl: './cooperative.component.css'
})
export class CooperativeComponent {}
