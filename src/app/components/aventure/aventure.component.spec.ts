import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AventureComponent } from './aventure.component';
import { HeaderComponent } from '../header/header.component';
import { GamesListComponent } from '../games-list/games-list.component';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

class ActivatedRouteStub {}

describe('AventureComponent', () => {
  let component: AventureComponent;
  let fixture: ComponentFixture<AventureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        AventureComponent,
        HeaderComponent,
        GamesListComponent,
        FooterComponent,
        NavbarComponent
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AventureComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render NavbarComponent with activePage correctly', () => {
    const navbarComponent = fixture.debugElement.query(By.directive(NavbarComponent)).componentInstance;
    expect(navbarComponent.activePage).toBe('Categorias');
  });

  it('should render HeaderComponent with correct title and subtitle', () => {
    const headerComponent = fixture.debugElement.query(By.directive(HeaderComponent)).componentInstance;
    expect(headerComponent.title).toBe('Aventura');
    expect(headerComponent.subtitle).toBe('Embárcate en emocionantes misiones y descubre mundos épicos. ¡Encuentra tu próximo juego de aventuras y vive historias inolvidables!');
  });

  it('should render GamesListComponent with correct category', () => {
    const gamesListComponent = fixture.debugElement.query(By.directive(GamesListComponent)).componentInstance;
    expect(gamesListComponent.category).toBe('aventura');
  });

  it('should render FooterComponent', () => {
    const footerComponent = fixture.debugElement.query(By.directive(FooterComponent));
    expect(footerComponent).toBeTruthy();
  });
});
