import { Await, Link, useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { Suspense } from 'react';
import Headling from '../../components/Headling/Headling';
import Button from '../../components/Button/Button';
import styles from './Product.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatcher } from '../../store/store';
import { cartAction } from '../../store/cart.slice';
export function ProductElem() {
	const dispatch = useDispatch<AppDispatcher>();
	const data = useLoaderData() as { data: Product };
	return (
		<>
			<Suspense fallback={'Загружаю'}>
				<Await resolve={data.data}>
					{({ data }: { data: Product }) => (
						<div className={styles['head__wrapper']}>
							<div className={styles['head']}>
								<Link to={'/'} className={styles['link']}>
									<img src="/back-icon.svg" alt="" />
								</Link>
								<Headling>{data.name}</Headling>
								<Button
									className={styles['add__product']}
									onClick={() => dispatch(cartAction.add(data.id))}
								>
									<img src="/add-to-cart.svg" alt="" />В корзину
								</Button>
							</div>
							<div className={styles['product__wrapper']}>
								<img
									src={data.image}
									alt=""
									className={styles['product__img']}
								/>
								<div className={styles['product__left']}>
									<div className={styles['product__text']}>
										Цена
										<div className={styles['price']}>
											{data.price}&nbsp;
											<span className={styles['curr']}>₽</span>
										</div>
									</div>
									<div className={styles['product__text']}>
										Рейтинг
										<div className={styles['rating']}>
											{data.rating}&nbsp;
											<img src="/rating.svg" alt="Иконка звезды" />
										</div>
									</div>
									<div className={styles['product__ingredients']}>
										Состав:
										<ul>
											{data.ingredients.map((ingredient, index) => (
												<li key={index}>{ingredient}</li>
											))}
										</ul>
									</div>
								</div>
							</div>
						</div>
					)}
				</Await>
			</Suspense>
		</>
	);
}

export default ProductElem;
