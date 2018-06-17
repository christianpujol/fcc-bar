/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

const w = 1100
const h = w * 9 / 16
const wPadding = w *0.1 
const hPadding = h *0.2 
const svg = d3.select("#fcc-bar")
  .append("svg")
  .attr("width",w)
  .attr("height",h)

svg.append('text')
  .attr('transform', 'rotate(-90)')
  .attr('x', - h/2)
  .attr('y', wPadding +20)
  .text("That's Gross")
svg.append('text')
  .attr('x', w / 2)
  .attr('y', h  - hPadding + 40)
  .text("That's your Date")
const tooltip = d3.select("#fcc-bar")
  .append("div")
  .attr("id", "tooltip")

// Get the Data
d3.json("data.json",
    (data) => {
      console.log(data.data)
      const rectWidth = (w - 2 * wPadding) / data.data.length
      const yMax = d3.max(data.data, d => d[1])
      const yMin = d3.min(data.data, d => d[1])
      const diff = yMax - yMin
      
      const years = data.data.map(d => parseInt(d[0].slice(0,4)))
      
      const xMin = d3.min(years)
      const xMax = d3.max(years)
      
      const yScale = d3.scaleLinear()
        .domain([0, yMax+ diff / 10])
        .range([ h - 2*  hPadding, 0])
  
      const xScale = d3.scaleLinear()
        .domain([xMin, xMax])
        .range([0.1 * w, 0.9* w])
                
      svg.selectAll("rect")
        .data(data.data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("data-date", d => d[0])
        .attr("data-gdp", d => d[1])
        .attr("height", d => h -2 * hPadding - yScale(d[1]))
        .attr("width", rectWidth )
        .attr("x", (d,i) => wPadding + rectWidth * i)
        .attr("y", d => yScale(d[1]) + hPadding)
        .attr("fill", "white")
        .on("mouseover", (d,i) => {
            tooltip.attr("data-date", d[0])
              .style("left", `${wPadding + rectWidth * i + 260}px`)
              .style("top", `${h*2/3}px`)
              .style("display", "inline-block")
              .html(`<br><strong>${d[0]}</strong><br>${d[1]}`)
            })
        .on("mouseleave",
            (d,i) => {
              tooltip.style("display", "none")
            }
           )
  
      const yAxis = d3.axisLeft().scale(yScale)
        
      const xAxis = d3.axisBottom()
        .scale(xScale)
        .tickFormat(d3.format("d"));
  
      svg.append("g")
        .attr("id", "y-axis")
        .attr("transform", "translate(" + wPadding + "," + hPadding +")")
        .call(yAxis)
      svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(0, ${h - hPadding})`)
        .call(xAxis)
  }
)
/*
const bottomAxis = d3.axisBottom()
const leftAxis = d3.axisLeft()
const scaleX = d3.scaleLinear()
const scaleY = d3.scaleLinear()

const xAxis = svg.append("g")
  .call(leftAxis)
  .attr("id","x-axis")
const yAxis = svg.append("g")
  .call(bottomAxis)
  .attr("id","y-axis")
  */
