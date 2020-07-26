$(document).ready(function() {

  // array of active listings
  var Listings = []

  // object representing each listing, helps in accessing tags
  function Listing(data) {
    this.id = data.id;
    this.company = data.company;
    this.logo = data.logo;
    this.new = data.new;
    this.featured = data.featured;
    this.position = data.position;
    this.role = data.role;
    this.level = data.level;
    this.postedAt = data.postedAt;
    this.contract = data.contract;
    this.location = data.location;
    this.languages = data.languages;
    this.tools = data.tools;
    this.tags = [].concat(data.role, data.level, data.languages, data.tools)
  }

  // helper function for tag search
  function search(queries, target) {
    if(queries.includes(target)) {
      // remove existing query
      queries.splice(queries.indexOf(target), 1)
      // find specific search tag related to the existing query
      $('.search-tag-' + target).addClass('removed')
      // any job listings that were not included in the search should re-appear
      for(var i = 0; i < Listings.length; i++) {
        if(queries.every(r => Listings[i].tags.includes(r))) {
          $('#' + Listings[i].id + '.job-container').css('display', 'block')
        }
      }
    }
    else {
      // add new query
      queries.push(target)
      // add search tag related to user query
      $('.search-tags').append('<div class="query-wrapper search-tag-' + target + '"> <div class="listing-search"> <p class="listing-name">' + target + '</p></div><div class="remove-search"> <span class="search-cross"></span> </div></div>')

      $('.job-container').not(':has(.listing-tag-' + target + ')').css('display','none')
    }
    if(queries.length) {
      $('.search-bar').css('visibility', 'visible')
    }
    else {
      $('.search-bar').css('visibility', 'hidden')
    }
  }


  $.getJSON('data.json', function(data) {
    // structure page from JSON data
    for(var i = 0; i < data.length; i++) {
      Listings.push(new Listing(data[i]))
    }

    for(var i = 0; i < Listings.length; i++) {
      // Determine if feature identifiers will be present in the listing
      var feature_new = Listings[i].new ? '<p class="listing-status listing-new">NEW!</p>' : '';
      var feature_featured = Listings[i].featured ? '<p class="listing-status listing-featured">FEATURED</p>' : '';

      $('#job-feed').append('<div id="' + Listings[i].id + '" class="job-container"> <div class="row"> <img src="' + Listings[i].logo + '" alt="eyecam-co" class="listing-avatar"><div class="col-lg-4"> <div class="row listing-attributes"><p class="listing-company">' + Listings[i].company + '</p>' + feature_new + feature_featured + '</div><div class="row"><p class="listing-position">' + Listings[i].position + '</p></div><div class="row listing-info"><p class="listing-date-posted">' + Listings[i].postedAt + '</p><p class="listing-info-spacer">·</p><p class="listing-type">' + Listings[i].contract + '</p><p class="listing-info-spacer">·</p><p class="listing-location">' + Listings[i].location + '</p> </div></div><div class="col-lg-6"> <div class="row listing-tags listing-tags-' + Listings[i].id + '"></div></div></div></div>')

      // Determine if job listings will have featured flair
      if (Listings[i].featured) {
        $('.job-container').addClass('job-container-featured')
      }
      // Determine listing tags
      if (Listings[i].role) {
        $('.listing-tags-' + Listings[i].id).append('<p class="listing-tag listing-tag-' + Listings[i].role + '">' + Listings[i].role + '</p>')
      }
      if (Listings[i].level) {
        $('.listing-tags-' + Listings[i].id).append('<p class="listing-tag listing-tag-' + Listings[i].level + '">' + Listings[i].level + '</p>')
      }
      if (Listings[i].languages) {
        Listings[i].languages.forEach(e => $('.listing-tags-' + Listings[i].id).append('<p class="listing-tag listing-tag-' + e + '">' + e + '</p>'))
      }
      if (Listings[i].tools) {
        Listings[i].tools.forEach(e => $('.listing-tags-' + Listings[i].id).append('<p class="listing-tag listing-tag-' + e + '">' + e + '</p>'))
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

      search(queries, $(this).text())

    })

    $('.search-bar').on('click', '.remove-search', function() {

      search(queries, $(this).parent().find('.listing-name').text())


    })

  })
})
