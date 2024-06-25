import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderComponent } from '../header/header.component';
import { GamesListComponent } from '../games-list/games-list.component';
import { FooterComponent } from '../footer/footer.component';

/**
 * @description
 * 
 * Componente de la categoría Familiar
 */
@Component({
  selector: 'app-familiar',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent, GamesListComponent, FooterComponent],
  templateUrl: './familiar.component.html',
  styleUrl: './familiar.component.css'
})
export class FamiliarComponent {}
