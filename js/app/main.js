var players = [];
var selectedGoodRoles = [];
var selectedEvilRoles = [];
var merlin = {
    id: 'Merlin',
    name: 'Merlin',
    imgUrl: 'images/merlin.png',
    detailFn: function(_, playerRoles){
        var evilNames = _.map(_.filter(playerRoles, function(playerRole) {
            return _.contains(['Minion', 'Assassin', 'Oberon', 'Morgana'], playerRole[1].id);
        }), function(playerRole) {
            return playerRole[0];
        });
        return 'Minions: ' + evilNames.join(', ');
    }};

var percival = {
    id: 'Percival',
    name: 'Percival',
    imgUrl: 'images/percival.png',
    detailFn: function(_, playerRoles){
        var merlinNames = _.map(_.filter(playerRoles, function(playerRole) {
            return _.contains(['Merlin', 'Morgana'], playerRole[1].id);
        }), function(playerRole) {
            return playerRole[0];
        });
        return 'Merlins: ' + merlinNames.join(', ');
    }};

var goodKnight = {
    id: 'GoodKnight',
    name: 'Loyal Servant',
    imgUrl: 'images/goodknight.png',
    detailFn: function(_, playerRoles){return '';}};

var assassin = {
    name: 'Assassin',
    imgUrl: 'images/assassin.png',
    detailFn: function(_, playerRoles, selfRole){
        var evilNames = _.map(_.reject(playerRoles, function(playerRole) {
            return _.contains(['Oberon', 'Merlin', 'GoodKnight', 'Percival'], playerRole[1].id)
             || playerRole[0] === selfRole[0];
        }), function(playerRole) {
            return playerRole[0];
        });
        return 'Fellow Minions: ' + evilNames.join(', ');
    }};

var mordred = {
    id: 'Mordred',
    name: 'Mordred',
    imgUrl: 'images/mordred.png',
    detailFn: function(_, playerRoles, selfRole){
        var evilNames = _.map(_.reject(playerRoles, function(playerRole) {
            return _.contains(['Oberon', 'Merlin', 'GoodKnight', 'Percival'], playerRole[1].id)
             || playerRole[0] === selfRole[0];
        }), function(playerRole) {
            return playerRole[0];
        });
        return 'Fellow Minions: ' + evilNames.join(', ');
    }};

var morgana = {
    id: 'Morgana',
    name: 'Morgana',
    imgUrl: 'images/morgana.png',
    detailFn: function(_, playerRoles, selfRole){
        var evilNames = _.map(_.reject(playerRoles, function(playerRole) {
            return _.contains(['Oberon', 'Merlin', 'GoodKnight', 'Percival'], playerRole[1].id)
             || playerRole[0] === selfRole[0];
        }), function(playerRole) {
            return playerRole[0];
        });
        return 'Fellow Minions: ' + evilNames.join(', ');
    }};

var oberon = {
    id: 'Oberon',
    name: 'Oberon',
    imgUrl: 'images/oberon.png',
    detailFn: function(_, playerRoles, selfRole){
        var evilNames = _.map(_.reject(playerRoles, function(playerRole) {
            return _.contains(['Merlin', 'GoodKnight', 'Percival'], playerRole[1].id)
             || playerRole[0] === selfRole[0];
        }), function(playerRole) {
            return playerRole[0];
        });
        return 'Fellow Minions: ' + evilNames.join(', ');
    }};

var minion = {
    id: 'Minion', 
    name: 'Minon of Mordred',
    imgUrl: 'images/minion.png',
    detailFn: function(_, playerRoles, selfRole){
        var evilNames = _.map(_.reject(playerRoles, function(playerRole) {
            return _.contains(['Oberon', 'Merlin', 'GoodKnight', 'Percival'], playerRole[1].id)
             || playerRole[0] === selfRole[0];
        }), function(playerRole) {
            return playerRole[0];
        });
        return 'Fellow Minions: ' + evilNames.join(', ');
    }};

var playerRoles = {};

