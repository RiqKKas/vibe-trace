import * as d3 from 'd3';

// * Rules Disabled
/* eslint-disable indent */

// Array para armazenar o ranking calculado
let ranking = [];

export function inputFile() {
  const inputFile = document.createElement('input');
  inputFile.type = 'file';

  // Adiciona um ouvinte de evento para a mudança no arquivo selecionado
  inputFile.addEventListener('change', function () {
    const selectedFile = inputFile.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const fileContent = event.target.result;

      // Divide o conteúdo do arquivo em linhas e colunas
      const rows = fileContent.split('\n').map(row => row.split(','));

      // Extrai os cabeçalhos e o vetor de dados numéricos
      const headers = rows[0];
      const vector = rows.map(row => row.map(Number));

      // Calcula o ranking com base nos ouvintes e horas ouvidas
      ranking = calculateListenerAndListenHours(headers, vector);

      // Gera visualização usando o algoritmo K-Médias
      generateKMeans(vector, headers);

      // Exibe a interface principal e oculta o subtítulo
      document.getElementById('homeContainer').style.display = 'flex';
      document.getElementById('subTitleN2').style.display = 'none';
    };

    reader.readAsText(selectedFile);
  });

  inputFile.click();

  return ranking;
}

// Função para obter o ranking atual
export function getRanking() {
  return ranking;
}

// Função para calcular o ranking com base nos ouvintes e horas ouvidas
function calculateListenerAndListenHours(headers, vectors) {
  const columnTotals = new Array(vectors[0].length).fill(0);
  const columnGreaterThanZeroCounts = new Array(vectors[0].length).fill(0);

  vectors.forEach((vector) => {
    vector.forEach((value, columnIndex) => {
      if (value > 0) {
        columnTotals[columnIndex] += value;
        columnGreaterThanZeroCounts[columnIndex]++;
      }
    });
  });

  // Calcula o ranking com base nas contagens e totais
  let ranking = columnTotals.map((total, columnIndex) => {
    const greaterThanZeroCount = columnGreaterThanZeroCounts[columnIndex];
    const category = headers[columnIndex].split('_') || `Category ${columnIndex + 1}`;

    return {
      name: category[2],
      listeners: greaterThanZeroCount,
      hours: total,
    };
  });

  // Ordena o ranking com base nas horas ouvidas em ordem decrescente
  ranking = ranking.sort(function (a, b) {
    if (a.hours > b.hours) return -1;
    else return true;
  });

  return ranking;
}


