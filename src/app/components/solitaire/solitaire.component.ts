import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderComponent } from '../header/header.component';
import { GamesListComponent } from '../games-list/games-list.component';
import { FooterComponent } from '../footer/footer.component';

/**
 * @description
 * 
 * Componente de la categoria Solitario
 */
@Component({
  selector: 'app-solitaire',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent, GamesListComponent, FooterComponent],
  templateUrl: './solitaire.component.html',
  styleUrl: './solitaire.component.css'
})
export class SolitaireComponent {}
