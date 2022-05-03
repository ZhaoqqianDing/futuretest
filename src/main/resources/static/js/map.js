
function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: -37.907803, lng: 145.133957 },
    });

    directionsRenderer.setMap(map);

    const onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
        calculateThePrompt();
    };
    const onChangeHandler2 = function () {
        calculateThePrompt();
    };

    //document.getElementById("start").addEventListener("change", onChangeHandler);
   // document.getElementById("end").addEventListener("change", onChangeHandler);
     document.getElementById("div_calculte").addEventListener("click", onChangeHandler);
   // document.getElementById("div_calculte").addEventListener("click", calculateThePrompt);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    directionsService
        .route({
            origin: {
                query: document.getElementById("start").value,
            },
            destination: {
                query: document.getElementById("end").value,
            },
            travelMode: google.maps.TravelMode.DRIVING,
        })
        .then((response) => {
            directionsRenderer.setDirections(response);
        })
        .catch((e) => window.alert("Directions request failed due to " + status));
}
function calculateThePrompt() {
    var origins = document.getElementById("start").value;
    var destinations = document.getElementById("end").value;
    var service = new google.maps.DistanceMatrixService();
    const request = {
        origins: [origins],
        destinations: [destinations],
        travelMode: google.maps.TravelMode.TRANSIT ,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
    };
    service.getDistanceMatrix(request).then((response) => {
        // put response
        // console.log(response);
      //  const type = document.getElementById("type").value;
        const distance = response.rows[0].elements[0].distance.value;
        const duration = response.rows[0].elements[0].duration.value;
      //  console.log("距离： "+distance+" dur: "+duration);
        $.ajax({
            type: "post",
            url: "/CalculatorController/test",
            async: false,

            data: {//type: type,
                    distance:distance
                   // duration:duration
            },
            success:function(result) {
                var transportation = result[0];
                const icons_set = new Map ([
                    ["plane", "<a href=\"https://www.flaticon.com/free-icons/flight\" title=\"Flight icons creat\
                                                            ed by Nuion - Flaticon\"><img src = \"../icon/flight.png\"></a>"],
                    ["light_rail_or_tram",`<a href="https://www.flaticon.com/free-icons/tram" title="Tram icons created by Freepik - Flaticon">
                                                <img src="../icon/tram.png">
                                            </a>`],
                    ["driving", `<a href="https://www.flaticon.com/free-icons/transportation" title="Transportation icons created by Freepik - Flaticon">
                                                <img src="../icon/car.png">
                                            </a>`],
                    ["Bus", `<a href="https://www.flaticon.com/free-icons/bus" title="Bus icons created by Freepik - Flaticon">
                                                <img src="../icon/bus.png">
                                            </a>`],
                    ["Walking",`<a href="https://www.flaticon.com/free-icons/walking" title="Walking icons created by Freepik - Flaticon">
                                                <img src="../icon/walking.png">
                                            </a>`],
                    ['Bicycle',`<a href="https://www.flaticon.com/free-icons/bicycle" title="Bike icons created by Freepik - Flaticon">
                                                <img src="../icon/bicycle.png">
                                            </a>
                                <a href="https://www.flaticon.com/free-icons/kick-scooter" title="Kick scooter icons created by Smashicons - Flaticon">
                                                <img src="../icon/escooter.png">
                                            </a>`],
                ]);
                console.log("result:",transportation);
                // add DOM into recommendation
                // 这个switch要处理很多事情-要call一个generate flip card的函数，这个函数可以根据条件生成对应的flip
                // card，然后添加到DOM中
                switch  (transportation) {
                    case "plane":
                        $("#recommendation").html(icons_set.get("plane"));
                        // generate_flip_card("plane");
                        break;
                    case "light_rail_or_tram":
                        $("#recommendation").html(icons_set.get("light_rail_or_tram"));
                        // generate_flip_card("light_rail_or_tram");
                        break;
                    case "driving":
                        $("#recommendation").html(icons_set.get("driving"));
                        // generate_flip_card("driving");
                        break;
                    case "Bus":
                        $(".recommendation").html(icons_set.get("Bus"));
                        // generate_flip_card("Bus");
                        break;
                    case "Walking":
                        $("#recommendation").html(icons_set.get("Walking"));
                        // generate_flip_card("Walking");
                        break;
                    case "Bicycle":
                        $("#recommendation").html(icons_set.get("Bicycle"));
                        // generate_flip_card("Bicycle");
                        break;
                    default:
                        $("#recommendation").html("No recommendation");
                }
                const regex1 = /(?<=: ).+?(?=;)/g;
                // create a prompt with img and text
                
                // generate prompt using jquery
                // retrieve require numbers from result
                var all_res = result[1].match(regex1);
                console.log("all_res:",all_res);
                const co2 = all_res[0];
                const water = all_res[1];
                const drive_day = all_res[2];
                console.log("co2:",co2);
                console.log("water:",water);
                console.log("drive_day:",drive_day);
                const instructions = result[1].split(";");
                console.log("instructions:",instructions[0]);
                // add 3 texts to different DOM co2, water, drive_day using jquery
                $('#co2').text(co2);
                $('#water').text(water);
                $('#drive_day').text(drive_day);
                // set co2_instruction unvisiable
                // change co2 to co2_instruction when click co2
                console.log("instructions:",instructions[0]);
                $('#co2').click(function () {
                    // if the text of co2 is co2, change it to co2_instruction
                    if($('#co2').text()==co2){
                        $('#co2').animate({
                            "opacity": 0
                        });
                        $('#co2').text(instructions[0]);
                        $('#co2').animate({
                            "opacity": "1",
                            "font-size": "15"
                        });
                    } //else change it to co2
                    else{
                        $('#co2').animate({
                            "opacity": "0"
                        });
                        $('#co2').text(co2);
                        $('#co2').animate({
                            "opacity": "1",
                            "font-size": "25"
                        });
                    }
                });
                // do the same thing to water 
                $('#water').click(function () {
                    if($('#water').text()==water){
                        $('#water').animate({
                            "opacity": "0"
                        });
                        $('#water').text(instructions[1]);
                        $('#water').animate({
                            "opacity": "1",
                            "font-size": "15"
                        });
                    }
                    else{
                        $('#water').animate({
                            "opacity": "0"
                        });
                        $('#water').text(water);
                        $('#water').animate({
                            "opacity": "1",
                            "font-size": "25"
                        });
                    }
                });
                // do the same thing to drive_day
                $('#drive_day').click(function () {
                    if($('#drive_day').text()==drive_day){
                        $('#drive_day').animate({
                            "opacity": "0"
                        });
                        $('#drive_day').text(instructions[2]);
                        $('#drive_day').animate({
                            "opacity": "1",
                            "font-size": "15"
                        });
                    }
                    else{
                        $('#drive_day').animate({
                            "opacity": "0"
                        });
                        $('#drive_day').text(drive_day);
                        $('#drive_day').animate({
                            "opacity": "1",
                            "font-size": "25"
                        });
                    }
                });

            },
            error:function(result) {
                alert('error');

            },
            async: false
        });
        $.ajax({
            type: "post",
            url: "/CalculatorController/visual",
            async: false,

            success:function(resultNum) {

                d3.selectAll("svg").remove()               // $('#prompt_result').html(result);
                console.log(resultNum)
                // co2
                var co2_recommend=resultNum[0];
                // water
                var water_recommend=resultNum[1];
                // car run on the way
                var car_day_recommend=resultNum[2];
                // co2 drive
                var co2_dirve=resultNum[3];
                // water drive
                var water_drive=resultNum[4];
                // car run on the way drive
                var car_day_drive=resultNum[5];
                
                // create an array to store co2_recommend , water_recommend , car_day_recommend together
                var co2_set=[co2_recommend,co2_dirve];

                // create an array to store co2_dirve , water_drive , car_day_drive together
                var co2_water_car_day_drive=[co2_dirve,water_drive,car_day_drive];
                var ylabels = ['recommend', 'drive'];
                var margin = 30;
                var width = $('#visualization').width() - margin;
                var height = 100;
                var xDomain = [0, d3.max(co2_set)];
                var xScale = d3.scaleLinear().domain(xDomain).range([margin, width-margin]);
                var yScale = d3.scaleBand().domain(ylabels).range([margin, height]).padding(0.1); 
                var xAxis = d3.axisBottom(xScale).ticks(5);
                var yAxis = d3.axisLeft(yScale).tickSizeOuter(0);
                const icon_axis = ['\uf164','\uf1b9']
                const color_pallete = ['#9a9381','#b2a59b']
                var svg = d3.select('#visualization').append('svg')
                            .attr("width", width)
                            .attr("height", height)
                            .attr("viewBox", [0, 0, width, height])
                            .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
                            .attr("font-family", "sans-serif")
                            .attr("font-size", 10)
                
                const tooltip = d3.select("body").append("div").attr("class", "toolTip");
                const index = d3.local();
                // co2 chart
                svg.append('g')
                    .selectAll('text')
                    .data(co2_set)
                    .join('text')
                    .attr('class', 'y axis')
                    .attr('transform', 'translate(-25,20)')
                    .attr('font-size','20')
                    .attr('font-family', 'FontAwesome')
                    .attr('x', margin)
                    .attr('y', (d, i) => yScale(ylabels[i]))
                    .text((d,i)=>icon_axis[i])

                
                svg.append('g')
                    .selectAll('rect')
                    .data(co2_set)
                    .join('rect')
                    .attr('x', margin)
                    .attr('y', (d, i) => yScale(ylabels[i]))
                    .attr('width', (d) => xScale(d))
                    .attr('height', yScale.bandwidth())
                    .attr('fill', (d, i) => color_pallete[i])
                    .attr("pointer-events","visible")
                    .each(function(d, i) {
                        index.set(this, i);            // Store index in local variable.
                      })
                    .on("mousemove", function(event, d) {
                        const i = index.get(this)
                        console.log(i)
                        tooltip
                            .style("left", event.pageX - 50 + "px")
                            .style("top", event.pageY - 70 + "px")
                            .style("display", "inline-block")
                            .html(`<p>CO2 emissions of ` + ylabels[i]+ ":" + d3.format(".2f")(d)+`</p>`);
                    })
                    .on("mouseout", function(d) {
                        tooltip.style("display", "none");
                    });

                svg.append("text")
                    .attr("x", (width / 2))             
                    .attr("y", 20)
                    .attr("text-anchor", "middle")  
                    .style("font-size", "16px") 
                    .style("text-decoration", "underline")  
                    .text("Cost of CO2 emissions(gram)");
                
                svg.append("g")
                    .attr("fill","black")
                    .attr("text-anchor","end")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", 10)
                    .selectAll("text")
                    .data(co2_set)
                    .join("text")
                    .attr("x", (d) => xScale(d)+margin)
                    .attr("y", (d, i) => yScale(ylabels[i]) + yScale.bandwidth() / 2)
                    .attr("dy", "0.35em")
                    .attr("dx", "-0.5em")
                    .text((d) => (d3.format(".2f")(d)+"g"))
                    .call(text => text.filter((d) => xScale(d) < width / 2)
                            .attr("dx", +30)
                            .attr("text-anchor", "start"));
            // water chart
            var svg2 = d3.select('#visualization').append('svg')
                            .attr("width", width)
                            .attr("height", height)
                            .attr("viewBox", [0, 0, width, height])
                            .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
                            .attr("font-family", "sans-serif")
                            .attr("font-size", 10)
            var water_set=[water_recommend,water_drive];
            var margin = 30;
            var width = $('#visualization').width() - margin;
            console.log(width)
            var height = 100;
            var xDomain_water = [0, d3.max(water_set)];
            var xScale_water = d3.scaleLinear().domain(xDomain_water).range([margin, width-margin]);
            const color_pallete_water = ['#74ccf4','#2389da']
            svg2.append('g')
                    .selectAll('text')
                    .data(water_set)
                    .join('text')
                    .attr('class', 'y axis')
                    .attr('transform', 'translate(-25,20)')
                    .attr('font-size','20')
                    .attr('font-family', 'FontAwesome')
                    .attr('x', margin)
                    .attr('y', (d, i) => yScale(ylabels[i]))
                    .text((d,i)=>icon_axis[i])

                
            svg2.append('g')
                .selectAll('rect')
                .data(water_set)
                .join('rect')
                .attr('x', (d) => width - xScale_water(d))
                .attr('y', (d, i) => yScale(ylabels[i]))
                .attr('width', (d) => xScale_water(d))
                .attr('height', yScale.bandwidth())
                .attr('fill', (d, i) => color_pallete_water[i])
                .attr("pointer-events","visible")
                .each(function(d, i) {
                    index.set(this, i);            // Store index in local variable.
                    })
                .on("mousemove", function(event, d) {
                    const i = index.get(this)
                    console.log(i)
                    tooltip
                        .style("left", event.pageX - 50 + "px")
                        .style("top", event.pageY - 70 + "px")
                        .style("display", "inline-block")
                        .html(`<p>This energy of ` + ylabels[i]+ " saving euqals to " + d3.format(".2f")(d)+`grams water</p>`);
                })
                .on("mouseout", function(d) {
                    tooltip.style("display", "none");
                });

            svg2.append("text")
                .attr("x", (width / 2))             
                .attr("y", 20)
                .attr("text-anchor", "middle")  
                .style("font-size", "16px") 
                .style("text-decoration", "underline")  
                .text("Save water(gram)");
            
            svg2.append("g")
                .attr("fill","black")
                .attr("text-anchor","end")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .selectAll("text")
                .data(water_set)
                .join("text")
                .attr("x", (d) => xScale_water(d)+margin)
                .attr("y", (d, i) => yScale(ylabels[i]) + yScale.bandwidth() / 2)
                .attr("dy", "0.35em")
                .attr("dx", "+0.5em")
                .text((d) => (d3.format(".2f")(d)+"g"))
                .call(text => text.filter((d) => xScale_water(d) < width / 2)
                        .attr("dx", +30)
                        .attr("text-anchor", "start"));
                
                // energy chart
                var svg3 = d3.select('#visualization').append('svg')
                                .attr("width", width)
                                .attr("height", height)
                                .attr("viewBox", [0, 0, width, height])
                                .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
                                .attr("font-family", "sans-serif")
                                .attr("font-size", 10)
                var energy_set=[car_day_recommend,car_day_drive];
                var margin = 30;
                var width = $('#visualization').width() - margin;
                console.log(width)
                var height = 100;
                var xDomain_energy = [0, d3.max(energy_set)];
                var xScale_energy = d3.scaleLinear().domain(xDomain_energy).range([margin, width-margin]);
                const color_pallete_energy = ['#fcfd98','#ffc101']
                svg3.append('g')
                        .selectAll('text')
                        .data(energy_set)
                        .join('text')
                        .attr('class', 'y axis')
                        .attr('transform', 'translate(-25,20)')
                        .attr('font-size','20')
                        .attr('font-family', 'FontAwesome')
                        .attr('x', margin)
                        .attr('y', (d, i) => yScale(ylabels[i]))
                        .text((d,i)=>icon_axis[i])
                svg3.append('g')
                    .selectAll('rect')
                    .data(energy_set)
                    .join('rect')
                    .attr('x', margin)
                    .attr('y', (d, i) => yScale(ylabels[i]))
                    .attr('width', (d) => xScale_energy(d))
                    .attr('height', yScale.bandwidth())
                    .attr('fill', (d, i) => color_pallete_energy[i])
                    .attr("pointer-events","visible")
                    .each(function(d, i) {
                        index.set(this, i);            // Store index in local variable.
                        }
                    )
                    .on("mousemove", function(event, d) {
                        const i = index.get(this)
                        console.log(i)
                        tooltip
                            .style("left", event.pageX - 50 + "px")
                            .style("top", event.pageY - 70 + "px")
                            .style("display", "inline-block")
                            .html(`<p>This energy of ` + ylabels[i]+ " can let normal cars driving for " + d3.format(".2f")(d)+`days</p>`);
                    }
                    )
                    .on("mouseout", function(d) {
                        tooltip.style("display", "none");
                    }
                    );
                svg3.append("text")
                    .attr("x", (width / 2))
                    .attr("y", 20)
                    .attr("text-anchor", "middle")
                    .style("font-size", "16px")
                    .style("text-decoration", "underline")
                    .text("Average driving time(days)");
                svg3.append("g")
                    .attr("fill","black")
                    .attr("text-anchor","end")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", 10)
                    .selectAll("text")
                    .data(energy_set)
                    .join("text")
                    .attr("x", (d) => xScale_energy(d)+margin)
                    .attr("y", (d, i) => yScale(ylabels[i]) + yScale.bandwidth() / 2)
                    .attr("dy", "0.35em")
                    .attr("dx", "-0.5em")
                    .text((d) => (d3.format(".2f")(d)+"kWh"))
                    .call(text => text.filter((d) => xScale_energy(d) < width / 2)
                            .attr("dx", +30)
                            .attr("text-anchor", "start"));
                // water chart
                
                        


            },
            error:function(result) {
                alert('error');

            },
            async: false
        });

    });
    //console.log('this is num 1  '+num1);
}
// define a function called generate_flip_card
// function generate_flip_card(transportation_) {
//     // if transportation is light_rail_or_tram , transportation = 'Bus'
//     if(transportation_=='light_rail_or_tram'){
//         transportation_='Bus';
//     }
//     var transportation=transportation_;
//     document.getElementById("image-mask").src = `../icon/${transportation}.jpg`;
//     $('.text-link').html(`<a href='/PageController/to${transportation}'></p>`+transportation+`</p></a>`);
// }
