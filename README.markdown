# gaTrack.js
Automatically add bindings to fire Google Analytics tracking

## Defaults
| Attribute      | Default       | Description
| ---------------|:-------------:|------------------:|
|class:          |ga-track       |all elements with this class will havehandlers attached on DOM ready
|data-ga-binding:|click          |the binding on which to fire the tracking
|data-ga-event:  |_trackEvent    |the analytics event send to Google
|data-ga-data:   |(the binding)  |a comma-sparated list of properties toinclude with the event

## Example

e.g. `<a class='ga-track'></a>`

This will attach a click handler to the link tag,
triggering `_gaq.push(['_trackEvent','click'])`

That's pretty useless, so let's add some more stuff!

`<a class='ga-track' data-ga-data='bubbles, billionaire' data-ga-bind='hover'/a>`

This will attach a hover handler to the link tag,
triggering `_gaq.push(['_trackEvent','bubbles', 'billionaire'])`

## Type Checking

The Google Analytics documentation specifies the areguments passed into
any call to trackEvent:

`_trackEvent(category, action, opt_label, opt_value, opt_noninteraction)`

category, action, and the optional label are all strings. Since data
attributes are strings anyway, you don't need to worry about these.

the optional value parameter is an integer, and $.gaTrack will throw an
error if you try to supply something else.

Similarly, the optional non-interation value (which, if set to true
indicates that the event hit will not be used in bounce-rate calculation)
must be a boolean. Pass in anything other that 'true' or 'false' and an
error will be raised.


## AJAX

If you are loading elements after DOM-ready, you can add a class to them d call
`$.gaTrack([array,of,jquery,selectors])` and it will take care of the rest!


NOTE: If you are attaching tracking to an element surrounding a link or her element
which will not propagate events, the tracking will not fire. For example:

```
<li id='cant-track-this' class='ga-track' data-ga-data='Click, SomewhereElse'>
  <a href='/somewhere-else'>I wish I could be tracked...</a>
</li>
```
Clicking the a tag will not propagate the click event because it leaves the page
