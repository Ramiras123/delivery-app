import styles from './CartItem.module.css';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatcher } from '../../store/store';
import { cartAction } from '../../store/cart.slice';
import { CartItemProps } from './CartItem.props';

function CartItem(props: CartItemProps) {
	const dispatch = useDispatch<AppDispatcher>();
	const add = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartAction.add(props.id));
	};
	const deleteItem = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartAction.deleteItem(props.id));
	};
	const removeCount = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartAction.deleteCount(props.id));
	};
	return (
		<div className={styles['card-item']}>
			<div
				className={styles['image-container']}
				style={{ backgroundImage: `url('${props.image}')` }}
			></div>
			<div className={styles['description']}>
				<div className={styles['name']}>{props.name}</div>
				<div className={styles['price']}>
					{props.price}&nbsp;<span className={styles['currency']}>₽</span>
				</div>
			</div>
			<div className={styles['actions']}>
				<button className={styles['remove-to-cart']} onClick={removeCount}>
					-
				</button>
				<span className={styles['number']}>{props.count}</span>
				<button className={styles['add-to-cart']} onClick={add}>
					+
				</button>
				<button className={styles['delete-to-cart']} onClick={deleteItem}>
					<img src="/delete-icon.svg" alt="" />
				</button>
			</div>
		</div>
	);
}

export default CartItem;
