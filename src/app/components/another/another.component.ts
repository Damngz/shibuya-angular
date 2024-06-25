import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderComponent } from '../header/header.component';
import { GamesListComponent } from '../games-list/games-list.component';
import { FooterComponent } from '../footer/footer.component';

/**
 * @description
 * 
 * Componente de la categoría Otros
 */
@Component({
  selector: 'app-another',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent, GamesListComponent, FooterComponent],
  templateUrl: './another.component.html',
  styleUrl: './another.component.css'
})
export class AnotherComponent {}
