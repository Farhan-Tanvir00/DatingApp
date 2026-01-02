import { Component, inject, Input, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserRegister } from '../../../types/User';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  protected accountService = inject(AccountService);

  protected model = {} as UserRegister;
  isCancelled = output<boolean>();

  register() {
    this.accountService.register(this.model).subscribe({
      next: (val) => {
        console.log(val);
        this.cancel();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  cancel() {
    this.isCancelled.emit(false);
  }
}
