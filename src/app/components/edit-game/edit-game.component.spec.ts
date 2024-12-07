import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EditGameComponent } from './edit-game.component';
import { GameService } from '../../services/games.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

class MockGameService {
  getGameById(id: number) {
    return of({
      id,
      nombre: 'Test Game',
      precio: 100,
      categoria: 'Action',
      img: 'test.jpg',
      oferta: false,
      esencial: true,
      stock: 10,
      valoracion: 4
    });
  }

  updateGame(game: any) {
    return of(game);
  }
}

describe('EditGameComponent', () => {
  let component: EditGameComponent;
  let fixture: ComponentFixture<EditGameComponent>;
  let mockGameService: MockGameService;
  let mockRouter: Router;

  beforeEach(() => {
    mockGameService = new MockGameService();

    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        EditGameComponent,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        { provide: GameService, useValue: mockGameService },
        FormBuilder
      ],
    });

    fixture = TestBed.createComponent(EditGameComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    spyOn(mockRouter, 'navigate');

    fixture.detectChanges();
  });

  it('should load game data and initialize the form', () => {
    expect(component.editForm).toBeTruthy();
    expect(component.editForm.get('nombre')?.value).toBe('Test Game');
    expect(component.editForm.get('precio')?.value).toBe(100);
  });

  it('should update the game and redirect to the game list', (done) => {
    component.updateGame();

    setTimeout(() => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/juegos']);
      done();
    }, 1000);
  });

  it('should not update the game if form is invalid', () => {
    component.editForm.controls['nombre'].setValue('');
    component.updateGame();

    expect(mockGameService.updateGame).not.toHaveBeenCalled();
  });
});
