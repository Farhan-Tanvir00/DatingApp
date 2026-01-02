import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLinkActive, RouterLinkWithHref],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService);
  protected route = inject(Router);
  protected toast = inject(ToastService);

  protected model: any = {};

  login() {
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.route.navigateByUrl('/members');
        this.toast.success('Login successful');
        this.model = {};
      },
      error: (error) => {
        console.log(error);
        this.toast.error(error.error);
      },
      complete: () => {},
    });
  }

  logout() {
    this.accountService.logout();
    this.route.navigateByUrl('/');
  }
}
