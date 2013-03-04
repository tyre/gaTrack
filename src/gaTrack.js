$.fn.gaTrackElement = function(){
  var binding = $(this).attr('data-ga-binding') || 'click';
  //use on, unless pre jquery 1.7
  var trackingFn = $('.ga-track').on ? 'on' : 'bind';
  $(this)[trackingFn](binding, function(evnt){
    var element = $(this);
    var gaEvent = element.attr('data-ga-event') || '_trackEvent';
    var gaData = element.attr('data-ga-data');
    if(gaData.length){
      gaData = gaData.split(/,\s*/);
      if(gaData.length > 3){
        gaData[3] = stringToInteger(gaData[3]);
        if(gaData.length > 4){
          gaData[4] = stringToBoolean(gaData[4]);
        }
      }
    } else {
      gaData = [binding];
    }
    gaData.unshift(gaEvent);
    _gaq.push(gaData);
  });
};

function stringToInteger(str, base) {
  base = base || 10;
  integer = parseInt(str, base);
  if(isNaN(integer)) {
    throw new Error('Expected string ' + str + ' to be an integer.');
  } else {
    return integer;
  }
}

function stringToBoolean(str) {
  if(str == 'true'){
    return true;
  } else if(str == 'false') {
    return false;
  } else {
    throw new Error('Expected string ' + str + ' to be true or false.');
  }
}

$.gaTrack = function(selectors){
  _gaq = _gaq || [];
  for (var i = selectors.length - 1; i >= 0; i--) {
    var selector = selectors[i];
    var trackedElements = $(selector);
    for (var j = trackedElements.length - 1; j >= 0; j--) {
      var elem = $(trackedElements[j]).gaTrackElement();
    }
  }
};

$(function(){$.gaTrack(['.ga-track']);});