function main($, _) {
    console.log('starting...');
    var $namesList = $('#names-list');
    $namesList.sortable();
    $namesList.disableSelection();
    $namesList.bind('sortstop', function(event, ui) {
        $namesList.listview('refresh');
    });
    $('#add').listview();

    // Trigger add name button click on keyboard return in the add name input box.
    $('#add-name').keydown(function( event ) {
      if (event.which === 13) {
        $('#add-name-button').click();
      }
    });

    function storePlayerList() {
      // store updated players list
      if (window.localStorage) {
        var storage = window.localStorage;
        var names = jQuery.map($('#names-list').children(), function(li) {
            return $('a > h3', li).text();
        });
        console.log('storing: ' + names);
        storage.setItem('players', JSON.stringify(names));
      }
      players = names;
    }

    function addPlayer(name) {
      console.log('adding player...');
      console.log('with name=' + name);
      if (name !== '') {
          $('<li>')
              .append(
                  $('<a>')
                  .attr('href', '#')
                  .append(
                      $('<h3>')
                      .text(name)))
              .append(
                  $('<a>')
                  .attr('href', '#')
                  .text(' ')
                  .click(function() {
                      // navigate up to the <li> and remove it from the <ul>
                      $(this).parent().remove();
                      $namesList.listview('refresh');
                      storePlayerList();
                  }))
              .appendTo($('#names-list'));
          $namesList.listview('refresh');
          $('#add-name').val('');
      }
    }

    // Add any persisted players to the config page.
    if (window.localStorage) {
      var storage = window.localStorage;
      var storedPlayers = storage.getItem('players');
      if (storedPlayers !== null) {
        var players = JSON.parse(storedPlayers);
        for (var i in players) {
          var player = players[i];
          addPlayer(player);
        }
      }
    }

    // Allow adding names
    $('#add-name-button').on('click', function() {
      var name = $('#add-name').val();
      addPlayer(name);
      storePlayerList();
    });

    // Populate analyze page
    $('#random-roles-button').on('click', function(event) {
        var names = jQuery.map($('#names-list').children(), function(li) {
            return $('a > h3', li).text();
        });
        console.log(names);

        if (names.length < 5) {
            event.preventDefault();
        }

        assignRoles();
    });

    function assignRoles() {
      var initialSet;
      var names = players;

      console.log('assigning with names=' + names);
      selectedGoodRoles = [];
      selectedEvilRoles = [];
      if ($("#config-roles-page > div.ui-content input[name='merlin']").is(':checked')) {
          selectedGoodRoles.push(merlin);
      }
      if ($("#config-roles-page > div.ui-content input[name='percival']").is(':checked')) {
          selectedGoodRoles.push(percival);
      }
      if ($("#config-roles-page > div.ui-content input[name='assassin']").is(':checked')) {
          selectedEvilRoles.push(assassin);
      }
      if ($("#config-roles-page > div.ui-content input[name='mordred']").is(':checked')) {
          selectedEvilRoles.push(mordred);
      }
      if ($("#config-roles-page > div.ui-content input[name='morgana']").is(':checked')) {
          selectedEvilRoles.push(morgana);
      }
      if ($("#config-roles-page > div.ui-content input[name='oberon']").is(':checked')) {
          selectedEvilRoles.push(oberon);
      }
      
      var remainingGoodRoles = _.shuffle(selectedGoodRoles);
      var remainingEvilRoles = _.shuffle(selectedEvilRoles);
       
      // initial set: true = evil, false = good
      switch (names.length) {
          case 5:
              initialSet = [true, true, false, false, false];
              break;
          case 6:
              initialSet = [true, true, false, false, false, false];
              break;
          case 7:
              initialSet = [true, true, true, false, false, false, false];
              break;
          case 8:
              initialSet = [true, true, true, false, false, false, false, false];
              break;
          case 9:
              initialSet = [true, true, true, false, false, false, false, false, false];
              break;
          case 10:
              initialSet = [true, true, true, true, false,  false, false, false, false, false];
              break;
      }

      var numGood = _.filter(initialSet, function(isBad) {return !isBad;}).length;
      var numEvil = _.filter(initialSet, function(isBad) {return isBad;}).length;

      // turn the initial set into the roles for the game
      var roles = _.shuffle(_.map(initialSet, function(isBad) {
          if (isBad) {
              // possibly replace true with an exclusive bad-guy role
              if (remainingEvilRoles.length > 0 && _.random(0, 2) === 0) {
                  return remainingEvilRoles.pop();
              } else {
                  return minion;
              }
          } else {
              // possibly replace false with an exclusive good-guy role
              if (remainingGoodRoles.length > 0 && _.random(0, 2) === 0) {
                  return remainingGoodRoles.pop();
              } else {
                  return goodKnight;
              }
          }
      }));

      // key = player name, value = role object
      playerRoles = _.zip(players, roles);
      console.log('assigning player roles:' + JSON.stringify(playerRoles));

      // setup the show-roles-page with the first player
      setupShowRolesPage(0);
    }

    function setupShowRolesPage(playerIndex) {
      $('#show-roles-img').attr('src', 'images/blank.png');
      $('#show-roles-player-name').text(playerRoles[playerIndex][0]);
      $('#show-roles-role-name').hide();
      $('#show-roles-detail').hide();
      $('#show-roles-ready-button').hide();
      $('#show-roles-reveal-button').show().off().on('click', function() {
          $('#show-roles-reveal-button').hide();
          $('#show-roles-img').attr('src', playerRoles[playerIndex][1].imgUrl);
          $('#show-roles-role-name').show().text(playerRoles[playerIndex][1].name);
          $('#show-roles-detail').show().text(playerRoles[playerIndex][1].detailFn(_, playerRoles, playerRoles[playerIndex]));
          setTimeout(function() {
              $('#show-roles-ready-button').show().off().on('click', function(event) {
                  if (playerIndex + 1 >= players.length) {
                      showStartingPlayerPage();
                      event.preventDefault();
                  }
                  else {
                      setupShowRolesPage(playerIndex + 1);
                  }
              });
          }, 1000);
      });
    }

    function showStartingPlayerPage() {
        $('body').pagecontainer('change', '#starting-player-page');
        $('#starting-player-name').text(_.shuffle(players)[0]);
    }
}

define(["jquery", "underscore", "jquery-mobile", "jquery-ui", "jquery-ui-touch-punch"], function($, _) {
  $(function(){main($, _);});
});
