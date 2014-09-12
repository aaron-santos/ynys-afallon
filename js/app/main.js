var players = [];
var roles = []
var selectedGoodRoles = [];
var selectedEvilRoles = [];
// Role definitions
// id - to identify each role
// name - the name printed to the screen
// imgUrl - the image to show when revealing the role
// detailFn - a function to create the detail text when revealing the role
//            @param _ - reference to the underscore lib for useful functions.
//            @param playerRoles - a list of players and their roles. Each
//            element is a list, the first item is a string (the player name),
//            the second item is an object (the player's role).
//            @param selfRole the element in playerRoles that corresponds to the revealing player.
//            The first item is the reveling player's name and the second item is the revealing player's
//            role.
function isGood(_, role) {
    return _.contains(['Merlin', 'GoodKnight', 'Percival', 'Galahad', 'Puck', 'Tanner', 'TannerMerlin', 'TannerPercival', 'RedKnight', 'Blanchefleur'], role.id);
}

function isEvil(_, role) {
    return !isGood(_, role);
}

function isCursed(_, role) {
    return role.cursed === true;
}

var merlin = {
    id: 'Merlin',
    name: 'Merlin',
    imgUrl: 'images-1/merlin.png',
    detailFn: function(_, playerRoles){
        var evilNames = _.map(_.filter(playerRoles, function(playerRole) {
            return (isEvil(_, playerRole[1]) && playerRole[1].id !== 'Mordred') || playerRole[1].id === 'RedKnight';
        }), function(playerRole) {
            return playerRole[0];
        });
        return 'Minions: ' + evilNames.join(', ');
    }
};

var percival = {
    id: 'Percival',
    name: 'Percival',
    imgUrl: 'images-1/percival.png',
    detailFn: function(_, playerRoles){
        var merlinNames = _.map(_.filter(playerRoles, function(playerRole) {
            return _.contains(['Merlin', 'Morgana'], playerRole[1].id);
        }), function(playerRole) {
            return playerRole[0];
        });
        return 'Merlins: ' + merlinNames.join(', ');
    }
};

var galahad = {
    id: 'Galahad',
    name: 'Galahad',
    imgUrl: 'images-1/galahad.png',
    detailFn: function(_, playerRoles){
        return '';
    }
};

var puck = {
    id: 'Puck',
    name: 'Puck',
    imgUrl: 'images-1/puck.png',
    detailFn: function(_, playerRoles){
        return '';
    }
};

var tanner= {
    id: 'Tanner',
    name: 'Tanner',
    imgUrl: 'images-1/tanner.png',
    detailFn: function(_, playerRoles){
        return '';
    }
};

var tannerMerlin = {
    id: 'TannerMerlin',
    name: 'Tanner',
    imgUrl: 'images-1/tanner.png',
    detailFn: function(_, playerRoles){
        var evilNames = _.map(_.filter(playerRoles, function(playerRole) {
            return isEvil(_, playerRole[1]) && playerRole[1].id !== 'Mordred';
        }), function(playerRole) {
            return playerRole[0];
        });
        return 'Minions: ' + evilNames.join(', ');
    }
};

var tannerPercival = {
    id: 'TannerPercival',
    name: 'Tanner',
    imgUrl: 'images-1/tanner.png',
    detailFn: function(_, playerRoles){
        var merlinNames = _.map(_.filter(playerRoles, function(playerRole) {
            return 'Merlin' === playerRole[1].id;
        }), function(playerRole) {
            return playerRole[0];
        });
        return 'Merlins: ' + merlinNames.join(', ');
    }
};

var redKnight = {
    id: 'RedKnight',
    name: 'Red Knight',
    imgUrl: 'images-1/redknight.png',
    detailFn: function(_, playerRoles){
        return '';
    }
};

var blanchefleur = {
    id: 'Blanchefleur',
    name: 'Blanchefleur',
    imgUrl: 'images-1/blanchefleur.png',
    detailFn: function(_, playerRoles, selfRole){
        console.log('blanchfleur selfRole: ' + JSON.stringify(selfRole));
        var goodName = _.chain(playerRoles)
        .filter(function(playerRole) {
            return isGood(_, playerRole[1]) && playerRole[0] !== selfRole[0];
        })
        .map(function(playerRole) {
            return playerRole[0];
        })
        .sample()
        .value();

        var evilName = _.chain(playerRoles)
        .filter(function(playerRole) {
            return isEvil(_, playerRole[1]);
        })
        .map(function(playerRole) {
            return playerRole[0];
        })
        .sample()
        .value();
        return 'Adversaries: ' + _.shuffle([goodName, evilName]).join(', ');
    }
};

