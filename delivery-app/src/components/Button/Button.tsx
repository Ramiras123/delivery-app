import styles from './Button.module.css';
import cn from 'classnames';
import { ButtonProps } from './Button.props';
function Button({
	children,
	className,
	appearence = 'small',
	...props
}: ButtonProps) {
	return (
		<button
			className={cn(styles.button, styles.accent, className, {
				[styles['small']]: appearence == 'small',
				[styles['big']]: appearence === 'big'
			})}
			{...props}
		>
			{children}
		</button>
	);
}

export default Button;
