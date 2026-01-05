import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError } from '../../../types/apiError';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css',
})
export class ServerError implements OnInit {
  private router = inject(Router);
  protected error: ApiError | undefined;
  protected detailsVisible = false;

  ngOnInit(): void {
    const navigation = history.state;
    this.error = navigation.error;
  }

  toggleDetails() {
    this.detailsVisible = !this.detailsVisible;
  }
}
