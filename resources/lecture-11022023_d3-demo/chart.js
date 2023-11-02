const svgWidth = 600,
    svgHeight = 560,
    margin = { top: 30, right: 30, bottom: 60, left: 60 },
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

let scatterSvg = d3.select("#scatterplot-container").append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
let scatterContainer = scatterSvg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

let barSvg = d3.select("#bar-container").append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
let barContainer = barSvg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
let barOverlay = barSvg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

let brush = d3.brush()
    .on("start brush", handleBrush)
    .on("end", updateRender)

// variables with global scope:
// these are variables that get used across multiple function scopes below
let scatterData,
    filteredBarData,
    scatterPoints,
    scatterXScale, // the error I had to debug at the end of class was a typo here
    scatterYScale,
    barXScale,
    barYScale,
    brushCoords; // to debug, I also had to make sure this var was available in the scope of both the handleBrush and brushFilter functions

d3.csv("cars.csv")
    .then(function (data) {
        console.log(data);

        scatterData = data;

        let barData = getBarData(data);
        console.log(barData);

        // scatterplot scales
        scatterXScale = d3.scaleLinear()
            .domain(d3.extent(data, (d) => +d.hp))
            .range([0, width]);
        scatterYScale = d3.scaleLinear()
            .domain(d3.extent(data, (d) => +d.mpg))
            .range([height, 0]);

        // scatterplot axes
        let scatterXAxis = scatterSvg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(${margin.left}, ${margin.top + height})`)
            .call(d3.axisBottom(scatterXScale));
        let scatterYAxis = scatterSvg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(d3.axisLeft(scatterYScale));

        // scatterplot marks
        scatterPoints = scatterContainer.selectAll("circle")
            .data(data)
            .join("circle")
            .attr("class", "non-brushed")
            .attr("cx", (d) => scatterXScale(+d.hp))
            .attr("cy", (d) => scatterYScale(+d.mpg))
            .attr("r", 5);

        scatterContainer.append("g")
            .call(brush);

        // bar scales
        barXScale = d3.scaleBand()
            .domain(barData.map((d) => +d.cyl))
            .range([0, width])
            .padding(0.1);
        barYScale = d3.scaleLinear()
            .domain([0, d3.max(barData, (d) => d.count)])
            .range([height, 0]);

        // bar axes
        let barXAxis = barSvg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top + height})`)
            .call(d3.axisBottom(barXScale));
        let barYAxis = barSvg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(d3.axisLeft(barYScale));

        // bar marks
        barContainer.selectAll("rect")
            .data(barData)
            .join("rect")
            .attr("class", "non-brushed")
            .attr("x", (d) => barXScale(+d.cyl))
            .attr("y", (d) => barYScale(d.count))
            .attr("width", barXScale.bandwidth())
            .attr("height", (d) => height - barYScale(d.count));
    })
    .catch(function (err) {
        console.error(err);
    });

// helper functions
function deepCopy(inObject) {
    let outObject, value, key;
    if (typeof inObject !== "object" || inObject === null) {
        return inObject; // Return the value if inObject is not an object
    }
    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};
    for (key in inObject) {
        value = inObject[key];
        // Recursively (deep) copy for nested objects, including arrays
        outObject[key] = deepCopy(value);
    }
    return outObject;
}

function getBarData(filteredData) {
    let returnData = [];

    filteredData.forEach((obj) => {
        let uniqueCyl = returnData.reduce((prev, curr) => (prev && curr.cyl != obj.cyl), true);
        if (uniqueCyl) {
            returnData.push({
                "cyl": +obj.cyl,
                "count": 1
            });
        } else {
            let cylIdx = returnData.findIndex((elem) => elem.cyl == +obj.cyl);
            returnData[cylIdx].count++;
        }
    });
    returnData = returnData.sort((a, b) => a.cyl - b.cyl);
    // console.log(returnData);

    return returnData;
}

function handleBrush(event) {
    // console.log(event);

    // revert points to initial style
    scatterPoints.attr("class", "non-brushed");

    if (event.selection != null) {
        let brushCoordsD3 = d3.brushSelection(this);
        brushCoords = {
            "x0": brushCoordsD3[0][0],
            "x1": brushCoordsD3[1][0],
            "y0": brushCoordsD3[0][1],
            "y1": brushCoordsD3[1][1]
        }

        // style brushed points
        scatterPoints.filter(brushFilter)
            .attr("class", "brushed");
        
        // filter bar data
        let filteredScatterData = scatterData.filter(brushFilter);
        filteredBarData = getBarData(filteredScatterData);
        
        // render bars in real time
        updateRender();
    }
}

function brushFilter(d) {
    // iterating over data bound to my points
    let cx = scatterXScale(+d.hp),
        cy = scatterYScale(+d.mpg);

    // get only points inside of brush
    return (brushCoords.x0 <= cx && brushCoords.x1 >= cx && brushCoords.y0 <= cy && brushCoords.y1 >= cy);
}

function updateRender() {
    // foreground bars
    barOverlay.selectAll("rect")
        .data(filteredBarData)
        .join("rect")
        .attr("class", "brushed")
        .attr("x", (d) => barXScale(+d.cyl))
        .attr("y", (d) => barYScale(d.count))
        .attr("width", barXScale.bandwidth())
        .attr("height", (d) => height - barYScale(d.count));
}