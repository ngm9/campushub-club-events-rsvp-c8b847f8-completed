const express = require('express');
const { getInitialEvents } = require('./data');

const app = express();
app.use(express.json());

let events = getInitialEvents();

app.get('/api/events', (req, res) => {
 return res.status(200).json(updatedEvents);
});

app.post('/api/events/:id/rsvp', (req, res) => {
  const id = String(req.params.id);
  const event = events.find((e) => e.id === id);

  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
   const capacity=Number(event.capacity ||0);
   const attendees=Number(event.attendees||0);
   if(attendees >=capacity){
    return res.status(409).json({
      error:'Event is full',
    });
   }
  event.attendees = attendees + 1;
  return res.status(200).json(event);
});

module.exports = app;
