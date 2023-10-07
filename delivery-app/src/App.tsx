import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Form from './components/Form/Form';
import { Menu } from './pages/Menu/Menu';
import { Cart } from './pages/Cart/Cart';



function App() {
	return (
		<>
			<Form></Form>
			<div>
				<Link to="/">Меню</Link>
				<Link to="/cart">Корзина</Link>
			</div>
			<RouterProvider router={router}></RouterProvider>
		</>
	);
}

export default App;
