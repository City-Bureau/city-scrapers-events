import React, { Component } from 'react';
import moment from 'moment';
import './Event.css'

class Event extends Component {
  gCalLink(event) {
    const name = encodeURIComponent(event.fields.name ? event.fields.name : event.fields.agency_name);
    const start = event.start;
    const end = event.end;
    const dateString = encodeURIComponent(`${start.format('YYYYMMDD')}T${start.format('HHmmss')
      }Z/${end.format('YYYYMMDD')}T${end.format('HHmmss')}Z`);
    let link = `https://www.google.com/calendar/event?action=TEMPLATE&dates=${dateString}&text=${name}`;

    if (event.fields.location_name) {
      link += `&location=${encodeURIComponent(event.fields.location_name)}`;
    }
    if (event.fields.description) {
      link += `&details=${encodeURIComponent(event.fields.description)}`;
    }
    return link;
  }

  render() {
    const event = this.props.event;
    const startTime = moment(event.start);
    let classNames = 'Event';
    if (this.props.selected) {
      classNames += ' selected';
    }
    return (
      <div className={classNames} style={this.props.style}>
        <div className='card'>
        {/* TODO: Fix properties */}
          <div className='card-content'>
            <h4 className='title is-4'>{event.fields.agency_name}</h4>
            <h5 className='subtitle'>{event.fields.name ? event.fields.name : ''}</h5>
            <p className='date'>{startTime.format('dddd, MMMM Do, YYYY')}<br/>{startTime.format('h:mma')}</p>
            <br />
            <p className='description'>
              <span className='tag is-white'>Description</span> {event.fields.description}
            </p>
            <p className='location'>
              <span className='tag is-white'>Location</span> {event.fields.location_name}
            </p>
          </div>
          <footer className='card-footer'>
            {/* TODO: Add link to agency site */}
            <p className='card-footer-item'><a href=''>View On Agency Site</a></p>
            <p className='card-footer-item'><a href={this.gCalLink(event)}>Add to Google Calendar</a></p>
          </footer>
        </div>
      </div>
    );
  }
}

export default Event;
