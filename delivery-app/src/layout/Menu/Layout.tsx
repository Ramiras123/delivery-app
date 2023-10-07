import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';

export function Layout() {
	return (
		<div className={styles['layout']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<img src="avatar.png" className={styles['avatar']} alt="аватар пользователя" />
					<div className={styles['name']}>Алекс</div>
					<div className={styles['email']}>a@ya.ru</div>
				</div>
				<div className={styles['menu']}>
					<Link to="/" className={styles['link']}>
						<img src="/menu-icon.svg" alt="" />
						Меню
					</Link>
					<Link to="/cart" className={styles['link']}>
						<img src="/cart-icon.svg" alt="" />
						Корзина
					</Link>
				</div>
				<Button appearence="small" className={styles['exit']}>
					<img src="/exit-item.svg" alt="" />
					Выйти
				</Button>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}
