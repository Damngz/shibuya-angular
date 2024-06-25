import { Component, Input } from '@angular/core';

/**
 * @description
 * 
 * Componente del header que se muestra en todas las páginas con juegos
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
