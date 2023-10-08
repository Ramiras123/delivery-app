import styles from './Search.module.css';
import cn from 'classnames';
import { forwardRef } from 'react';
import { SearchProps } from './Search.props';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input(
	{ className, isValid = true, ...props },
	ref
) {
	return (
		<div className={styles['input-wrapper']}>
			<input
				{...props}
				ref={ref}
				className={cn(styles['input'], className, styles['input'], {
					[styles['invalid']]: !isValid
				})}
			/>
			<img src="/search.svg" alt="Иконка лупы" className={styles['icon']} />
		</div>
	);
});

export default Search;
