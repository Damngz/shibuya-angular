import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OffersComponent } from './offers.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { GamesListComponent } from '../games-list/games-list.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

class ActivatedRouteStub {}

describe('OffersComponent', () => {
  let component: OffersComponent;
  let fixture: ComponentFixture<OffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OffersComponent,
        NavbarComponent,
        HeaderComponent,
        GamesListComponent,
        FooterComponent
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render NavbarComponent', () => {
    const navbarElement = fixture.debugElement.query(By.directive(NavbarComponent));
    expect(navbarElement).toBeTruthy();
  });

  it('should render HeaderComponent with correct title and subtitle', () => {
    const headerElement = fixture.debugElement.query(By.directive(HeaderComponent));
    expect(headerElement).toBeTruthy();
    const headerComponentInstance = headerElement.componentInstance as HeaderComponent;
    expect(headerComponentInstance.title).toBe('Ofertas');
    expect(headerComponentInstance.subtitle).toBe('¡Aprovecha de llevarte el juego que tanto deseas, hay oportunidades que no vuelven!');
  });

  it('should render GamesListComponent with correct category', () => {
    const gamesListElement = fixture.debugElement.query(By.directive(GamesListComponent));
    expect(gamesListElement).toBeTruthy();
    const gamesListComponentInstance = gamesListElement.componentInstance as GamesListComponent;
    expect(gamesListComponentInstance.category).toBe('ofertas');
  });

  it('should render FooterComponent', () => {
    const footerElement = fixture.debugElement.query(By.directive(FooterComponent));
    expect(footerElement).toBeTruthy();
  });
});