function generateKMeans(vector, headers) {
  // Configuração do gráfico usando D3.js
  const margin = { top: 130, right: 80, bottom: 60, left: 80 };
  const viewBox = { x: 0, y: 35, w: 1200, h: 800 };
  const width = viewBox.w - margin.left - margin.right;
  const height = viewBox.h - margin.top - margin.bottom;
  const container = d3.select('#container');

  // Gera combinações únicas de pares de cabeçalhos
  const combinations = getCombinations(headers);

  // Itera sobre as combinações e cria gráficos para cada par
  combinations.forEach((combination, index) => {
    // Configuração do SVG para cada gráfico
    const svg = container
      .append('svg')
      .attr('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`)
      .attr('width', window.innerWidth - margin.left - margin.right)
      .attr('height', window.innerHeight - margin.top - margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('color', '#000')
      .attr('font-weight', 'bold')
      .attr('stroke-width', 2);

    // Adiciona um rótulo para a tabela
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -margin.top / 2)
      .attr('text-anchor', 'middle')
      .text(`Table ${index + 1}: ${combination[0]} & ${combination[1]}`)
      .style('font-size', '16px');

    // Configura escalas X e Y
    const x = d3.scaleLinear().domain([0, 50]).range([0, width]);
    const y = d3.scaleLinear().domain([0, 50]).range([height, 0]);

    // Configuração de cores
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Adiciona eixos X e Y
    svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));
    svg.append('g').call(d3.axisLeft(y));

    // Obtém índices dos cabeçalhos para o par atual
    const index1 = headers.indexOf(combination[0]);
    const index2 = headers.indexOf(combination[1]);

    // Mapeia pontos usando os dados
    const points = vector.map(point => ({ x: point[index1], y: point[index2], cluster: null }));

    // Gera centroides
    let centroids = generatePoints(vector[0].length).map(point => ({
      x: point.characteristics[0],
      y: point.characteristics[1],
      cluster: null,
    }));

    // Adiciona pontos no gráfico
    const pointsSvg = svg.append('g').attr('id', 'points-svg')
      .selectAll('dot').data(points).join('circle')
      .attr('cx', d => x(d.x))
      .attr('cy', d => y(d.y))
      .attr('r', 4)
      .style('fill', d => color(d.cluster));

    // Adiciona centroides no gráfico
    const centroidsSvg = svg.append('g').attr('id', 'centroids-svg')
      .selectAll('dot').data(centroids).join('circle')
      .attr('cx', d => x(d.x))
      .attr('cy', d => y(d.y))
      .attr('r', 5)
      .style('fill', '#e6e8ea')
      .attr('stroke', (d, i) => color(i))
      .attr('stroke-width', 2);

    // Função para atualizar os pontos conforme o cluster mais próximo
    const updatePoints = () => {
      points.forEach(point => {
        point.cluster = closestCentroid(point, centroids);
      });
      pointsSvg.transition().duration(500).style('fill', d => color(d.cluster));
    };

    // Função para atualizar os centroides com base nos pontos no cluster
    const updateCentroids = () => {
      const pointCounts = new Array(centroids.length).fill(0);

      centroids.forEach((centroid, i) => {
        const cluster = points.filter(point => point.cluster === i);
        pointCounts[i] = cluster.length;
        if (cluster.length > 0) {
          centroid.x = avg(cluster.map(point => point.x));
          centroid.y = avg(cluster.map(point => point.y));
        }
      });

      // Atualiza visualização dos centroides
      centroidsSvg.transition().duration(500).attr('cx', d => x(d.x)).attr('cy', d => y(d.y));

      // Determina os grupos e gera strings informativas
      const group1 = centroids[0].y > centroids[0].x;
      const group2 = centroids[1].y > centroids[1].x;

      let groupsStr1 = '';
      if (group1) {
        const groupMusical = combination[0].split('_');
        groupsStr1 += `No grupo LARANJA o ${groupMusical[2].toUpperCase()} é o mais ouvido com ${pointCounts[0]} ouvintes e média (centroid) de ${centroids[0].y.toFixed(2)} horas ouvidas!`;
      } else {
        const groupMusical = combination[1].split('_');
        groupsStr1 += `No grupo LARANJA o ${groupMusical[2].toUpperCase()} é o mais ouvido com ${pointCounts[1]} ouvintes e média (centroid) de ${centroids[0].x.toFixed(2)} horas ouvidas!`;
      }

      let groupsStr2 = '';
      if (group2) {
        const groupMusical = combination[0].split('_');
        groupsStr2 += `No grupo VERDE o ${groupMusical[2].toUpperCase()} é o mais ouvido com ${pointCounts[0]} ouvintese e média (centroid) de ${centroids[1].y.toFixed(2)} horas ouvidas!`;
      } else {
        const groupMusical = combination[1].split('_');
        groupsStr2 += `No grupo VERDE o ${groupMusical[2].toUpperCase()} é o mais ouvido com ${pointCounts[1]} ouvintes e e média (centroid) de ${centroids[1].x.toFixed(2)} horas ouvidas!`;
      }

      // Atualiza rótulos com informações dos grupos
      const conclusionLabel1 = svg.select('.conclusion-label-1');
      conclusionLabel1.transition().duration(500).attr('x', width / 2).attr('y', height + margin.bottom - 10).attr('text-anchor', 'middle').text(groupsStr1).style('font-size', '16px');

      const conclusionLabel2 = svg.select('.conclusion-label-2');
      conclusionLabel2.transition().duration(500).attr('x', width / 2).attr('y', height + margin.bottom + 10).attr('text-anchor', 'middle').text(groupsStr2).style('font-size', '16px');
    };

    // Atualiza os centroides e pontos em intervalos regulares
    setInterval(() => {
      updateCentroids();
      updatePoints();
    }, 1000);

    // Adiciona rótulos para conclusões
    svg.append('text').attr('class', 'conclusion-label-1').attr('x', width / 2).attr('y', height + margin.bottom - 10).attr('text-anchor', 'middle').text();
    svg.append('text').attr('class', 'conclusion-label-2').attr('x', width / 2).attr('y', height + margin.bottom - 10).attr('text-anchor', 'middle').text();
  });
}

// Função para obter combinações únicas de pares de elementos em uma matriz
function getCombinations(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      result.push([arr[i], arr[j]]);
    }
  }
  return result;
}

// Função para gerar um ponto de dados aleatório
function getRandomPoint(dimensions) {
  return {
    characteristics: Array.from({ length: dimensions }, () => Math.random() * 10),
    cluster: null
  };
}

// Função para gerar pontos de dados aleatórios
function generatePoints(dimensions) {
  return Array.from({ length: 2 }, () => getRandomPoint(dimensions));
}

// Função para calcular a média de uma matriz de números
function avg(arr) {
  return arr.reduce((p, c) => p + c, 0) / arr.length;
}

// Função para calcular a distância entre dois pontos
function distance(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

// Função para encontrar o índice do centróide mais próximo a um ponto
function closestCentroid(point, centroids) {
  const distances = centroids.map(centroid => distance(point, centroid));
  const i = distances.findIndex(d => d === Math.min(...distances));
  return i;
}
