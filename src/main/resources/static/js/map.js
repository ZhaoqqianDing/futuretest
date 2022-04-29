
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

// function calculateThePrompt(){
//     var origins = document.getElementById("start").value;
//     var destinations = document.getElementById("end").value;
//     var axios = require('axios');
//
//     var config = {
//         method: 'get',
//         url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=849VCWC8%2BR9&destinations=San%20Francisco&key=AIzaSyB-6bcvh7VwQmlPe6FAWRz7seZAwbrLHdA',
//         headers: { }
//     };
//
//     axios(config)
//         .then(function (response) {
//             console.log(JSON.stringify(response.data));
//
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
//     // $.ajax({
//     //     type: "post",
//     //     url: "https://maps.googleapis.com/maps/api/distancematrix/json?origins=Monash City&destinations=Monash Clayton&key=AIzaSyB-6bcvh7VwQmlPe6FAWRz7seZAwbrLHdA",
//     //     // data: {origins:origins,
//     //     //     destinations:destinations,
//     //     //     units:"imperial",
//     //     //     key:"AIzaSyB-6bcvh7VwQmlPe6FAWRz7seZAwbrLHdA"},
//     //     success:function() {
//     //         // var jsonRes = result;
//     //         // var obj = JSON.parse(json);
//     //         // $('#calculate_time').html(obj.rows.elements.duration.text);
//     //         alert("success");
//     //     },
//     //     error:function(result) {
//     //         alert('error123');
//     //
//     //     }
//     // });
// }
var num1=0;
var num2=0;
var num3=0;
var num4=0;
var num5=0;
var num6=0;
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
        console.log(response);
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

                $('#prompt_result').html(result);
                console.log(result)
                document.getElementById("prompt_result1").innerHTML =result[0];
                document.getElementById("prompt_result2").innerHTML =result[1];
                document.getElementById("prompt_result3").innerHTML =result[2];
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


               // $('#prompt_result').html(result);
                console.log(resultNum)
                 num1=resultNum[0];
                 num2=resultNum[1];
                 num3=resultNum[2];
                num4 =resultNum[3];
                 num5=resultNum[4];
                 num6=resultNum[5];
                 console.log("in ajax "+num1);
            },
            error:function(result) {
                alert('error');

            },
            async: false
        });

    });
    //console.log('this is num 1  '+num1);
}