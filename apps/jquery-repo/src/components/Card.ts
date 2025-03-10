import type { cardProperty } from 'types';
import $ from 'jquery';
import { format } from 'date-fns';

export default function Card(props: cardProperty) {
	const item = props.comment || props.content;

	if (item) {
		const component = `<button id="card-${item.id}">
	
	    <div class="contents-info">
	        <div>
	            <img src='${item.profile}' alt='user profile' />
	            <h4>${item.username}</h4>
	        </div>
	        <img src='/public/${item.framework}.svg' />
	    </div>
	    <div class="contents-date">
	        ${props.content ? `<h3>${props.content.title}</h3>` : ''}
	        ${props.comment ? `<h3>${props.comment.comment}</h3>` : ''}
	        <h3 class="date">${format(item?.date, 'yyyy/MM/dd')}</h3>
	    </div>
	</button>`;

		$(`#li-${item.id}`).html(component);
		$(`#card-${item.id}`).on('click', () => {
			props.cardClickHandler?.(item.id);
		});
	}
}
