const svgWidth = 600, // probably hardcode and use flexbox rather than bootstrap
    svgHeight = 560,
    margin = { top: 30, right: 30, bottom: 60, left: 60 },
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

let svgScatter = d3.select("#scatterplot-container").append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let svgBarRoot = d3.select("#bar-container").append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight),
    svgBar = svgBarRoot.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
    svgBarOverlay = svgBarRoot.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let brush = d3.brush()
    .on("start brush", brushFxn)
    .on("end", updateBars);

let scatterData = [],
    filteredBarData = [],
    points,
    xScaleScatter,
    yScaleScatter,
    xScaleBar,
    yScaleBar;

d3.csv("cars.csv")
    .then(function (data) {
        console.log(data);

        // cast strings as numbers
        scatterData = deepCopy(data);
        for (let i = 0; i < scatterData.length; i++) {
            scatterData[i].hp = +scatterData[i].hp;
            scatterData[i].mpg = +scatterData[i].mpg;
        }

        // reformat data
        let barData = getBarData(scatterData);
        
        // scatterplot:
        // create scales
        xScaleScatter = d3.scaleLinear()
            .domain(d3.extent(scatterData, (d) => d.hp))
            .range([0, width]), 
        yScaleScatter = d3.scaleLinear()
            .domain(d3.extent(scatterData, (d) => d.mpg))
            .range([height, 0]);

        // create our axes
        let xAxisScatter = svgScatter.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xScaleScatter));
        let yAxisScatter = svgScatter.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(yScaleScatter));

        // label our axes
        xAxisScatter.append("text")
            .attr("class", "label")
            .attr("transform", `translate(${width / 2}, 40)`)
            .text("Horsepower")
        yAxisScatter.append("text")
            .attr("class", "label")
            .attr("transform", `translate(-40, ${2 * height / 5}) rotate(-90)`)
            .text("Miles per gallon")

        // plot data
        points = svgScatter.selectAll("circle")
            .data(scatterData)
            .join("circle")
            .attr("cx", (d) => xScaleScatter(d.hp))
            .attr("cy", (d) => yScaleScatter(d.mpg))
            .attr("r", 5)
            .attr("class", "non-brushed");

        // add brush
        svgScatter.append("g")
            .call(brush);


        // bar chart:
        // set up scales
        xScaleBar = d3.scaleBand()
            .domain(barData.map((d) => d.cyl))
            .range([0, width])
            .padding(0.1);
        yScaleBar = d3.scaleLinear()
            .domain([0, d3.max(barData, (d) => d.count)])
            .range([height, 0]);

        // add axes
        let xAxisBar = svgBar.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScaleBar));
        let yAxisBar = svgBar.append("g")
            .call(d3.axisLeft(yScaleBar));

        // label our axes
        xAxisBar.append("text")
            .attr("class", "label")
            .attr("transform", `translate(${width / 2}, 40)`)
            .text("Cylinders")
        yAxisBar.append("text")
            .attr("class", "label")
            .attr("transform", `translate(-40, ${2 * height / 5}) rotate(-90)`)
            .text("Number of records")

        // render bars
        // background bars
        svgBar.selectAll("rect")
            .data(barData)
            .join("rect")
            .attr("class", "non-brushed")
            .attr("x", (d) => xScaleBar(d.cyl))
            .attr("y", (d) => yScaleBar(d.count))
            .attr("width", xScaleBar.bandwidth())
            .attr("height", (d) => height - yScaleBar(d.count));

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

function brushFxn(event) {
    // console.log(event);

    // revert points to initial style
    points.attr("class", "non-brushed");

    let brushCoords;
    if (event.selection != null) {
        let brushCoordsD3 = d3.brushSelection(this);
        brushCoords = {
            "x0": brushCoordsD3[0][0],
            "x1": brushCoordsD3[1][0],
            "y0": brushCoordsD3[0][1],
            "y1": brushCoordsD3[1][1]
        }

        // style brushed points
        points.filter(brushFilter)
            .attr("class", "brushed");
        
        // filter bar data
        let filteredScatterData = scatterData.filter(brushFilter);
        filteredBarData = getBarData(filteredScatterData);
        
        // render bars in real time
        updateBars();
    }

    function brushFilter(d) {
        // iterating over data bound to my points
        let cx = xScaleScatter(d.hp),
            cy = yScaleScatter(d.mpg);

        // get only points inside of brush
        return (brushCoords.x0 <= cx && brushCoords.x1 >= cx && brushCoords.y0 <= cy && brushCoords.y1 >= cy);
    }
}

// expects prefiltered data
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

function updateBars() {
    // foreground bars
    svgBarOverlay.selectAll("rect")
        .data(filteredBarData)
        .join("rect")
        .attr("class", "brushed")
        .attr("x", (d) => xScaleBar(d.cyl))
        .attr("y", (d) => yScaleBar(d.count))
        .attr("width", xScaleBar.bandwidth())
        .attr("height", (d) => height - yScaleBar(d.count));
}