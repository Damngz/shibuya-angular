import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  currentUser: User = this.authService.getCurrentUser();
  editing: boolean = false;
  originalUser: User = this.authService.getCurrentUser();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
  }

  toggleEdit(): void {
    this.editing = !this.editing;
    if (!this.editing) {
      this.currentUser = { ...this.originalUser };
    }
  }

  saveChanges(): void {
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    this.editing = false;
    this.router.navigate(['/profile']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
