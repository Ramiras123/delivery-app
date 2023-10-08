import { useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios from 'axios';

export function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setiIsLoading] = useState<boolean>(false);

	const getMenu = async () => {
		try {
			setiIsLoading(true);
			await new Promise<void>((resolve) =>
				setTimeout(() => {
					resolve();
				}, 2000)
			);
			const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
			setProducts(data);
			setiIsLoading(false);
		} catch (err) {
			console.error(err);
			setiIsLoading(false);
			return;
		}
	};
	useEffect(() => {
		getMenu();
	}, []);

	return (
		<>
			<div className={styles['head']}>
				<Headling>Меню</Headling>
				<Search placeholder="Введите блюдо или состав" />
			</div>
			<div>
				{!isLoading &&
					products.map((p) => (
						<ProductCard
							key={p.id}
							id={p.id}
							title={p.name}
							description={p.ingredients.join(',')}
							price={p.price}
							rating={p.rating}
							image={p.image}
						></ProductCard>
					))}
				{isLoading && <>Загружаю продукты</>}
			</div>
		</>
	);
}
