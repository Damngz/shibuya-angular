import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and subtitle in HTML', () => {
    const title = 'Test Title';
    const subtitle = 'Test Subtitle';
    component.title = title;
    component.subtitle = subtitle;
    fixture.detectChanges();

    const titleElement: HTMLElement = fixture.nativeElement.querySelector('h1');
    const subtitleElement: HTMLElement = fixture.nativeElement.querySelector('p');

    expect(titleElement.textContent).toContain(title);
    expect(subtitleElement.textContent).toContain(subtitle);
  });

  it('should render default values when inputs are not provided', () => {
    fixture.detectChanges();

    const titleElement: HTMLElement = fixture.nativeElement.querySelector('h1');
    const subtitleElement: HTMLElement = fixture.nativeElement.querySelector('p');

    expect(titleElement.textContent).toBe('');
    expect(subtitleElement.textContent).toBe('');
  });
});
