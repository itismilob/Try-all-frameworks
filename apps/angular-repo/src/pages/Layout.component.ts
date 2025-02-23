import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="framework-border angular-border">
      @if(isUser){
      <header>
        <a href="/angular">Angular home</a>
        <button (click)="logoutHandler()">Logout</button>
      </header>
      }
      <router-outlet></router-outlet>
      <div class="framework-title">
        Angular
        <img class="framework-icon" src="/public/angular.svg" />
      </div>
    </div>
  `,
})
export class LayoutComponent {
  constructor(private router: Router) {}

  isUser = true;
  loadCss() {
    const cssList = [
      'main.css',
      'framework.css',
      'list.css',
      'content.css',
      'write.css',
    ];
    cssList.forEach((css) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/styles/' + css;
      document.head.appendChild(link);
    });
  }

  logoutHandler = () => {
    sessionStorage.removeItem('user');
    window.location.href = '/';
  };

  ngOnInit() {
    this.loadCss();

    const userJson = sessionStorage.getItem('user');
    if (!userJson) {
      console.log('no user');
      this.isUser = false;
      this.router.navigate(['/angular/not-auth']);
      return;
    }

    const result = JSON.parse(userJson);
    console.log(result.framework);
    if (result.framework !== 'angular') {
      window.location.href = `/${result.framework}`;
      return;
    }
  }
}
