$(document).ready(function(){

    $("#txt_num").keyup(function(){

        var num = $(this).val().trim();

        if(num != ''){

            $.ajax({
                url: '/CalculatorController/test',
                type: 'post',
                data: {num: num},
                success: function(response){

                    $('#uname_response').html(response);

                }
            });
        }else{
            $("#uname_response").html("");
        }

    });

});



$(document).ready(function(){
    $("button").click(function() {
        var button_value = $(this).val();
        $.ajax({
            type: "post",
            url: "/CalculatorController/chooseType",
            data: {type: button_value},
        success:function(result) {
            $('#type_response').html(result);
        },
        error:function(result) {
            alert('error');

        }
    });
    });

});

