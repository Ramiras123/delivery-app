import { Route, Routes } from 'react-router-dom';
import Form from './components/Form/Form';
import { Menu } from './pages/Menu/Menu';
import { Cart } from './pages/Cart/Cart';

function App() {
	return (
		<>
			<Form></Form>
			<div>
				<a href="/">Меню</a>
				<a href="/cart">Корзина</a>
			</div>
			<Routes>
				<Route path="/" element={<Menu />} />
				<Route path="/cart" element={<Cart />} />
			</Routes>
		</>
	);
}

export default App;
