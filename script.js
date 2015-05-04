var Markit = {};
/**
* Define the QuoteService.
* First argument is symbol (string) for the quote. Examples: AAPL, MSFT, JNJ, GOOG.
* Second argument is fCallback, a callback function executed onSuccess of API.
*/
Markit.QuoteService = function(stockSearch, results) {
    this.symbol = stockSearch;
    this.results = results;
    this.DATA_SRC = "http://dev.markitondemand.com/Api/v2/Quote/jsonp";
    this.makeRequest();
};
/**
* Ajax success callback. fCallback is the 2nd argument in the QuoteService constructor.
*/
Markit.QuoteService.prototype.handleSuccess = function(jsonResult) {
    this.results(jsonResult);
};
/**
* Ajax error callback
*/
Markit.QuoteService.prototype.handleError = function(jsonResult) {
    console.error(jsonResult);
};

Markit.QuoteService.prototype.makeRequest = function() {
    //Abort any open requests
    if (this.xhr) { this.xhr.abort(); }
    //Start a new request
    this.xhr = $.ajax({
        data: { symbol: this.symbol },
        url: this.DATA_SRC,
        dataType: "jsonp",
        success: this.handleSuccess,
        error: this.handleError,
        context: this
    });
};

	$(document).ready(function(){ 
		$(".submit").on("click", function(){
        $(".results").empty();
        var stockSearch = $("#stock_search").val();

        new Markit.QuoteService(stockSearch, function(jsonResult) {

            //Catch errors
            if (!jsonResult || jsonResult.Message){
                console.error("Error: ", jsonResult.Message);
                return;
            }

            //If all goes well, your quote will be here.
            console.log(jsonResult);

            //Now proceed to do something with the data.
            $(".results").append("<p><b>Name:</b> " + jsonResult.Name + "</p> <p><b>Symbol:</b> " + jsonResult.Symbol + "</p><p><b>Last Price:</b> " + jsonResult.LastPrice + "</p><p><b>Change:</b> " + jsonResult.Change + "</p>");

            /**
            * Need help? Visit the API documentation at:
            * http://dev.markitondemand.com
            */
        });

        $("#stock_search").val('');
    });

		$("#oneone").hide();
		$("#twotwo").hide();
		$("#threethree").hide();
		$("#fourfour").hide();
		$('.panic').hide();
		$('.p').spectrum();
		$('.progress-bar-success').hide();
		$('.progress-bar-striped').hide();
		$('.progress-bar-danger').hide();
		$('.progress-bar-warning').hide();
		$('.progress-bar-default').hide();
		$('.sr-only-1').hide();
		$('.sr-only-2').hide();
		$('.sr-only-3').hide();
		$('.sr-only-4').hide();
		$('.sr-only-5').hide();
		$('#reload').hide();

	$("#panicBTN").click(function(event){
    	$("#panic").text(event.timeStamp);
    	$('.panic').show();
    	$('.progress-bar-danger').show();
    	$('.sr-only-1').show();

	});
////////////////////////////////////////////////////////////////////////
		$("#panicBTN").click(function(){
			$("#oneone").show( 400 );
		});
		$("#one").click(function(event){
	    	$("#first").text(event.timeStamp/1000);
	    	$('.progress-bar-warning').show();
	    	$('.sr-only-2').show();
		});
//////////////////////////////////////////////////////////////////////
			$("#one").click(function(){
				$("#twotwo").show( 400 );
			});
			$("#two").click(function(event){
		    	$("#second").text(Math.round(event.timeStamp/60000));
		    	$('.progress-bar-default').show();
		    	$('.sr-only-3').show();
			});
///////////////////////////////////////////////////////////////////////
				$("#two").click(function(){
					$("#threethree").show( 400 );
			});
				$("#three").click(function(event){
			    	$("#third").text(Math.round(event.timeStamp/3600000));
			    	$('.progress-bar-striped').show();
			    	$('.sr-only-4').show();
				});
///////////////////////////////////////////////////////////////////////////////
					$("#three").click(function(){
						$("#fourfour").show( 400 );
					});
					$("#four").click(function(event){
				    	$("#forth").text(Math.round(event.timeStamp/86400000));
				    	$('.progress-bar-success').show();
				    	$('.sr-only-5').show();
				    	$('#reload').show();
					});
					$('#reload').on("click", function(){
						location.reload();
					});


});


