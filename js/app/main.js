var players = [];
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
        //configShowRolesPage();
    });

    function assignRoles() {
      var initialSet;
      var names = players;

      console.log('assigning with names=' + names);
      var remainingGoodRoles = _.shuffle([
        {name: 'Merlin',
         imgUrl: 'images/merlin.png'},
        {name: 'Percival',
         imgUrl: 'images/percival.png'}]);
      var goodKnight = {
         name: 'Loyal Servant',
         imgUrl: 'images/goodknight.png'};
      var remainingEvilRoles = _.shuffle([
        {name: 'Assassin',
         imgUrl: 'images/assassin.png'},
        {name: 'Mordred',
         imgUrl: 'images/mordred.png'},
        {name: 'Morgana',
         imgUrl: 'images/morgana.png'},
        {name: 'Oberon',
         imgUrl: 'images/oberon.png'}]);
      var minion = {
         name: 'Minon of Mordred',
         imgUrl: 'images/minion.png'};
       
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
              if (remainingEvilRoles.length > 0 && _.random(0, 1) === 1) {
                  return remainingEvilRoles.pop();
              } else {
                  return minion;
              }
          } else {
              // possibly replace false with an exclusive good-guy role
              if (remainingGoodRoles.length > 0 && _.random(0, 1) === 1) {
                  return remainingGoodRoles.pop();
              } else {
                  return goodKnight;
              }
          }
      }));

      // key = player name, value = role object
      playerRoles = _.zip(players, roles);
      console.log('assigning player roles:' + JSON.stringify(playerRoles));
      //
      // setup the show-roles-page with the first player
      setupShowRolesPage(0);
    }

    function setupShowRolesPage(playerIndex) {
      $('#show-roles-img').attr('src', 'images/blank.png');
      $('#show-roles-player-name').text(playerRoles[playerIndex][0]);
      $('#show-roles-role-name').hide();
      $('#show-roles-ready-button').hide();
      $('#show-roles-reveal-button').show().off().on('click', function() {
          $('#show-roles-reveal-button').hide();
          $('#show-roles-img').attr('src', playerRoles[playerIndex][1].imgUrl);
          $('#show-roles-role-name').show().text(playerRoles[playerIndex][1].name);
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
