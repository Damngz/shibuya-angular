import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../../services/games.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-game',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent {
  gameForm: FormGroup;

  constructor(private fb: FormBuilder, private gameService: GameService, private router: Router) {
    this.gameForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      categoria: ['otros'],
      precio: [null, [Validators.required, Validators.min(1)]],
      oferta: ['N'],
      img: ['', Validators.required],
      esencial: ['N'],
      valoracion: 5,
      stock: 10
    });
  }

  addGame(): void {
    if (this.gameForm.valid) {
      const newGame = this.gameForm.value;
      this.gameService.addGame(newGame).subscribe(
        () => {
          alert('Juego agregado con éxito');
          this.router.navigate(['/juegos']);
        },
        (error: any) => {
          console.error('Error al agregar el juego:', error);
          alert('Error al agregar el juego. Por favor, inténtelo nuevamente.');
        }
      );
    } else {
      this.gameForm.markAllAsTouched();
    }
  }
}
