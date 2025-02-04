import { Component, ViewEncapsulation } from '@angular/core';
import type { contentType, userType } from 'types';
import { format } from 'date-fns';
import { Router, RouterLink } from '@angular/router';
import { isValidArray } from '../utils/utils';
import { CardComponent } from './Card.component';

@Component({
  selector: 'list',
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink, CardComponent],
  template: `<main>
    <div class="user-container {{ userData?.framework }}-shadow">
      <div>
        <img [src]="userData?.profile" />
        <h1>{{ userData?.username }}</h1>
      </div>
    </div>
    <div class="contents-container default-shadow">
      <div class="contents-header">
        <h2>Contents</h2>
        <a routerLink="/write">
          <img src="/public/pen.svg" alt="pen|" />
          write
        </a>
      </div>
      <ol>
        @if(checkArrayValidity()){ @for(content of contents; track content.id){
        <card [props]="{content, cardClickHandler:listClickHandler}" />
        } }@else{
        <div>No contents</div>
        }
      </ol>
    </div>
  </main>`,
})
export class ListComponent {
  constructor(private router: Router) {}

  userData: userType | undefined;
  contents: contentType[] = [];

  checkArrayValidity(): boolean {
    return isValidArray(this.contents);
  }
  getFormattedDate(content: contentType): string {
    return format(content.date, 'yyyy/MM/dd');
  }

  fetchData = async () => {
    let response = await fetch('/api/contents', { method: 'get' });
    if (response.ok) {
      const result = await response.json();
      this.contents = result;
      console.log(result);
    }
  };

  ngOnInit() {
    console.log('mounted');
    const userJson = sessionStorage.getItem('user');
    if (!userJson) {
      return;
    }
    const result = JSON.parse(userJson);
    this.userData = result;

    this.fetchData();
  }

  listClickHandler = (id: string) => {
    this.router.navigate([`/content/${id}`]);
  };
}
