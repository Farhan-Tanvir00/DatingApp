import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private httpClient = inject(HttpClient);
  protected readonly title = signal('Dating App');
  protected members = signal<any>([]);

  ngOnInit(): void {
    this.httpClient.get('https://localhost:5001/api/members').subscribe({
      next: (res) => this.members.set(res),
      error: (err) => console.log(err),
      complete: () => console.log('Completed Fetching'),
    });
  }
}
