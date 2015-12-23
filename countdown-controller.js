(function() {
  moment.locale(SETTINGS.locale);

  var now = moment();

  // Read settings and create an array of possible targets.
  var targets = [];
  _.each(SETTINGS.targets, function(t) {
    targets.push(moment().day(t.weekday).hour(t.hour).minute(t.minutes).seconds(0))
  });

  // Find the nearest target.
  var targets = _.sortBy(targets, function(t) {
    if(now.isAfter(t)) {
      t.add(7, 'days');
    }
    return now.diff(t);
  })
  .reverse();

  var target = _.first(targets);

  $( '<div class="center target-time">' + target.format("dddd, MMMM Do YYYY, HH:mm:ss") + '</div>' )
  .insertAfter( '.your-clock' );

  var secondsToTarget = target.diff(now) / 1000;

  var clock = $( '.your-clock' ).FlipClock(
    secondsToTarget,
    {
      countdown: true,
      clockFace: 'MinuteCounter'
    }
  );
}());
