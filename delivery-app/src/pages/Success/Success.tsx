import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Success.module.css';

export function Success() {
	const navigate = useNavigate();
	return (
		<div className={styles['success__wrapper']}>
			<img src="/success-image.png" alt="" />
			<div className={styles['success__text']}>Ваш заказ успешно оформлен!</div>
			<Button appearance="big" onClick={() => navigate('/')}>
				Сделать новый
			</Button>
		</div>
	);
}

export default Success;
