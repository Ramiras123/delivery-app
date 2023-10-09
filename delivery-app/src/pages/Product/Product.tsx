import { useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';

function Product() {
	const data = useLoaderData() as Product;
	return <>{data.name}</>;
}

export default Product;
