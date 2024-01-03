<h1 align="center"> Vibe Trace </h1>

<div align="center">
 <a href="#about">Sobre</a> |
 <a href="#technologies">Tecnologias</a> |
 <a href="#author">Autores</a>
</div>

<h2 id="about">💡&nbsp; Sobre o projeto</h2>
Vibe Tracer se trata de um sistema desenvolvido para identificar o perfil de usuários de um serviço de streaming de música. O objetivo é analisar os padrões de consumo musical dos usuários e agrupá-los em categorias distintas, facilitando decisões estratégicas sobre conteúdo e recomendações.

### Base de Dados

A base de dados usadas para testes é composta por informações de 200 usuários, incluindo o tempo (horas) de escuta em diferentes gêneros musicais. Os dados estão contidos em um arquivo .csv.

#### Gêneros Musicais

- Rock
- Samba
- Pop
- Rap

### Metodologia: Agrupamento pelo K-Médias

O projeto utiliza o método de Agrupamento pelo K-Médias para segmentar os usuários com base em suas preferências musicais.

### Etapas do Processo

1. **Leitura dos Dados:** Importação do arquivo .csv e tratamento dos dados para análise.
2. **Aplicação do K-Médias:** Utilização do algoritmo K-Médias para agrupar os usuários com base em suas preferências musicais.
3. **Determinação do Número de Clusters:** Uso de métodos para identificar o número ideal de clusters.
4. **Análise dos Clusters:** Avaliação dos grupos formados para entender as características e preferências de cada segmento.


### Principais Características

- **Upload de Arquivo:** Permitir que os usuários façam upload do arquivo .csv.
- **Análise de Dados:** Ao realizar o upload do arquivo, inicia-se o processo de clustering.
- **Visualização de Resultados:** Apresentação gráfica dos clusters e suas características.

---

<h2 id="technologies">🛠&nbsp; Tecnologias</h2>

Este projeto foi desenvolvido com as seguintes tecnologias:

✔️ [React](https://pt-br.legacy.reactjs.org/)
✔️ [Node](https://nodejs.org/en)
✔️ [D3JS](https://d3js.org/)

---

<h2 id="author">👨‍💻&nbsp; Autores</h2>
<a href="https://github.com/the-riquelme" target="_blank">
 <b>👤 Riquelme Damião Silva<b>
</a>
<br>
<a href="https://github.com/PalomaBarbara" target="_blank">
 <b>👤 Paloma Bárbara Pinto<b>
</a>
<br>
<a href="https://github.com/Gabrieljr42" target="_blank">
 <b>👤 João Gabriel Alves Junior<b>
</a>
