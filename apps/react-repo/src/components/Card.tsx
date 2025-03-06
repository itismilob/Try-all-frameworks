import { cardProperty } from 'types';
import { format } from 'date-fns';
import { useMemo } from 'react';
import '@styles/card.css';

export default function Card(props: cardProperty) {
	const item = useMemo(() => props.content || props.comment, [props]);

	return (
		<>
			{item && (
				<li className={`${item.framework}-shadow ${item.framework}-hover`}>
					<button
						onClick={() => {
							props.cardClickHandler?.(item.id);
						}}
					>
						<div className="contents-info">
							<div>
								<img src={item.profile} />
								<h4>{item.username}</h4>
							</div>
							<img src={`/public/${item.framework}.svg`} />
						</div>
						<div className="contents-date">
							{props.content && <h3>{props.content.title}</h3>}
							{props.comment && <h3>{props.comment.comment}</h3>}
							<h3 className="date">{format(item?.date, 'yyyy/MM/dd')}</h3>
						</div>
					</button>
				</li>
			)}
		</>
	);
}
