from ics import Calendar
import requests

url = "https://urlab.be/events/urlab.ics"
c = Calendar(requests.get(url).text)

c
# <Calendar with 118 events and 0 todo>
c.events
# {<Event 'Visite de "Fab Bike"' begin:2016-06-21T15:00:00+00:00 end:2016-06-21T17:00:00+00:00>,
# <Event 'Le lundi de l'embarqué: Adventure in Espressif Non OS SDK edition' begin:2018-02-19T17:00:00+00:00 end:2018-02-19T22:00:00+00:00>,
#  ...}
e = list(c.timeline)[0]
"Event '{}' started {}".format(e.name, e.begin.humanize())
# "Event 'Workshop Git' started 2 years ago"