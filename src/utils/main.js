import * as d3 from 'd3';

// * Rules Disabled
/* eslint-disable indent */

export function inputFile() {
  const inputFile = document.createElement('input');
  inputFile.type = 'file';

  inputFile.addEventListener('change', function () {
    const selectedFile = inputFile.files[0];

    const reader = new FileReader();
    reader.onload = function (event) {
      const fileContent = event.target.result;
      const rows = fileContent.split('\n').map(row => row.split(','));

      const headers = rows[0];
      const vector = rows.map(row => row.map(Number));

      generateKMeans(vector, headers);
    };

    reader.readAsText(selectedFile);
  });

  inputFile.click();
}

function generateKMeans(vector, headers) {
  const margin = { top: 130, right: 80, bottom: 60, left: 80 };
  const viewBox = { x: 0, y: 35, w: 1000, h: 800 };
  const width = viewBox.w - margin.left - margin.right;
  const height = viewBox.h - margin.top - margin.bottom;
  const container = d3.select('#container');

  const combinations = getCombinations(headers);
  combinations.forEach((combination, index) => {
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

    // Add a label for the table
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -margin.top / 2)
        .attr('text-anchor', 'middle')
        .text(`Table ${index + 1}: ${combination[0]} & ${combination[1]}`)
        .style('font-size', '16px')
      ;

    const x = d3.scaleLinear()
      .domain([0, 50])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, 50])
      .range([height, 0]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));

    const index1 = headers.indexOf(combination[0]);
    const index2 = headers.indexOf(combination[1]);

    const points = vector.map(point => ({ x: point[index1], y: point[index2], cluster: null }));
    let centroids = generatePoints(headers.length - 1, vector[0].length).map(point => ({
      x: point.characteristics[0],
      y: point.characteristics[1],
      cluster: null,
    }));

    const pointsSvg = svg.append('g')
      .attr('id', 'points-svg')
      .selectAll('dot')
      .data(points)
      .join('circle')
      .attr('cx', d => x(d.x))
      .attr('cy', d => y(d.y))
      .attr('r', 4)
      .style('fill', d => color(d.cluster));

    const centroidsSvg = svg.append('g')
      .attr('id', 'centroids-svg')
      .selectAll('dot')
      .data(centroids)
      .join('circle')
      .attr('cx', d => x(d.x))
      .attr('cy', d => y(d.y))
      .attr('r', 5)
      .style('fill', '#e6e8ea')
      .attr('stroke', (d, i) => color(i))
      .attr('stroke-width', 2);

    const updatePoints = () => {
      points.forEach(point => {
        point.cluster = closestCentroid(point, centroids);
      });
      pointsSvg.transition()
        .duration(500)
        .style('fill', d => color(d.cluster));
    };

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
      centroidsSvg.transition()
        .duration(500)
        .attr('cx', d => x(d.x))
        .attr('cy', d => y(d.y));

      const group1 = centroids[0].y > centroids[0].x;
      const group2 = centroids[1].y > centroids[1].x;

      let groupsStr1 = '';
      if (group1) {
        const groupMusical = combination[0].split('_');
        groupsStr1 += `No grupo LARANJA o ${groupMusical[2].toUpperCase()} é o mais ouvido com ${pointCounts[0]} ouvintes!`;
      } else {
        const groupMusical = combination[1].split('_');
        groupsStr1 += `No grupo LARANJA o ${groupMusical[2].toUpperCase()} é o mais ouvido com ${pointCounts[1]} ouvintes!`;
      }

      let groupsStr2 = '';
      if (group2) {
        const groupMusical = combination[0].split('_');
        groupsStr2 += `No grupo VERDE o ${groupMusical[2].toUpperCase()} é o mais ouvido com ${pointCounts[0]} ouvintes!`;
      } else {
        const groupMusical = combination[1].split('_');
        groupsStr2 += `No grupo VERDE o ${groupMusical[2].toUpperCase()} é o mais ouvido com ${pointCounts[1]} ouvintes!`;
      }

      const conclusionLabel1 = svg.select('.conclusion-label-1');
      conclusionLabel1.transition()
        .duration(500)
        .attr('x', width / 2)
        .attr('y', height + margin.bottom - 10)
        .attr('text-anchor', 'middle')
        .text(groupsStr1)
        .style('font-size', '16px');

      const conclusionLabel2 = svg.select('.conclusion-label-2');
      conclusionLabel2.transition()
        .duration(500)
        .attr('x', width / 2)
        .attr('y', height + margin.bottom + 10)
        .attr('text-anchor', 'middle')
        .text(groupsStr2)
        .style('font-size', '16px');
    };

    svg.selectAll('#centroids-svg circle')
      .data(centroids)
      .transition()
      .duration(500)
      .attr('cx', d => x(d.x))
      .attr('cy', d => y(d.y));

    updateCentroids();
    updatePoints();
    setInterval(() => {
      updateCentroids();
      updatePoints();
    }, 1000);


    svg.append('text')
      .attr('class', 'conclusion-label-1')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10)
      .attr('text-anchor', 'middle')
      .text();

    svg.append('text')
      .attr('class', 'conclusion-label-2')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10)
      .attr('text-anchor', 'middle')
      .text();
  });

}

function getCombinations(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      result.push([arr[i], arr[j]]);
    }
  }
  return result;
}

function getRandomPoint(dimensions) {
  return {
    characteristics: Array.from({ length: dimensions }, () => Math.random() * 10),
    cluster: null
  };
}

function generatePoints(n, dimensions) {
  return Array.from({ length: 2 }, () => getRandomPoint(dimensions));
}

function avg(arr) {
  return arr.reduce((p, c) => p + c, 0) / arr.length;
}

function distance(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function closestCentroid(point, centroids) {
  const distances = centroids.map(centroid => distance(point, centroid));
  const i = distances.findIndex(d => d === Math.min(...distances));
  return i;
}
