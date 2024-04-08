let movieURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json';

let movieData;

let canvas = d3.select('#canvas');
let tooltip = d3.select('#tooltip');

let drawTree = () => {
  const canvasWidth = 1400; 
  const canvasHeight = 1000; 

  canvas.attr('width', canvasWidth) 
    .attr('height', canvasHeight); 

  const rowCount = 10; 
  const columnCount = 10; 
  const rectWidth = canvasWidth / columnCount; 
  const rectHeight = canvasHeight / rowCount; 

  const maxTextWidth = rectWidth - 5;
  
  canvas.selectAll('rect')
    .data(movieData.children.flatMap(d => d.children)) 
    .enter()
    .append('rect')
    .attr('x', (d, i) => (i % columnCount) * rectWidth)
    .attr('y', (d, i) => Math.floor(i / columnCount) * rectHeight) 
    .attr('width', rectWidth - 1) 
    .attr('height', rectHeight - 1) 
    .attr('class', 'tile')
    .attr('data-name', d => d.name)
    .attr('data-category', d => d.category)
    .attr('data-value', d => d.value)
    .attr('fill', d => {
      switch (d.category) {
        case "Action":
          return 'red';
        case "Drama":
          return 'pink';
        case "Biography":
          return 'RoyalBlue';
        case "Adventure":
          return 'green';
        case "Animation":
          return 'orange';
        case "Comedy":
          return 'tomato';
        case "Family":
          return 'yellow';
        default:
          return 'white';
      }
    })
  
    .on('mouseover', function(event, d) {
      tooltip.transition()
        .style('visibility', 'visible')
        .attr('data-value', d.value)
      tooltip.text(`${d.name} - R$ ${d.value}`)
    })
    .on('mousemove', function(event) {
      tooltip.style('top', (event.pageY - 10) + 'px')
        .style('left', (event.pageX + 10) + 'px')
    })
    .on('mouseout', function() {
      tooltip.transition()
        .style('visibility', 'hidden')
    });

  canvas.selectAll('.tile-text')
    .data(movieData.children.flatMap(d => d.children))
    .enter()
    .append('text')
    .attr('class', 'tile-text')
    .attr('x', (d, i) => (i % columnCount) * rectWidth + 5) 
    .attr('y', (d, i) => Math.floor(i / columnCount) * rectHeight + 15) 
    .text(d => {
      if (d.name.length > maxTextWidth / 8) { 
        return d.name.substring(0, maxTextWidth / 8 - 3) + '...'; 
      } else {
        return d.name;
      }
    })
    .attr('fill', 'black'); 
};


d3.json(movieURL).then(
  (data, error) => {
    if (error) {
      console.log(error);
    } else {
      movieData = data;
      // console.log(movieData);
      drawTree();
    }
  }
);
