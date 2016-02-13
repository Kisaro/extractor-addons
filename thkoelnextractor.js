var ThkoelnExtractor = new Extractor('Thkoeln');
ThkoelnExtractor.mensaUrl = 'http://www.max-manager.de/daten-extern/sw-koeln/html/speiseplan-render.php';
ThkoelnExtractor.request = null;
ThkoelnExtractor.init = function() {
  this.request = require('request');
};
ThkoelnExtractor.extract = function(query) {
  ThkoelnExtractor.results = [];
  if(query.toLowerCase() === 'mensa') {
    ThkoelnExtractor.pushMensaSelection();
  } else if(query.substr(0, 6) === 'mensa ' && query.length > 6) {
    var mensa = query.substr(6);
    var mensaName = '';
    switch(mensa) {
      case 'uni':
        mensaName = 'unimensa';
        break;
      case 'iwz':
        mensaName = 'iwz-deutz';
        break;
      case 'gm':
        mensaName = 'gummersbach';
        break;
    }

    if(mensaName === '') {
      var r = new Result('Not a valid mensa');
      r.setDescription('Press enter to list valid mensas');
      r.action = function() {
        App.search.value = 'mensa';
        App.triggerSearchEvent();
      }
      this.results.push(r);
    }
    else
      this.request
        .post(ThkoelnExtractor.mensaUrl,{
          form: {
            'func': 'make_spl',
            'locId': mensaName,
            'lang': 'en',
            'date': (new Date()).toISOString().substr(0,10)
          }
        },
        function(err, response, data) {
          ThkoelnExtractor.results = [];
          // Create dummy DOM to properly extract data from the text/html response
          var dummy = document.createElement('html');
          dummy.innerHTML = data;
          var images = dummy.getElementsByClassName('cell0');
          var meals = dummy.getElementsByClassName('cell1');
          var prices = dummy.getElementsByClassName('cell3');

          // start by 1, because the first element does not contain an actual meal (yay.. crawling)
          for(var i = 1; i < meals.length; i++) {
            var r = new Result(meals[i].getElementsByTagName('DIV')[0].innerHTML.replace(/<sup.*?>.+?<\/sup>/g, '').replace(/<.*?>/g, ' ').replace(/\*\*/, ''));
            var image = '';
            try {
              image = '<img src="' + images[i].getElementsByTagName('IMG')[0].src + '" style="height: 40px; float: left; margin-right: 10px">';
            } catch(e){};
            r.setDescription(prices[i].innerHTML + image);
            r.setWeight(100);
            ThkoelnExtractor.results.push(r);
          }
        });
  }
};

ThkoelnExtractor.pushMensaSelection = function() {
  var unimensa = new Result('UniMensa');
  unimensa.setDescription('Display menu for' + unimensa.getTitle());
  unimensa.setWeight = 100;
  unimensa.action = function() {
    App.search.value = 'mensa uni';
    App.triggerSearchEvent();
  };
  ThkoelnExtractor.results.push(unimensa);

  var iwzmensa = new Result('Mensa IWZ Deutz');
  iwzmensa.setDescription('Display menu for ' + iwzmensa.getTitle());
  iwzmensa.setWeight = 100;
  iwzmensa.action = function() {
    App.search.value = 'mensa iwz';
    App.triggerSearchEvent();
  };
  ThkoelnExtractor.results.push(iwzmensa);

  var suedstadtmensa = new Result('Mensa Südstadt');
  suedstadtmensa.setDescription('Display menu for ' + suedstadtmensa.getTitle());
  suedstadtmensa.setWeight = 100;
  suedstadtmensa.action = function() {
    App.search.value = 'mensa suedstadt';
    App.triggerSearchEvent();
  };
  ThkoelnExtractor.results.push(suedstadtmensa);

  var gmmensa = new Result('Mensa Gummersbach');
  gmmensa.setDescription('Display menu for ' + gmmensa.getTitle());
  gmmensa.setWeight = 100;
  gmmensa.action = function() {
    App.search.value = 'mensa gm';
    App.triggerSearchEvent();
  };
  ThkoelnExtractor.results.push(gmmensa);
}
