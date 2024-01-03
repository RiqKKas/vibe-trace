import { HomeContainer, TeamsContainer, Team, FilterContainer, ContainerHeader } from './styles';
import { ContentContainer } from '../components/ContentContainer';
import { getRanking } from '../../utils/main';
import { nanoid } from 'nanoid';
import { useState } from 'react';

export const Home = () => {
	const [ranking, setRanking] = useState([]);

	setInterval(() => {
		setRanking(fillRanking());
	}, 100);

	const fillRanking = () => {
		let ranking = getRanking();
		let num = 0;

		ranking = ranking.map(({name, listeners, hours}) => {
			++num;
			return (
				<Team key={nanoid()}>
					<div className="information">
						<h2>Top {num} - {name.toUpperCase()}</h2>

						<div className="stats">
							<ul>
								<li>Ouvintes: <span>{listeners}</span></li>
								<li>Horas Ouvidas: <span>{hours}</span></li>
							</ul>
						</div>
					</div>

					<div className="cast">
						<img
							src={'images/music.png'} alt={`Logo do ${name}`} />
					</div>
				</Team>
			);
		});

		return ranking;
	};

	return (
		<>
			<ContentContainer>
				<HomeContainer id="homeContainer">
					<TeamsContainer>
						<FilterContainer>
							<div className="container-context">
								<ContainerHeader>
									<h1>Ranking de Gêneros Musicais</h1>
								</ContainerHeader>
							</div>

							<div className="container-league-logo">
								<img src="images/game.png" alt="Logo da liga" />
							</div>
						</FilterContainer>
  
						<section className="teams-presentation">
							{ranking}
						</section>
					</TeamsContainer>

					<TeamsContainer>
						<FilterContainer>
							<div className="container-context">
								<ContainerHeader>
									<h1>Análise de Dados</h1>
								</ContainerHeader>
							</div>

							<div className="container-league-logo">
								<img src="images/pngwing.png" alt="Logo da liga" />
							</div>
						</FilterContainer>
  
						<div id="container"></div>
					</TeamsContainer>
				</HomeContainer>

				<div id="subTitle">
					<h1 id="subTitleN2">Por Favor, Informe os Dados Para a Análise em um Arquivo .csv</h1>
				</div>

			</ContentContainer>
		</>
	);
};

