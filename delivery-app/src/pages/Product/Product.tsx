import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';

export function Product() {
	const { id } = useParams();
	return <>{id}</>;
}
