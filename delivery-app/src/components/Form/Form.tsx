import Button from '../Button/Button';
import Input from '../Input/Input';
function Form() {
	return (
		<form>
			<label htmlFor="email">Ваш email</label>
			<Input type="email" id="email" placeholder="Email"></Input>
			<label htmlFor="password">Ваш Пароль</label>
			<Input type="password" id="password" placeholder="Пароль"></Input>
			<Button appearance="big">Вход</Button>
		</form>
	);
}

export default Form;
