$(document).ready(function() {
  $.getJSON('data.json', function(data) {
    // structure page from JSON data
    for(var i = 0; i < data.length; i++) {

      // Determine if feature identifiers will be present in the listing
      var feature_new = data[i].new ? '<p class="listing-status listing-new">NEW!</p>' : '';
      var feature_featured = data[i].featured ? '<p class="listing-status listing-featured">FEATURED</p>' : '';

      $('#job-feed').append('<div class="job-container"> <div class="row"> <img src="' + data[i].logo + '" alt="eyecam-co" class="listing-avatar"><div class="col-lg-4"> <div class="row listing-attributes"><p class="listing-company">' + data[i].company + '</p>' + feature_new + feature_featured + '</div><div class="row"><p class="listing-position">' + data[i].position + '</p></div><div class="row listing-info"><p class="listing-date-posted">' + data[i].postedAt + '</p><p class="listing-info-spacer">·</p><p class="listing-type">' + data[i].contract + '</p><p class="listing-info-spacer">·</p><p class="listing-location">' + data[i].location + '</p> </div></div><div class="col-lg-6"> <div class="row listing-tags listing-tags-' + data[i].id + '"></div></div></div></div>')

      // Determine if job listings will have featured flair
      if (data[i].featured) {
        $('.job-container').addClass('job-container-featured')
      }
      // Determine listing tags
      if (data[i].role) {
        $('.listing-tags-' + data[i].id).append('<p class="listing-tag">' + data[i].role + '</p>')
      }
      if (data[i].level) {
        $('.listing-tags-' + data[i].id).append('<p class="listing-tag">' + data[i].level + '</p>')
      }
      if (data[i].languages) {
        data[i].languages.forEach(e => $('.listing-tags-' + data[i].id).append('<p class="listing-tag">' + e + '</p>'))
      }
      if (data[i].tools) {
        data[i].tools.forEach(e => $('.listing-tags-' + data[i].id).append('<p class="listing-tag">' + e + '</p>'))
      }

    }

    // Declare mouseover action for listing tags
    $('.listing-tag').mouseover(function() {
      // change color of text and background color of tag
      $(this).toggleClass("listing-highlighted")
    })
    $('.listing-tag').mouseout(function() {
      // change color of text and background color of tag
      $(this).toggleClass("listing-highlighted")
    })

    // this will hold all active queries
    var queries = [];
      $('.listing-tag').click(function() {
        if(queries.includes($(this).text())) {
          // remove existing query
          queries.splice(queries.indexOf($(this).text()), 1)
          // find specific search tag related to the existing query
          $('.search-tag-' + $(this).text()).addClass('removed')
        }
        else {
          // add new query
          queries.push($(this).text())
          // add search tag related to user query
          $('.search-tags').append('<div class="query-wrapper search-tag-' + $(this).text() + '"> <div class="listing-search"> <p>' + $(this).text() + '</p></div><div class="remove-search"> <span class="search-cross"></span> </div></div>')

        }
        if(queries.length) {
          $('.search-bar').css('visibility', 'visible')
        }
        else {
          $('.search-bar').css('visibility', 'hidden')
        }
        console.log(queries)
      })

  })
})
