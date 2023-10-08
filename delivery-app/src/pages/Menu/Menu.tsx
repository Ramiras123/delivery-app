import { useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

export function Menu(): JSX.Element {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setiIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

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
			if (err instanceof AxiosError) {
				setError(err.message);
			}
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
				{error && <>{error}</>}
				{!isLoading && <MenuList products={products} />}
				{isLoading && <>Загружаю продукты</>}
			</div>
		</>
	);
}
