import ProductCard from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './MenuList.props';

export function MenuList({ products }: MenuListProps): JSX.Element[] {
	return products.map((p) => (
		<ProductCard
			key={p.id}
			id={p.id}
			title={p.name}
			description={p.ingredients.join(',')}
			price={p.price}
			rating={p.rating}
			image={p.image}
		></ProductCard>
	));
}
