import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Component } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el título y subtítulo pasados como @Input', () => {
    const title = 'Título de Prueba';
    const subtitle = 'Subtítulo de Prueba';

    component.title = title;
    component.subtitle = subtitle;
    fixture.detectChanges();

    const titleElement = compiled.querySelector('h1');
    const subtitleElement = compiled.querySelector('p');

    expect(titleElement?.textContent).toBe(title);
    expect(subtitleElement?.textContent).toBe(subtitle);
  });

  it('debería tener valores por defecto para title y subtitle', () => {
    fixture.detectChanges();

    const titleElement = compiled.querySelector('h1');
    const subtitleElement = compiled.querySelector('p');

    expect(titleElement?.textContent).toBe('');
    expect(subtitleElement?.textContent).toBe('');
  });
});
