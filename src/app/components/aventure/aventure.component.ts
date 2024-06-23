import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderComponent } from '../header/header.component';
import { GamesListComponent } from '../games-list/games-list.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-aventure',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent, GamesListComponent, FooterComponent],
  templateUrl: './aventure.component.html',
  styleUrl: './aventure.component.css'
})
export class AventureComponent {}
