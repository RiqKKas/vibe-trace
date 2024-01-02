import { HomeContainer, TeamsContainer, Team } from './styles';
import { ContentContainer } from '../components/ContentContainer';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';

export const Home = () => {

	const fillRanking = () => {
    // const raking =

			return (
				<Team key={nanoid()}>
					<div className="information">
						<h2>{Nome}</h2>

						<div className="stats">
							<ul>
								<li>Vitórias: <span>{V}</span></li>
								<li>Empates: <span>{E}</span></li>
								<li>Derrotas: <span>{J - V - E}</span></li>
								<li>Total de Gols: <span>{GP}</span></li>
							</ul>

							<ul className="cards">
								<li className="card">
									<img
										src={`${imagesPath}/yellow-card.svg`}
										alt="Cartão amarelo"
									/>
									<span> {CA}</span>
								</li>
								<li className="card">
									<img
										src={`${imagesPath}/red-card.svg`}
										alt="Cartão vermelho"
									/>
									<span> {CV}</span>
								</li>
							</ul>
						</div>
					</div>

					<div className="cast">
						<img
							src={Escudo || 'https://w7.pngwing.com/pngs/542/936/png-transparent-white-line-black-m-line.png'} alt={`Logo do ${Nome}`} />
						<Link to={`/times/${id}/${Nome.replace(' ', '_')}/jogadores`}>
							<p>Ver Elenco</p>
						</Link>
					</div>
				</Team>
			);
		});

		return classificationData;
	};

	return (
		<>
			<ContentContainer>
				<HomeContainer id="homeContainer">
					<TeamsContainer>
						<section className="teams-presentation">
							{fillRanking()}
						</section>
					</TeamsContainer>

					<div id="container"></div>
				</HomeContainer>
			</ContentContainer>
		</>
	);
};

