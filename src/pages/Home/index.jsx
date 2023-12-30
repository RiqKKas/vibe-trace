import {  HomeContainer } from './styles';
import { ContentContainer } from '../components/ContentContainer';

export const Home = () => {
	return (
		<>
			<ContentContainer>
				<HomeContainer id="homeContainer">
					<div id="container"></div>
				</HomeContainer>
			</ContentContainer>
		</>
	);
};
