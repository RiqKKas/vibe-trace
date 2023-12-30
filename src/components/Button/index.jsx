import { ButtonContainer } from './styles';
import { inputFile } from '../../utils/main';

export const Button = ({
	variantType='box',
	title,
}) => {
	return (
		<ButtonContainer
			title={title}
			variantType={variantType}
			onClick={inputFile}
		>
			{title}
		</ButtonContainer>
	);
};
