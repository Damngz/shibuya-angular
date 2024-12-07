import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddGameComponent } from './add-game.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GameService } from '../../services/games.service';
import { of, throwError } from 'rxjs';
import { Game } from '../../models/game.model';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminGuard } from '../../guards/admin.guard';

class MockGameService {
  addGame(game: Game) {
    return of({});
  }
}

class MockAuthService {
  getCurrentUser() {
    return of({ role: 'admin' });
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('AddGameComponent', () => {
  let component: AddGameComponent;
  let fixture: ComponentFixture<AddGameComponent>;
  let gameService: MockGameService;
  let router: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddGameComponent,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'add-game', component: AddGameComponent, canActivate: [AdminGuard] },
        ]),
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: GameService, useClass: MockGameService },
        { provide: AuthService, useClass: MockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const formValues = component.gameForm.value;
    expect(formValues.nombre).toBe('');
    expect(formValues.categoria).toBe('otros');
    expect(formValues.precio).toBeNull();
    expect(formValues.oferta).toBe('N');
    expect(formValues.img).toBe('');
    expect(formValues.esencial).toBe('N');
    expect(formValues.valoracion).toBe(5);
    expect(formValues.stock).toBe(10);
  });

  it('should mark all fields as touched if form is invalid', () => {
    component.addGame();
    Object.keys(component.gameForm.controls).forEach((key) => {
      expect(component.gameForm.controls[key].touched).toBeTrue();
    });
  });

  it('should call gameService.addGame and navigate on successful submission', () => {
    spyOn(gameService, 'addGame').and.callThrough();

    component.gameForm.setValue({
      nombre: 'Nuevo Juego',
      categoria: 'accion',
      precio: 50,
      oferta: 'N',
      img: 'url-imagen',
      esencial: 'N',
      valoracion: 4,
      stock: 20,
    });

    component.addGame();

    expect(gameService.addGame).toHaveBeenCalledWith(component.gameForm.value);
    expect(router.navigate).toHaveBeenCalledWith(['/juegos']);
  });

  it('should handle errors from gameService.addGame', () => {
    spyOn(gameService, 'addGame').and.returnValue(throwError(() => new Error('Error en el servicio')));

    component.gameForm.setValue({
      nombre: 'Nuevo Juego',
      categoria: 'accion',
      precio: 50,
      oferta: 'N',
      img: 'url-imagen',
      esencial: 'N',
      valoracion: 4,
      stock: 20,
    });

    spyOn(window, 'alert');

    component.addGame();

    expect(window.alert).toHaveBeenCalledWith('Error al agregar el juego. Por favor, inténtelo nuevamente.');
  });
});
