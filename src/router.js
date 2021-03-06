var $ = require('jquery');
var Backbone = require('backbone');

Backbone.$ = $;

var Router = Backbone.Router.extend({
    state: null,

    routes: {
        ':locality/:tab': 'index',
    },

    initialize: function (options) {
        this.state = options.state;
    },

    index: function (locality, tab) {
        this.state.set({
            locality: locality,
            tab: tab,
        });
    }
});

module.exports = Router;
