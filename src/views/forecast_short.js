var Backbone = require('backbone'),
    forecastShortTemplate = require('../templates/forecast_short.hbs');

var ForecastShortView = Backbone.View.extend({

    initialize: function () {

        console.log(this.collection);
        this.render();
    },

    render: function() {
        var output = '',
            modelDate,
            parts,
            dayInfo, nightInfo,
            tomorrow = new Date().getDate() + 1;
        this.collection.each(function(mod) {
            parts = mod.get('parts_short');
            modelDate = mod.get('date').getDate();
            if (modelDate < tomorrow) {
                return;
            }
            mod.set({
                isTomorrow: modelDate === tomorrow,
                isFirstDayOfWeek: mod.get('date').getDay() === 1
            });

            for (var i = parts.length;i--;) {
                switch (parts[i].type) {
                    case 'day_short': dayInfo = parts[i]; break;
                    case 'night_short': nightInfo = parts[i]; break;
                }
            }
            output += forecastShortTemplate({
                model: mod.toJSON(),
                dayInfo: dayInfo,
                nightInfo: nightInfo
            });
        });
        this.$el.html(output);
    }
});

module.exports = ForecastShortView;
