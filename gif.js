  
  
  
  $(document).ready(function() {    
  var regrets = ['men', 'dairy', 'drexting'];      
  function buttonZone(){      
    $('buttons').empty();      
    for (var i = 0; i < regrets.length; i++) {        
      var eachButton = $('<button>');        
      eachButton.addClass('expression');       
       eachButton.attr('data-name', regrets[i]);
        eachButton.text(regrets[i]);
        $('#buttons').append(eachButton);
      }
  
    }
    buttonZone();
  
    $(document).on('click', '.expression', function () {
  
      var regret1 = $(this).html();
      console.log(regret1);
      // queryURL is the url we'll use to query the API
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=&api_key=dc6zaTOxFJmzC&limit=10" + regret1 + "ZW4zJGmo1G7uQhAvNwNrbdzBQHkakn7O";
      $.ajax({ url: queryURL, method: 'GET' })
        .done(function (response) {
          // grabs data
          var results = response.data;
  
          // clear out div before adding more gifs
          $('#article-section').empty();
  
          for (var j = 0; j < results.length; j++) {
            var gifDiv = $('<div>');
            var imageView = results[j].images.fixed_height.url;
            var still = results[j].images.fixed_height_still.url;
            //console.log(imageView)
            var showImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
            showImage.attr('data-state', 'still');
            $('#article-section').prepend(showImage);
            showImage.on('click', playGif);
            // get rating
            var rating = results[j].rating;
            console.log(rating);
            var showRating = $('<p>').text("Rated: " + rating);
            $('#article-section').prepend(showRating);
  
  
  
        }
        });
  
          function playGif() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          }
      })

          $(document).on('click', '#addExpress', function(){
            if ($('#search-term').val().trim() == ''){
           }
           else {
            var regret2 = $('#search-term').val().trim();
            regrets.push(regret2);
            $('#search-term').val('');
            buttonZone();
            return false;
        
            }
        
        });

      });

        
        
        
