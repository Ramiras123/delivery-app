import { Await, useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { Suspense } from 'react';
import Headling from '../../components/Headling/Headling';

export function ProductElem() {
	const data = useLoaderData() as { data: Product };
	return (
		<>
			<Suspense fallback={'Загружаю'}>
				<Await resolve={data.data}>
					{({ data }: { data: Product }) => (
						<>
							<Headling>{data.name}</Headling>
							<div>
								<img src={data.image} alt="" />
							</div>
							<div>
								Цена
								<div>{data.price}</div>
							</div>
							<div>
								Рейтинг
								<div>{data.rating}</div>
							</div>
							<div>
								Состав:
								<ul>
									{data.ingredients.map((ingredient) => (
										<li>{ingredient}</li>
									))}
								</ul>
							</div>
						</>
					)}
				</Await>
			</Suspense>
		</>
	);
}

export default ProductElem;