var goodKnight = {
    id: 'GoodKnight',
    name: 'Loyal Servant',
    imgUrl: 'images-1/goodknight.png',
    detailFn: function(_, playerRoles){return '';}};

var assassin = {
    id: 'Assassin',
    name: 'Assassin',
    imgUrl: 'images-1/assassin.png',
    detailFn: function(_, playerRoles, selfRole){
        var evilNames = _.map(_.filter(playerRoles, function(playerRole) {
            return isEvil(_, playerRole[1]) && playerRole[1].id !== 'Oberon' && playerRole[0] !== selfRole[0]
                || isCursed(_, playerRole[1]);
        }), function(playerRole) {
            return playerRole[0];
        });
        return 'Fellow Minions: ' + evilNames.join(', ');
    }
};

var mordred = {
    id: 'Mordred',
    name: 'Mordred',
    imgUrl: 'images-1/mordred.png',
    detailFn: function(_, playerRoles, selfRole){
        var evilNames = _.map(_.filter(playerRoles, function(playerRole) {
            return isEvil(_, playerRole[1]) && playerRole[1].id !== 'Oberon' && playerRole[0] !== selfRole[0]
                || isCursed(_, playerRole[1]);
        }), function(playerRole) {
            return playerRole[0];
        });
        return 'Fellow Minions: ' + evilNames.join(', ');
    }
};

var morgana = {
    id: 'Morgana',
    name: 'Morgana',
    imgUrl: 'images-1/morgana.png',
    detailFn: function(_, playerRoles, selfRole){
        var evilNames = _.map(_.filter(playerRoles, function(playerRole) {
            return isEvil(_, playerRole[1]) && playerRole[1].id !== 'Oberon' && playerRole[0] !== selfRole[0]
                || isCursed(_, playerRole[1]);
        }), function(playerRole) {
            return playerRole[0];
        });
        return 'Fellow Minions: ' + evilNames.join(', ');
    }
};

var oberon = {
    id: 'Oberon',
    name: 'Oberon',
    imgUrl: 'images-1/oberon.png',
    detailFn: function(_, playerRoles, selfRole){
        var evilNames = _.map(_.filter(playerRoles, function(playerRole) {
            return isEvil(_, playerRole[1]) && playerRole[1].id !== 'Oberon' && playerRole[0] !== selfRole[0]
                || isCursed(_, playerRole[1]);
        }), function(playerRole) {
            return playerRole[0];
        });
        return 'Fellow Minions: ' + evilNames.join(', ');
    }
};

var dave = {
    id: 'Dave', 
    name: 'Dave',
    imgUrl: 'images-1/dave.png',
    detailFn: function(_, playerRoles, selfRole){
        var evilNames = _.map(_.filter(playerRoles, function(playerRole) {
            return isEvil(_, playerRole[1]) && playerRole[1].id !== 'Oberon' && playerRole[0] !== selfRole[0]
                || isCursed(_, playerRole[1]);
        }), function(playerRole) {
            return playerRole[0];
        });
        return 'Fellow Minions: ' + evilNames.join(', ');
    }
};

var balan = {
    id: 'Balan', 
    name: 'Balan',
    imgUrl: 'images-1/balan.png',
    detailFn: function(_, playerRoles, selfRole){
        var evilNames = _.map(_.filter(playerRoles, function(playerRole) {
            return isEvil(_, playerRole[1]) && playerRole[1].id !== 'Oberon' && playerRole[0] !== selfRole[0]
                || isCursed(_, playerRole[1]);
        }), function(playerRole) {
            return playerRole[0];
        });
        return 'Fellow Minions: ' + evilNames.join(', ') + '<br />'
            +'Roles: '
            + _.chain(playerRoles)
               .shuffle()
               .sortBy(function(playerRole) {
                   return isGood(_, playerRole[1]);
               })
               .map(function(playerRole){
                    if (isGood(_, playerRole[1])) {
                        return '<span class="goodRoleHighlight">'
                        + playerRole[1].name
                        +'</span>';
                    } else {
                        return '<span class="evilRoleHighlight">'
                        + playerRole[1].name
                        +'</span>';
                    }
               })
               .value()
               .join(', ');
    }
};

