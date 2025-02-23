import { Component } from '@angular/core';

@Component({
  selector: 'not-auth',
  template: `
    <h1>Please Login</h1>
    <a href="/">Go back</a>
  `,
})
export class NotAuthComponent {}
