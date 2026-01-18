import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';
import { themes } from '../theme';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLinkActive, RouterLinkWithHref],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  protected accountService = inject(AccountService);
  protected route = inject(Router);
  protected toast = inject(ToastService);
  protected selectedTheme = signal<string>(localStorage.getItem('theme') || 'light');
  protected themes = themes;

  protected model: any = {};

  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', this.selectedTheme());
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (data) => {
        console.log(data);
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

  handleThemeChange(theme: string) {
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const elm = document.activeElement as HTMLDivElement;
    if (elm) {
      elm.blur();
    }
  }
}