var minion = {
    id: 'Minion', 
    name: 'Minon of Mordred',
    imgUrl: 'images-1/minion.png',
    detailFn: function(_, playerRoles, selfRole){
        var evilNames = _.map(_.filter(playerRoles, function(playerRole) {
            return isEvil(_, playerRole[1]) && playerRole[1].id !== 'Oberon' && playerRole[0] !== selfRole[0]
                || isCursed(_, playerRole[1]);
        }), function(playerRole) {
            return playerRole[0];
        });
        return 'Fellow Minions: ' + evilNames.join(', ');
    }
};

var playerRoles = {};

function main($, _) {
    console.log('starting...');
    var $namesList = $('#names-list');
    $namesList.sortable();
    $namesList.disableSelection();
    $namesList.bind('sortstop', function(event, ui) {
        $namesList.listview('refresh');
        storePlayerList();
    });
    $('#config-roles-page').on('pagebeforecreate', function() {
        $('#add').listview();
    });

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

    // When done configuring players, check if there are enough players before continuing. 
    $('#config-next-button').on('click', function(event) {
        var names = jQuery.map($('#names-list').children(), function(li) {
            return $('a > h3', li).text();
        });
        console.log(names);

        if (names.length < 5) {
            event.preventDefault();
        }
    });

    // Random roles button assigns roles.
    $('#random-roles-button').on('click', function(event) {
        assignRoles(true);
    });
    $('#nonex-random-roles-button').on('click', function(event) {
        assignRoles(false);
    });

    function assignRoles(exclusionaryRoles) {
        var initialSet;
        var names = players;

        console.log('assigning with names=' + names);
        selectedGoodRoles = [];
        selectedEvilRoles = [];
        // Add selected roles based on role config
        if ($("#config-roles-page > div.ui-content input[name='merlin']").is(':checked')) {
            selectedGoodRoles.push(merlin);
        }
        if ($("#config-roles-page > div.ui-content input[name='percival']").is(':checked')) {
            selectedGoodRoles.push(percival);
        }
        if ($("#config-roles-page > div.ui-content input[name='blanchefleur']").is(':checked')) {
            selectedGoodRoles.push(blanchefleur);
        }
        if ($("#config-roles-page > div.ui-content input[name='redknight']").is(':checked')) {
            selectedGoodRoles.push(redKnight);
        }
        if ($("#config-roles-page > div.ui-content input[name='puck']").is(':checked')) {
            selectedGoodRoles.push(puck);
        }
        if ($("#config-roles-page > div.ui-content input[name='tanner']").is(':checked')) {
            selectedGoodRoles.push(tanner);
        }
        if ($("#config-roles-page > div.ui-content input[name='tannermerlin']").is(':checked')) {
            selectedGoodRoles.push(tannerMerlin);
        }
        if ($("#config-roles-page > div.ui-content input[name='tannerpercival']").is(':checked')) {
            selectedGoodRoles.push(tannerPercival);
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
        if ($("#config-roles-page > div.ui-content input[name='dave']").is(':checked')) {
            selectedEvilRoles.push(dave);
        }
        if ($("#config-roles-page > div.ui-content input[name='balan']").is(':checked')) {
            selectedEvilRoles.push(balan);
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

        var randomMax = $('#special-roles-slider').val();
        // turn the initial set into the roles for the game
        roles = _.map(initialSet, function(isBad) {
            if (isBad) {
                // possibly replace true with an exclusive bad-guy role
                if (remainingEvilRoles.length > 0 && _.random(0, randomMax) > 0) {
                    if (exclusionaryRoles) {
                        return _.clone(remainingEvilRoles.pop());
                    } else {
                        return _.clone(_.sample(remainingEvilRoles));
                    }
                } else {
                    return minion;
                }
            } else {
                // possibly replace false with an exclusive good-guy role
                if (remainingGoodRoles.length > 0 && _.random(0, randomMax) > 0) {
                    if (exclusionaryRoles) {
                        return _.clone(remainingGoodRoles.pop());
                    } else {
                        return _.clone(_.sample(remainingGoodRoles));
                    }
                } else {
                    return goodKnight;
                }
            }
        });

        if ($("#config-roles-page > div.ui-content input[name='cursed']").is(':checked')) {
            var doneCurse = false;
            _.each(roles, function(role) {
                if (isGood(_, role) && doneCurse === false) {
                    role.cursed = true;
                    doneCurse = true;
                } else {
                    // I guess we can say that evil roles are always not cursed.
                    role.cursed = false;
                }
            });
        }

        // key = player name, value = role object
        playerRoles = _.zip(players, _.shuffle(roles));
        console.log('assigning player roles:' + JSON.stringify(playerRoles));

        // setup the show-roles-page with the first player
        setupShowRolesPage(0);
    }

    function setupShowRolesPage(playerIndex) {
        $('#show-roles-img').attr('src', 'images-1/blank.png');
        $('#show-roles-player-name').text(playerRoles[playerIndex][0]);
        $('#show-roles-role-name').hide();
        $('#show-roles-detail').hide();
        $('#show-roles-ready-button').hide();
        $('#show-roles-reveal-button').show().off().on('click', function() {
            $('#show-roles-reveal-button').hide();
            $('#show-roles-img').attr('src', playerRoles[playerIndex][1].imgUrl);
            $('#show-roles-role-name').show().html(
                (isCursed(_, playerRoles[playerIndex][1])
                    ? '<span class="evilRoleHighlight">Cursed</span> '
                    : '') 
                + playerRoles[playerIndex][1].name);
            $('#show-roles-detail').show().html(playerRoles[playerIndex][1].detailFn(_, playerRoles, playerRoles[playerIndex]));
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
            }, 3000);
        });
    }

    function showStartingPlayerPage() {
        $('body').pagecontainer('change', '#starting-player-page');
        $('#starting-player-name').text(_.shuffle(players)[0]);
        var roleContent = _.chain(roles)
                           .map(function(role) {return role.name;})
                           .sort()
                           .join('<br/>')
                           .value();
        $('#reveal-roles').html(roleContent);
    }

    $('#end-of-game-button').on('click', function() {
        $stats = $('#end-of-game-stats').empty();
        _.each(playerRoles, function(playerRole) {
            $stats.append($('<li>')
                .text(playerRole[0]
                    + ': '
                    + (isCursed(_, playerRole[1])
                        ? 'Cursed '
                        : '')
                    + playerRole[1].name));
        });
    });
}

