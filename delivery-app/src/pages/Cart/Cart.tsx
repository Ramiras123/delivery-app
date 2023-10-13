import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import { useEffect, useState } from 'react';
import CartItem from '../../components/CartItem/CartItem';

function Cart() {
	const [products, setProducts] = useState<Product[]>([]);
	const items = useSelector((s: RootState) => s.cart.items);

	const searchById = async (id: number) => {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};
	const loadProducts = async () => {
		const res = await Promise.all(items.map((item) => searchById(item.id)));
		setProducts(res);
	};
	useEffect(() => {
		loadProducts();
	}, [items]);

	return (
		<>
			{items.map((i) => {
				const product = products.find((p) => p.id === i.id);
				if (!product) {
					return;
				}
				return <CartItem key={product.id} count={i.count} {...product} />;
			})}
		</>
	);
}

export default Cart;
