import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './layout/Menu/Layout.tsx';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';

const Menu = lazy(() => import('./pages/Menu/Menu'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Product = lazy(() => import('./pages/Product/Product'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<>Загрузка...</>}>
						<Menu />
					</Suspense>
				)
			},
			{
				path: '/cart',
				element: (
					<Suspense fallback={<>Загрузка...</>}>
						<Cart />
					</Suspense>
				)
			},
			{
				path: '/product/:id',
				element: (
					<Suspense fallback={<>Загрузка...</>}>
						<Product />
					</Suspense>
				),
				errorElement: <>Ошибка</>,
				loader: async ({ params }) => {
					const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
					return data;
				}
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router}></RouterProvider>
	</React.StrictMode>
);
