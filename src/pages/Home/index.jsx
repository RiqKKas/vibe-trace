import { HomeContainer, TeamsContainer, Team, FilterContainer, ContainerHeader } from './styles';
import { ContentContainer } from '../components/ContentContainer';
import { getRanking } from '../../utils/main';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Modal } from '../components/Modal';

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

	const text1 = `
## Ranking Resultante

  O ranking a seguir representa os resultados da análise de dados dos gêneros musicais utilizando o método 
  K-Médias, agrupando os usuários de dois em dois dos quatro grupos definidos. Essa abordagem permite 
  uma análise mais refinada das preferências musicais e revela padrões interessantes na base de dados.

#### Insights e Conclusões

- **Diversidade de Preferências:** A análise revela uma diversidade considerável nas preferências musicais 
dos usuários, refletindo a variedade de estilos disponíveis na plataforma de streaming.

- **Oportunidades de Recomendação:** Compreender as nuances das preferências permite à plataforma oferecer 
recomendações mais precisas, melhorando a experiência do usuário e incentivando a descoberta de novos
 artistas.

- **Segmentação Estratégica:** Os resultados destacam a importância de uma segmentação estratégica dos 
usuários para personalizar ofertas e conteúdo, aumentando o envolvimento e a satisfação.
  `;


	const text2 = `
  ## Análise dos Dados

  A fase de análise dos dados desempenha um papel crucial no entendimento das preferências musicais dos
  usuários dentro da plataforma Vibe Tracer. Utilizando o algoritmo K-Médias, o projeto agrupa os 
  usuários em dois clusters distintos, proporcionando insights valiosos sobre como diferentes segmentos 
  de ouvintes consomem música. Abaixo, detalhamos o processo de análise:
  
  ### Clusterização com K-Médias
  
  O algoritmo K-Médias é aplicado aos dados de consumo musical dos usuários, buscando agrupá-los de 
  acordo com padrões semelhantes de preferências. Esse processo envolve a iteração entre os clusters 
  até que centroides representativos sejam identificados. Esses centroides são essenciais para 
  compreender as médias de horas dedicadas a cada gênero musical em cada cluster.
  
  ### Dois Grupos Distintos
  
  A escolha de dois grupos distintos permite uma análise mais clara e comparativa das preferências 
  musicais. Cada cluster representa um grupo de usuários com gostos musicais similares, fornecendo 
  uma visão mais detalhada da diversidade de preferências na base de usuários.
  
  ### Interpretação das Médias dos Gêneros
  
  Ao analisar as médias de horas dedicadas, que é dado pelas posição dos centroids dos grupos, a 
  cada gênero musical em cada cluster, podemos identificar tendências e padrões sem a necessidade 
  de confrontar diretamente os grupos. As médias representam as preferências predominantes em cada 
  cluster, oferecendo uma visão equilibrada das escolhas musicais dos usuários.
  
  ### Total de Ouvintes por Cluster
  
  Além das médias, a contagem total de ouvintes em cada cluster fornece uma compreensão quantitativa 
  do tamanho de cada segmento. Essa informação é valiosa para estratégias futuras, personalização de 
  conteúdo e tomadas de decisão relacionadas à experiência do usuário.
  
  `;

	return (
		<>
			<ContentContainer>
				<HomeContainer id="homeContainer">
					<TeamsContainer>
						<FilterContainer>
							<div className="container-context">
								<ContainerHeader>
									<h1>Ranking de Gêneros Musicais</h1>

									<Modal text={text1} />
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

									<Modal text={text2} />
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

