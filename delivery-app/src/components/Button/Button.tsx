import styles from './Button.module.css';
import cn from 'classnames';
import { ButtonProps } from './Button.props';
function Button({
	children,
	className,
	appearance: appearance = 'small',
	...props
}: ButtonProps) {
	return (
		<button
			className={cn(styles.button, styles.accent, className, {
				[styles['small']]: appearance == 'small',
				[styles['big']]: appearance === 'big'
			})}
			{...props}
		>
			{children}
		</button>
	);
}

export default Button;
