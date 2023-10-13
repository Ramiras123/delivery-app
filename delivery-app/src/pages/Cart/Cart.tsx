import { useDispatch, useSelector } from 'react-redux';
import { AppDispatcher, RootState } from '../../store/store';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import { useEffect, useState } from 'react';
import CartItem from '../../components/CartItem/CartItem';
import Headling from '../../components/Headling/Headling';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartAction } from '../../store/cart.slice';

const DELIVERY_FEE = 169;

function Cart() {
	const [products, setProducts] = useState<Product[]>([]);
	const [fullPrice, setFullPrice] = useState<number>(0);
	const [countItems, setCountItems] = useState<number>(0);
	const navigate = useNavigate();
	const items = useSelector((s: RootState) => s.cart.items);
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const dispatch = useDispatch<AppDispatcher>();

	const getById = async (id: number) => {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};
	const loadProducts = async () => {
		const res = await Promise.all(items.map((item) => getById(item.id)));
		setProducts(res);
		setFullPrice(total(res));
		setCountItems(getTotalItems(res));
	};
	useEffect(() => {
		loadProducts();
	}, [items]);

	const getTotalItems = (res: Product[]) => {
		return items
			.map((item) => {
				const product = res.find((p) => p.id === item.id);
				if (!product) return 0;
				return item.count;
			})
			.reduce((sum, item) => (sum += item), 0);
	};
	const total = (res: Product[]) => {
		const resPrice = items
			.map((item) => {
				const product = res.find((p) => p.id === item.id);
				if (!product) return 0;
				return product.price * item.count;
			})
			.reduce((sum, item) => (sum += item), 0);
		console.log(resPrice);
		return resPrice;
	};

	const checkOut = async () => {
		await axios.post(
			`${PREFIX}/order`,
			{
				products: items
			},
			{
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			}
		);
		dispatch(cartAction.clearItems());
		navigate('/success');
	};
	return (
		<div className={styles['cart__wrapper']}>
			<Headling>Корзина</Headling>
			<div className={styles['list_item']}>
				{items.map((i) => {
					const product = products.find((p) => p.id === i.id);
					if (!product) {
						return;
					}
					return <CartItem key={product.id} count={i.count} {...product} />;
				})}
			</div>
			{fullPrice > 0 && (
				<div className={styles['total_wrapper']}>
					<div className={styles['total']}>
						<span>Итог</span>{' '}
						<span>
							{fullPrice}&nbsp;<span className={styles['curr']}>₽</span>
						</span>
					</div>
					<hr className={styles['hr']} />
					<div className={styles['total']}>
						<span>Доставка</span>
						<span>
							{DELIVERY_FEE}&nbsp;<span className={styles['curr']}>₽</span>
						</span>
					</div>
					<hr className={styles['hr']} />
					<div className={styles['total']}>
						<span>
							Итог <span className={styles['curr']}>({countItems})</span>
						</span>
						<span>
							{fullPrice + DELIVERY_FEE}&nbsp;
							<span className={styles['curr']}>₽</span>
						</span>
					</div>
					<Button appearance="big" onClick={checkOut}>
						Оформить
					</Button>
				</div>
			)}
			{fullPrice === 0 && <div>Еще нет товаров</div>}
		</div>
	);
}

export default Cart;
