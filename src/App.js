import React, { Component } from 'react';
import moment from 'moment-timezone';
import axios from 'axios';
import BigCalendar from 'react-big-calendar';
import Select from 'react-select';
import { AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { debounce } from 'throttle-debounce';

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
      fixedWidth: true, minHeight: 350
    });
    window.addEventListener('resize', () => this._cache.clearAll());

    this.handleSearchInput = debounce(500, this.handleSearchInput);
    this.state = {
      events: [],
      regionValue: [],
      agencyValue: [],
      monthValue: [],
      yearValue: [],
      searchInput: undefined,
      selected: undefined
    };
  }

  componentDidMount() {
    const today = new Date();
    const monthStart = moment([today.getFullYear(), today.getMonth(), 1]);
    axios(config.EVENT_SOURCE)
      .then(res => {
        let data = res.data.split('\n').map(JSON.parse);
        const events = data.map((e, i) => {
          e.start = moment.tz(e.start_time, e.timezone);
          e.end = e.end_time ? moment.tz(e.end_time, e.timezone) : e.start.add(1, 'hours');
          const agency = config.AGENCY_OPTIONS.find(a => a.value === e.id.split('/')[0]);
          if (agency) { e.agency = agency.label; }
          e.title = `${e.agency} - ${e.name}: ${e.start.format('YYYY MM DD')}`
          return e;
        }).filter(e => e.start >= monthStart
        ).sort((a, b) => a.start.toDate() - b.start.toDate());
        this.setState({ events });
      });
  }

  handleSelectChange(stateObj) {
    this.setState(stateObj);
    this._cache.clearAll();
  }

  handleSelectEvent(event) {
    // Scrolling to an event, and then un-setting the selection for scroll
    this.setState({ selected: event.id }, () => {
      setTimeout(() => this.setState({ selected: undefined }), 1000);
    });
  }

  handleSearchInput(searchInput) {
    this.setState({ searchInput });
    this._cache.clearAll();
  }

  filteredEvents(allEvents) {
    let events = allEvents;
    if (this.state.regionValue.length) {
      const regions = this.state.regionValue.map(v => v.value);
      events = events.filter(e => regions.includes(e.id.split('_')[0]));
    }
    if (this.state.agencyValue.length) {
      const agencies = this.state.agencyValue.map(v => v.label);
      events = events.filter(e => agencies.includes(e.agency));
    }
    if (this.state.monthValue.length) {
      const months = this.state.monthValue.map(v => v.value);
      events = events.filter(e => months.includes(e.start.get('month')));
    }
    if (this.state.yearValue.length) {
      const years = this.state.yearValue.map(v => v.value);
      events = events.filter(e => years.includes(e.start.get('year')));
    }

    const input = this.state.searchInput ? this.state.searchInput.trim().toLowerCase() : undefined;
    if (input) {
      events = events.filter(e => {
        return [e.agency, e.name, e.description].join(' ').toLowerCase().includes(input);
      });
    }
    return events;
  }

  render() {
    const events = this.filteredEvents(this.state.events);
    const selectedIndex = events.findIndex(e => e.id === this.state.selected);

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
              <a href={config.EVENT_SOURCE} className='is-pulled-right'>Download Source Data</a>
            </header>
            <div className="columns">
              <div className="events-panel column is-one-half">
                <div className='events-panel-container'>
                  <div className="controls columns is-gapless is-multiline is-mobile">
                    <div className='column is-one-half'>
                      <input
                        className="input"
                        type="text"
                        placeholder="Search names and descriptions"
                        onChange={(event) => this.handleSearchInput(event.target.value)} />
                    </div>
                    <div className='column is-one-half'>
                      <Select
                        closeOnSelect={false}
                        multi
                        onChange={(val) => this.handleSelectChange({ regionValue: val })}
                        placeholder="Select regions"
                        options={config.REGION_OPTIONS}
                        value={this.state.regionValue}
                      />
                    </div>
                    <div className='column is-full'>
                      <Select
                        closeOnSelect={false}
                        multi
                        onChange={(val) => this.handleSelectChange({ agencyValue: val })}
                        placeholder="Select agencies"
                        options={config.AGENCY_OPTIONS}
                        value={this.state.agencyValue}
                      />
                    </div>
                    <div className='column is-one-half'>
                      <Select
                        closeOnSelect={false}
                        multi
                        onChange={(val) => this.handleSelectChange({ monthValue: val })}
                        placeholder='Select month(s)'
                        options={config.MONTH_OPTIONS}
                        value={this.state.monthValue}
                      />
                    </div>
                    <div className='column is-one-half'>
                      <Select
                        closeOnSelect={false}
                        multi
                        onChange={(val) => this.handleSelectChange({ yearValue: val })}
                        placeholder='Select year(s)'
                        options={config.YEAR_OPTIONS}
                        value={this.state.yearValue}
                      />
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
              <div className="calendar column is-one-half is-hidden-touch">
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
