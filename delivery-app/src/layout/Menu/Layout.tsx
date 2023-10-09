import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';

export function Layout() {
	return (
		<div className={styles['layout']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<img
						src="/avatar.png"
						className={styles['avatar']}
						alt="аватар пользователя"
					/>
					<div className={styles['name']}>Алекс</div>
					<div className={styles['email']}>a@ya.ru</div>
				</div>
				<div className={styles['menu']}>
					<NavLink
						to="/"
						className={({ isActive }) =>
							cn(styles['link'], {
								[styles.active]: isActive
							})
						}
					>
						<img src="/menu-icon.svg" alt="" />
						Меню
					</NavLink>
					<NavLink
						to="/cart"
						className={({ isActive }) =>
							cn(styles['link'], {
								[styles.active]: isActive
							})
						}
					>
						<img src="/cart-icon.svg" alt="" />
						Корзина
					</NavLink>
				</div>
				<Button appearance="small" className={styles['exit']}>
					<img src="/exit-item.svg" alt="" />
					Выйти
				</Button>
			</div>
			<div className={styles['content']}>
				<Outlet />
			</div>
		</div>
	);
}