define(["jquery", "underscore", "jquery-mobile", "jquery-ui"], function($, _) {
    var jQuery = $;
    // Manually execute touch-punch
    // See http://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.2/jquery.ui.touch-punch.min.js
    // for license and source.
    (function(b){b.support.touch="ontouchend" in document;if(!b.support.touch){return;}var c=b.ui.mouse.prototype,e=c._mouseInit,a;function d(g,h){if(g.originalEvent.touches.length>1){return;}g.preventDefault();var i=g.originalEvent.changedTouches[0],f=document.createEvent("MouseEvents");f.initMouseEvent(h,true,true,window,1,i.screenX,i.screenY,i.clientX,i.clientY,false,false,false,false,0,null);g.target.dispatchEvent(f);}c._touchStart=function(g){var f=this;if(a||!f._mouseCapture(g.originalEvent.changedTouches[0])){return;}a=true;f._touchMoved=false;d(g,"mouseover");d(g,"mousemove");d(g,"mousedown");};c._touchMove=function(f){if(!a){return;}this._touchMoved=true;d(f,"mousemove");};c._touchEnd=function(f){if(!a){return;}d(f,"mouseup");d(f,"mouseout");if(!this._touchMoved){d(f,"click");}a=false;};c._mouseInit=function(){var f=this;f.element.bind("touchstart",b.proxy(f,"_touchStart")).bind("touchmove",b.proxy(f,"_touchMove")).bind("touchend",b.proxy(f,"_touchEnd"));e.call(f);};})(jQuery);

    // main
    $(function(){main($, _);});
});
