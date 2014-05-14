'use strict';

var View = require('./view'),
    DayEvent = require('./day_event');

function MonthDay() {
  View.apply(this, arguments);
}
module.exports = MonthDay;

MonthDay.prototype = {
  __proto__: View.prototype,

  selector: '#months-day-view',

  get container() {
    return this.findElement('#event-list');
  },

  get events() {
    return this.findElements('.event').map(function(el) {
      return new DayEvent(this.client, el);
    }, this);
  },

  get date() {
    return this
      .findElement('#event-list-date')
      .text();
  },

  getTitle: function(event) {
    return event
      .findElement('h5')
      .text();
  },

  getLocation: function(event) {
    return event
      .findElement('.location')
      .text();
  },

  getStartHour: function(event) {
    var section = this.client.helper
      .closest(event, '.hour');
    return section
      .findElement('.display-hour')
      .text();
  },

  /**
   * If event is not specified, we'll use today's first event.
   */
  scrollToEvent: function(event) {
    if (!event) {
      event = this.events[0];
    } else if (typeof event === 'number') {
      event = this.events[event];
    }

    event.scriptWith(function(element) {
      var container = document.getElementById('event-list');
      container.scrollTop = element.offsetTop;
    });
  }
};
