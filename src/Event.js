import React, { Component } from 'react';
import './Event.css'

class Event extends Component {
  gCalLink(event) {
    const name = encodeURIComponent(`${event.agency} - ${event.name}`);
    const start = event.start;
    const end = event.end;
    const dateString = encodeURIComponent(`${start.format('YYYYMMDD')}T${start.format('HHmmss')
      }Z/${end.format('YYYYMMDD')}T${end.format('HHmmss')}Z`);
    let link = `https://www.google.com/calendar/event?action=TEMPLATE&dates=${dateString}&text=${name}`;

    if (event.location.name) {
      link += `&location=${encodeURIComponent(event.location.name)}`;
    }
    if (event.sources.length > 0) {
      link += `&details=${encodeURIComponent(event.sources[0].url)}`;
    }
    return link;
  }

  render() {
    const event = this.props.event;
    let classNames = 'Event';
    if (this.props.selected) {
      classNames += ' selected';
    }
    let source = '';
    if (event.sources.length > 0) {
      source = <p className="card-footer-item">
        <a href={event.sources[0].url} target="_blank">
            View On Agency Site
          </a>
        </p>;
    }
    return (
      <div className={classNames} style={this.props.style}>
        <div className='card'>
          <div className='card-content'>
            <h4 className='title is-4'>{event.agency}</h4>
            <h5 className='subtitle'>{event.name}</h5>
            <p className='date'>{event.start.format('dddd, MMMM Do, YYYY')}<br/>{event.start.format('h:mma')}</p>
            <p className='location'>
              <span className='tag is-white'>Location</span> {event.location.name}
            </p>
          </div>
          <footer className='card-footer'>
            {source}
            <p className='card-footer-item'><a href={this.gCalLink(event)} target='_blank'>Add to Google Calendar</a></p>
          </footer>
        </div>
      </div>
    );
  }
}

export default Event;
