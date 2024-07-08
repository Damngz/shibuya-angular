import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { GamesListComponent } from "../games-list/games-list.component";

@Component({
  selector: 'app-modify-games',
  standalone: true,
  imports: [RouterLink, NavbarComponent, GamesListComponent, FooterComponent],
  templateUrl: './modify_games.component.html',
  styleUrl: './modify_games.component.css'
})
export class ModifyGamesComponent {}