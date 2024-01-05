import { ModalContainer, ModalWrap, ContentBox, ContentBoxHeader, CodeContainer } from './styles';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Info, X } from 'phosphor-react';
import { Button } from '../Button';
import { useState } from 'react';

export const Modal = ({ text }) => {
	const [displayModalContainer, setDisplayModalContainer] = useState(false);

	const handleDisplayModalContainer = () => {
		setDisplayModalContainer((prevState) => !prevState);
	};

	return (
		<ModalWrap>
			<Button
				variantType='icon'
				variantColor='gray-600'
				onClick={handleDisplayModalContainer}
				title='Exibir query'
			>
				<Info size={20} />
			</Button>

			<ModalContainer displayModal={displayModalContainer}>
				<ContentBox>
					<ContentBoxHeader>
						<h4>Sumário</h4>
						<Button
							variantType='icon'
							variantColor='black-f'
							onClick={handleDisplayModalContainer}
							title='Fechar'
						>
							<X size={26} />
						</Button>
					</ContentBoxHeader>

					<CodeContainer key={text}>
						<SyntaxHighlighter
							language="text"
							showLineNumbers={false}
							showInlineLineNumbers={false}
							lineProps={{ style: { flexWrap: 'wrap', } }}
						>
							{text}
						</SyntaxHighlighter>
					</CodeContainer>
				</ContentBox>
			</ModalContainer>
		</ModalWrap>
	);
};
