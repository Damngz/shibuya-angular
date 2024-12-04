import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GameService } from '../../services/games.service';
import { Game } from '../../models/game.model';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-edit-game',
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, FooterComponent, HeaderComponent],
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css'],
  standalone: true
})
export class EditGameComponent implements OnInit {
  editForm!: FormGroup;
  gameId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.gameId = +this.route.snapshot.paramMap.get('id')!;
    this.gameService.getGameById(this.gameId).subscribe(game => {
      this.editForm = this.fb.group({
        nombre: [game.nombre, Validators.required],
        precio: [game.precio, [Validators.required, Validators.min(0)]],
        categoria: [game.categoria, Validators.required],
        img: [game.img, Validators.required],
        oferta: [game.oferta],
        esencial: [game.esencial],
        stock: [game.stock, Validators.required],
        valoracion: [game.valoracion, Validators.required]
      });
    });
  }

  updateGame(): void {
    if (this.editForm.invalid) {
      return;
    }

    const updatedGame: Game = { ...this.editForm.value, id: this.gameId };
    this.gameService.updateGame(updatedGame).subscribe(() => {
      alert('Juego actualizado con éxito');
      this.router.navigate(['/juegos']);
    });
  }
}
