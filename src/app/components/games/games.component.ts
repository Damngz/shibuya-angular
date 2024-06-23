import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { GamesListComponent } from '../games-list/games-list.component';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent, GamesListComponent, FooterComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {

}
