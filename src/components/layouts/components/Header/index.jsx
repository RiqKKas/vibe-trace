import { HeaderContainer, HeaderLimiter } from './styles';
import { Button } from '../../../Button';
import { Link } from 'react-router-dom';

export const Header = () => {

	return (
		<HeaderContainer>
			<HeaderLimiter>
				<h2 title='Voltar ao início'>
					<Link to='/'>
            VibeTracer
					</Link>
				</h2>
				<nav>
					<Button
						title={'Upload de Arquivo .csv'}
					/>
				</nav>
			</HeaderLimiter>
		</HeaderContainer>
	);
};
