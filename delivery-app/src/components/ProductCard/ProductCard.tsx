import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatcher } from '../../store/store';
import { cartAction } from '../../store/cart.slice';

function ProductCard(props: ProductCardProps) {
	const dispatch = useDispatch<AppDispatcher>();
	const add = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartAction.add(props.id));
	};
	return (
		<Link to={`/product/${props.id}`} className={styles['link']}>
			<div className={styles['card']}>
				<div
					className={styles['head']}
					style={{ backgroundImage: `url('${props.image}')` }}
				>
					<div className={styles['price']}>
						{props.price}&nbsp;<span className={styles['currency']}>₽</span>
					</div>
					<button className={styles['add-to-cart']} onClick={add}>
						<img src="/add-to-cart.svg" alt="" />
					</button>
					<div className={styles['rating']}>
						{props.rating}&nbsp;
						<img src="/rating.svg" alt="Иконка звезды" />
					</div>
				</div>
				<div className={styles['footer']}>
					<div className={styles['title']}>{props.title}</div>
					<div className={styles['description']}>{props.description}</div>
				</div>
			</div>
		</Link>
	);
}

export default ProductCard;
