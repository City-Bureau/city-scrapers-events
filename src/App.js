import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import BigCalendar from 'react-big-calendar';
import Select from 'react-select';
import { AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';

import 'bulma/css/bulma.css'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import './App.css';
import logo from './logo.png';

import config from './config';
import Event from './Event';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class App extends Component {
  constructor(props) {
    super(props);

    this._cache = new CellMeasurerCache({
      fixedWidth: true, minHeight: 25
    });
    window.addEventListener('resize', () => this._cache.clearAll());

    this.state = {
      events: [],
      agencyOptions: [],
      agencyValue: [],
      monthValue: [],
      yearValue: [],
      selected: undefined
    };
  }

  componentDidMount() {
    axios(config.eventSource)
      .then(res => {
        let data = res.data;
        let startEvents = data;
        for (let i = 0; i < 25; ++i) {
          startEvents = startEvents.concat(data);
        }
        const events = startEvents.map((e, i) => {
          e.idx = i;
          e.start = moment(e.fields.start_time);
          e.end = e.fields.end_time ? moment(e.fields.end_time) : e.start.add(1, 'hours');
          e.title = `${e.fields.agency_name}${e.fields.name ? `- ${e.fields.name}` : ''
            }: ${e.start.format('YYYY MM DD')}`
          return e;
        }).sort((a, b) => a.start.toDate() - b.start.toDate());

        const agencyOptions = [...new Set(events.map(e => e.fields.agency_name))].map(e => {
          return { label: e, value: e };
        });
        this.setState({ events, agencyOptions });
      });
  }

  handleChangeAgency(agencyValue) {
    this.setState({ agencyValue });
    this._cache.clearAll();
  }

  handleChangeMonth(monthValue) {
    this.setState({ monthValue });
    this._cache.clearAll();
  }

  handleChangeYear(yearValue) {
    this.setState({ yearValue });
    this._cache.clearAll();
  }

  handleSelectEvent(event) {
    // Scrolling to an event, and then un-setting the selection for scroll
    this.setState({ selected: event.idx }, () => {
      setTimeout(() => this.setState({ selected: undefined }), 1000);
    });
  }

  filteredEvents() {
    let events = this.state.events;
    if (this.state.agencyValue.length) {
      const agencies = this.state.agencyValue.map(v => v.value);
      events = events.filter(e => agencies.includes(e.fields.agency_name));
    }
    if (this.state.monthValue.length) {
      const months = this.state.monthValue.map(v => v.value);
      events = events.filter(e => months.includes(e.start.getMonth()));
    }
    if (this.state.yearValue.length) {
      const years = this.state.yearValue.map(v => v.value);
      events = events.filter(e => years.includes(e.start.getFullYear()));
    }
    return events;
  }

  render() {
    const events = this.filteredEvents();
    const selectedIndex = events.findIndex(e => e.idx === this.state.selected);

    const rowRenderer = ({ index, key, parent, style }) => {
      const event = events[index];

      return (
        <CellMeasurer
          cache={this._cache}
          columnIndex={0}
          key={key}
          rowIndex={index}
          parent={parent}>
          {({ measure }) => (
            <Event event={event} selected={index === selectedIndex} style={style}></Event>
          )}
        </CellMeasurer>
      );
    }

    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <header className="App-header">
              <img src={logo} alt='City Bureau logo' />
              <h1 className="title">City Scrapers Events</h1>
              <a href={config.eventSource} className='is-pulled-right'>Download Source Data</a>
            </header>
            <div className="columns">
              <div className="events-panel column is-one-half">
                <div className='events-panel-container'>
                  <div className="controls">
                    <Select
                      closeOnSelect={false}
                      multi
                      onChange={this.handleChangeAgency.bind(this)}
                      placeholder="Select agencies"
                      options={this.state.agencyOptions}
                      value={this.state.agencyValue}
                    />
                    <div className='columns'>
                      <div className='column is-one-half'>
                        <Select
                          closeOnSelect={false}
                          multi
                          onChange={this.handleChangeMonth.bind(this)}
                          placeholder='Select month(s)'
                          options={config.MONTH_OPTIONS}
                          value={this.state.monthValue}
                        />
                      </div>
                      <div className='column is-one-half'>
                        <Select
                          closeOnSelect={false}
                          multi
                          onChange={this.handleChangeYear.bind(this)}
                          placeholder='Select year(s)'
                          options={config.YEAR_OPTIONS}
                          value={this.state.yearValue}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="events-scroll-panel">
                    <AutoSizer>
                      {({ height, width}) => (
                        <List
                          width={width}
                          height={height}
                          rowCount={events.length}
                          deferredMeasurementCache={this._cache}
                          rowHeight={this._cache.rowHeight}
                          rowRenderer={rowRenderer}
                          scrollToAlignment='start'
                          scrollToIndex={selectedIndex}
                        />
                      )}
                    </AutoSizer>
                  </div>
                </div>
              </div>
              <div className="calendar column is-one-half is-hidden-mobile">
                <BigCalendar
                  events={events}
                  startAccessor={(e) => e.start.toDate()}
                  endAccessor={(e) => e.end.toDate()}
                  titleAccessor='title'
                  defaultDate={new Date()}
                  selectable
                  onSelectEvent={this.handleSelectEvent.bind(this)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
