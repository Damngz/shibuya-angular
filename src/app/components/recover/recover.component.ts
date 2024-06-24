import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recover',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.css'
})
export class RecoverComponent {
  email: string = '';
  emailSent: boolean = false;
  loading: boolean = false;

  constructor() {}

  sendRecoveryEmail(): void {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.emailSent = true;
    }, 2000)
  }
}
