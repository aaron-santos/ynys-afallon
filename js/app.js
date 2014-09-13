requirejs.config({
    "baseUrl": "js/lib",
    //"urlArgs": "bust=" + (new Date()).getTime(),
    "paths": {
      "app": "../app",
      "jquery": "http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min",
      "jquery-mobile": "http://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.3/jquery.mobile.min",
      "jquery-ui": "http://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min",
      "jquery-ui-touch-punch": "http://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.2/jquery.ui.touch-punch.min",
      "underscore": "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min"
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);

