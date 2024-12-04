import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  currentUser = this.authService.getCurrentUser();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error("Error loading users:", err);
      }
    });
  }

  addUser(): void {
    this.router.navigate(['/add-user']);
  }

  editUser(userId: number | undefined): void {
    if (!userId) return;
    this.router.navigate([`/edit-user/${userId}`]);
  }

  deleteUser(userId: number | undefined): void {
    if (!userId) return;
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          alert("Usuario eliminado con éxito");
          this.loadUsers();
        },
        error: (err) => {
          console.error("Error al eliminar usuario:", err);
        }
      });
    }
  }
}
