import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { GamesListComponent } from '../games-list/games-list.component';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent, GamesListComponent, FooterComponent],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent {}
