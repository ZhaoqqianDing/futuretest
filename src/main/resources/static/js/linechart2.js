function MultipleLine(data,{
    // what this function does
    x = ([x]) => x, // x is the data point we want to use as the x axis (year)
    // the data has four columns: year, transport_actual,transport_adjusted,transport_trend how to use them to 
    // create the chart
    y = ([y]) => y, // y is the data point we want to use as the y axis (vehicle_register)
    y2 = ([y2]) => y2, // y2 is the data point we want to use as the y axis (vehicle_register)
    y3 = ([y3]) => y3, // y3 is the data point we want to use as the y axis (vehicle_register)
    width,
    height = 300,
    marginTop,
    defined,
    marginBottom,
    marginLeft,
    marginRight,
    color,
    strokeWidth,
    strokeLinejoin,
    strokeLinecap,
    yFormat,
    xDomain,
    yDomain,
    title,
    title2,
    curve = d3.curveLinear,
    xType = d3.scaleTime,
    yType = d3.scaleLinear,
    xLabel = "",
    yLabel = "",
    yTickFormat = d3.format(""),
} = {}) {
    var parsetime = d3.timeParse("%Y")
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const Y3 = d3.map(data, y3);
    const O = d3.map(data, d => d);
    const I = d3.map(data, (_, i) => i);
    // Compute which data points are considered defined.
    if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
    const D = d3.map(data, defined);
    X_T = []
    X.forEach(function (d) {
        d = parsetime(d);
        X_T.push(d);
    });
    // Compute default domains.
    if (xDomain === undefined) xDomain = d3.extent(X_T);
    if (yDomain === undefined) yDomain = [d3.min(Y)-1, d3.max(Y)];
    // console.log(data);
    // define dimensions of the chart area
    // console.log(width, height);
    // create scales
    var xrange = [marginLeft, width - marginRight];
    const xScale = d3.scaleTime().domain(xDomain).range(xrange);
    const yScale = d3.scaleLinear().domain(yDomain).range([height - marginBottom, 0]);
    console.log(xScale(X_T[0]));
    // define axis
    const xAxis = d3.axisBottom(xScale).ticks(width / 60).tickSizeOuter(10);
    const yAxis = d3.axisLeft(yScale).ticks(height / 60.8275, yTickFormat);
    // console.log(xAxis, yAxis);
    // define line
    if (title === undefined) {
        // set tickformat as integer
        const formatDate = xScale.tickFormat(null, "%Y");
        const formatValue = yScale.tickFormat(100, yFormat);
        title = i => `Year: ${formatDate(X_T[i])}\ntransport_actual: ${formatValue(Y[i])}`;
        title2 = i => `Year: ${formatDate(X_T[i])}\ntransport_trend: ${formatValue(Y3[i])}`;
    } else {
        const O = d3.map(data, d => d);
        const T = title;
        title = i => T(O[i], i, data);
    }
    const line1 = d3.line()
        .defined(i => D[i])
        .curve(curve)
        .x(i => xScale(X_T[i]))
        .y(i => yScale(Y[i]));
    // console.log(line);
    // append svg element
    const line3 = d3.line()
        .defined(i => D[i])
        .curve(curve)
        .x(i => xScale(X_T[i]))
        .y(i => yScale(Y3[i]));
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .style("-webkit-tap-highlight-color", "transparent")
        .style("overflow", "visible")
        .on("pointerenter pointermove", pointermoved)
        .on("pointerleave", pointerleft)
        .on("touchstart", event => event.preventDefault());
    // console.log(400+'x'+300);
    // append group element
    const g = svg.append("g")
        .attr("transform", `translate(${marginLeft},${marginTop})`);
    // console.log(g);
    // create tooltip

    const tooltip = svg.append("g")
        .style("display", "none");
    
    function pointermoved(event) {
        // build a reciprocal ordinal scale
        // console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
        const i = d3.bisectCenter(X_T, xScale.invert(d3.pointer(event)[0]));
        // console.log(i);
        // console.log(xScaleR(d3.pointer(event)[0]));
        tooltip.style("display", null);
        tooltip.attr("transform", `translate(${xScale(X_T[i])},${yScale(Y[i])})`);

        const path = tooltip.selectAll("path")
        .data([,])
        .join("path")
            .attr("fill", "white")
            .attr("stroke", "black");   

        const text = tooltip.selectAll("text")
        .data([,])
        .join("text")
        .call(text => text
            .selectAll("tspan")
            .data(`${title(i)}`.split(/\n/))
            .join("tspan")
            .attr("x", 0)
            .attr("y", (_, i) => `${i * 1.1}em`)
            .attr("font-weight", (_, i) => i ? null : "bold")
            .text(d => d));

        const {x, y, width: w, height: h} = text.node().getBBox();
        text.attr("transform", `translate(${-w / 2},${15 - y})`);
        path.attr("d", `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
        svg.property("value", O[i]).dispatch("input", {bubbles: true});
    }
    function pointerleft() {
        tooltip.style("display", "none");
        svg.node().value = null;
        svg.dispatch("input", {bubbles: true});
    }
    // console.log(tooltip);    
    // create title
    
    // console.log(title);
    // create x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0,${height-marginBottom})`)
        .call(xAxis)
        .append("text")
        .attr("x", width/2)
        .attr("y", marginBottom)
        .attr("dy", "0.71em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .text("Year");
    // console.log(g);
    // create y-axis
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", - marginLeft * 2)
            .attr("y", - 30)
            .attr("fill", "currentColor")
            .attr("transform", "rotate(-90)")
            .attr("text-anchor", "end")
            .text("CO2 Emissions (Mt)"));
    // create line
    svg.append("path")
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-linejoin", strokeLinejoin)
        .attr("stroke-linecap", strokeLinecap)
        .attr("d", line1(I));
    svg.append("path")
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "#e06c75")
        .attr("stroke-width", strokeWidth)
        .attr("stroke-linejoin", strokeLinejoin)
        .attr("stroke-linecap", strokeLinecap)
        .attr("d", line3(I));
    // console.log(g);
    // create circles
    svg.selectAll(".circle")
        .data(data)
        .join("circle")
        .attr("cx", (d,i) => xScale(X_T[i]))
        .attr("cy", (d,i) => yScale(Y[i]))
        .attr("r", 3)
        .attr("fill", "#499894")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .on("mouseover", function(d, i) {
            // add some animation
            d3.select(this)
                .attr("r", 6);
            // add tooltip
            tooltip.style("display", "block")
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px")
                .style("font", "10px sans-serif")
                .style("background", "white")
                .style("padding", "5px")
                .html(`<strong>${x(d)}</strong>
                    <br>${yLabel}: ${yFormat(y(d))}`);
        })
        .on("mouseout", function(d, i) {
            d3.select(this).attr("r", 3);
            tooltip.style("display", "none");
        });
    
    svg.selectAll(".circle")
    .data(data)
    .join("circle")
    .attr("cx", (d,i) => xScale(X_T[i]))
    .attr("cy", (d,i) => yScale(Y3[i]))
    .attr("r", 3)
    .attr("fill", "#e06c75")
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .on("mouseover", function(d, i) {
        // add some animation
        d3.select(this)
            .attr("r", 6);
        // add tooltip
        tooltip.style("display", "block")
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + "px")
            .style("font", "10px sans-serif")
            .style("background", "white")
            .style("padding", "5px")
            .html(`<strong>${x(d)}</strong>
                <br>${yLabel}: ${yFormat(y(d))}`);
    })
    .on("mouseout", function(d, i) {
        d3.select(this).attr("r", 3);
        tooltip.style("display", "none");
    });
    var color_legend = d3.scaleOrdinal().domain(["transport_actual","transport_trend"]).range(["#499894","#e06c75"]);  // color for each line
    //append legends
    var legend = d3.select("svg")
    .selectAll('g.legend')
    .data(data)
    .join("g")
    .attr("class", "legend");

    legend.append("circle")
    .attr("cx", 1000)
    .attr('cy', (d, i) => i * 30 + 350)
    .attr("r", 6)
    .style("fill", d => color_legend(d.key))

    legend.append("text")
    .attr("x", 1020)
    .attr("y", (d, i) => i * 30 + 355)
    .text(d => d.key)

    // end the function
    return Object.assign(svg.node(), {value: null});
};
// load data
d3.csv("../data/co2_emission.csv").then(function(data) {
    console.log(data);
    // draw the chart
    chart2 = MultipleLine(data, {
        x: d => d.Year,
        y: d => d.transport_actual,
        y2: d => d.transport_adjusted,
        y3: d => d.transport_trend,
        width: 500,
        height: 300,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        color: "steelblue",
        strokeWidth: 2,
        strokeLinejoin: "round",
        strokeLinecap: "round",
        yFormat: d3.format(".2s"),
        xType: d3.scaleTime,
        yType: d3.scaleLinear,
        xLabel: "Year",
        yLabel: "Vehicle_register",
        yTickFormat: d3.format(""),
    });
    // console.log(chart2);
    // add the chart to the DOM
    d3.select("#chart2").append(() => chart2);
});
