import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {
    this.createToastContainer();
  }
  private createToastContainer() {
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast toast-down toast-end z-50';
      document.body.appendChild(container);
    }
  }

  private createToastElement(message: string, alertclass: string, duration: number = 4000) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.classList.add(
      'alert',
      alertclass,
      'shadow-lg',
      'mb-4',
      'transition-all',
      'duration-300',
      'opacity-100',
      'translate-y-0'
    );
    toast.innerHTML = `<span>${message}</span>
    <button class="btn btn-sm btn-ghost ml-4">✖</button>`;

    const closeButton = toast.querySelector('button');
    closeButton?.addEventListener('click', () => {
      toastContainer.removeChild(toast);
    });

    toastContainer.appendChild(toast);
    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        // start fade-out
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'translate-y-2');

        // remove after transition
        setTimeout(() => {
          if (toastContainer.contains(toast)) {
            toastContainer.removeChild(toast);
          }
        }, 300); // must match duration-300
      }
    }, duration);
  }

  success(message: string, duration?: number) {
    this.createToastElement(message, 'alert-success', duration);
  }

  error(message: string, duration?: number) {
    this.createToastElement(message, 'alert-error', duration);
  }

  warning(message: string, duration?: number) {
    this.createToastElement(message, 'alert-warning', duration);
  }

  info(message: string, duration?: number) {
    this.createToastElement(message, 'alert-info', duration);
  }
}
