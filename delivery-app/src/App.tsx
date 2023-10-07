import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Form from './components/Form/Form';
import { Menu } from './pages/Menu/Menu';
import { Cart } from './pages/Cart/Cart';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Menu />
	},
	{
		path: '/cart',
		element: <Cart />
	}
]);

function App() {
	return (
		<>
			<Form></Form>
			<div>
				<a href="/">Меню</a>
				<a href="/cart">Корзина</a>
			</div>
			<RouterProvider router={router}></RouterProvider>
		</>
	);
}

export default App;
