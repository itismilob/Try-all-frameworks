import { Component, Input } from '@angular/core';
import { contentType, commentType, cardProperty } from 'types';
import { getFormattedDate } from '../utils/utils';

@Component({
	selector: 'card',
	template: `@if (item) {
		<li class="{{ item.framework }}-shadow {{ item.framework }}-hover">
			<button (click)="props.cardClickHandler?.(item.id)">
				<div class="contents-info">
					<div>
						<img src="{{ item.profile }}" />
						<h4>{{ item.username }}</h4>
					</div>
					<img src="/public/{{ item.framework }}.svg" />
				</div>
				<div class="contents-date">
					@if (props.content) {
						<h3>{{ props.content.title }}</h3>
					}
					@if (props.comment) {
						<h3>{{ props.comment.comment }}</h3>
					}
					<h3 class="date">{{ getFormattedDate(item) }}</h3>
				</div>
			</button>
		</li>
	}`
})
export class CardComponent {
	@Input() props: cardProperty = {};
	item: commentType | contentType | undefined;

	cardClickHandler() {
		if (this.item) this.props.cardClickHandler?.(this.item.id);
	}
	getFormattedDate = getFormattedDate;

	ngOnInit() {
		if (this.props.content) this.item = this.props.content;
		else if (this.props.comment) this.item = this.props.comment;
	}
}
