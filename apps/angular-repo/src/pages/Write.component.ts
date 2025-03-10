import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { userType } from 'types';
import { Router, RouterLink } from '@angular/router';

@Component({
	selector: 'write',
	imports: [FormsModule, RouterLink],
	template: `<main>
		<h1>Create Post</h1>
		<input class="title-input default-shadow" placeholder="Title" [(ngModel)]="titleRef" />
		<textarea
			class="content-input default-shadow"
			placeholder="Content"
			[(ngModel)]="contentRef"
		></textarea>
		<div class="button-container">
			<button (click)="submitHandler()">Submit</button>
			<a routerLink="..">Discard</a>
		</div>
	</main> `
})
export class WriteComponent {
	userData!: userType;
	titleRef = '';
	contentRef = '';

	constructor(private router: Router) {}

	submitHandler = async () => {
		if (!this.userData) return;
		if (!this.titleRef || !this.contentRef) return;

		const userID = this.userData.id;
		const title = this.titleRef;
		const content = this.contentRef;
		console.log(userID, title, content);

		if (/^\s*$/.test(title)) {
			alert('title is empty');
			return;
		}
		if (/^\s*$/.test(content)) {
			alert('content is empty');
			return;
		}

		const response = await fetch('/api/contents', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title, content, userID })
		});

		if (response.ok) {
			const result = await response.json();

			this.router.navigate([`/content/${result}`]);
		}
	};

	ngOnInit() {
		const userJson = sessionStorage.getItem('user');
		if (!userJson) return;
		const result = JSON.parse(userJson);
		this.userData = result;
	}
}
