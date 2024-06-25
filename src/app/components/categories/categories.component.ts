import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

/**
 * @description
 * 
 * Componente de la página de las categorias
 */
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink, NavbarComponent, HeaderComponent, FooterComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {}
