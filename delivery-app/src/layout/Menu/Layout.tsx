import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatcher, RootState } from '../../store/store';
import { getProfile, userAction } from '../../store/user.slice';
import { useEffect } from 'react';

export function Layout() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatcher>();
	const logout = () => {
		dispatch(userAction.logout());
		navigate('auth/login');
	};
	const profile = useSelector((s: RootState) => s.user.profile);
	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);
	return (
		<div className={styles['layout']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<img
						src="/avatar.png"
						className={styles['avatar']}
						alt="аватар пользователя"
					/>
					<div className={styles['name']}>{profile?.name}</div>
					<div className={styles['email']}>{profile?.email}</div>
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
				<Button appearance="small" className={styles['exit']} onClick={logout}>
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
