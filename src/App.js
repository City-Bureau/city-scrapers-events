import React, { useState, useEffect, useMemo } from "react"
import moment from "moment-timezone"
import { Calendar, momentLocalizer } from "react-big-calendar"
import Select from "react-select"
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized"

import "bulma/css/bulma.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "react-virtualized/styles.css"
import "./App.css"
import logo from "./logo.png"

import config from "./config"
import Event from "./Event"
import { useDebounce } from "./hooks"

const localizer = momentLocalizer(moment)

const applyFilters = ({ allEvents, region, agency, month, year, search }) => {
  let events = allEvents
  if (region.length) {
    events = events.filter(({ extra, extras }) =>
      region.includes((extra || extras)["cityscrapers.org/id"].split("_")[0])
    )
  }
  if (agency.length) {
    events = events.filter(({ agency: evtAgency }) =>
      agency.includes(evtAgency)
    )
  }
  if (month.length) {
    events = events.filter(({ start }) => month.includes(start.get("month")))
  }
  if (year.length) {
    events = events.filter(({ start }) => year.includes(start.get("year")))
  }
  if (search.trim()) {
    const searchVal = search.trim().toLowerCase()
    events = events.filter(({ agency, name, description }) =>
      [agency, name, description].join(" ").toLowerCase().includes(searchVal)
    )
  }
  return events
}

// Fetch and parse newline-delimited JSON of events
const loadEvents = () =>
  fetch(config.EVENT_SOURCE)
    .then((res) => res.text())
    .then((text) =>
      text
        .split("\n")
        .filter((l) => l.trim())
        .map(JSON.parse)
        .map((event) => ({
          ...event,
          agency: (event.extras || event.extra)["cityscrapers.org/agency"],
          start: moment.tz(event.start_time, event.timezone),
          end: moment.tz(event.end_time, event.timezone),
        }))
        .sort((a, b) => a.start.toDate() - b.start.toDate())
    )

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [cache, setCache] = useState(
    new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 200,
    })
  )
  const [loading, setLoading] = useState(true)
  const [allEvents, setAllEvents] = useState([])
  const [agencies, setAgencies] = useState([])
  const [selected, setSelected] = useState(null)
  const [filters, setFilters] = useState({
    region: [],
    agency: [],
    month: [],
    year: [],
  })
  const [searchValue, setSearchValue] = useState(``)
  const debouncedSearchValue = useDebounce(searchValue, 500)

  const events = useMemo(
    () => applyFilters({ allEvents, ...filters, search: debouncedSearchValue }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      allEvents,
      filters.region,
      filters.agency,
      filters.month,
      filters.year,
      debouncedSearchValue,
    ]
  )
  const selectedIndex = useMemo(
    () =>
      events.findIndex(
        ({ extra, extras }) =>
          (extra || extras)["cityscrapers.org/id"] === selected
      ),
    [events, selected]
  )

  useEffect(() => {
    const clearCache = () => cache.clearAll()
    window.addEventListener("resize", clearCache)

    loadEvents().then((results) => {
      setAllEvents(results)
      setAgencies(
        [...new Set(results.map(({ agency }) => agency))].map((agency) => ({
          label: agency,
          value: agency,
        }))
      )
      setLoading(false)
    })

    return () => {
      window.removeEventListener("resize", clearCache)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (selected) {
      setTimeout(() => setSelected(null), 1000)
    }
  }, [selected])

  const rowRenderer = ({ index, key, parent, style }) => {
    const event = events[index]

    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        {() => (
          <Event
            event={event}
            selected={index === selectedIndex}
            style={style}
          ></Event>
        )}
      </CellMeasurer>
    )
  }

  const loader = loading ? (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : (
    ""
  )

  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <header className="App-header">
            <img src={logo} alt="City Bureau logo" />
            <h1 className="title">City Scrapers Events</h1>
            <a href={config.EVENT_SOURCE} className="is-pulled-right">
              Download Source Data
            </a>
          </header>
          <div className="columns">
            <div className="events-panel column is-one-half">
              <div className="events-panel-container">
                <div className="controls columns is-gapless is-multiline is-mobile">
                  <div className="column is-one-half">
                    <input
                      className="input"
                      type="text"
                      placeholder="Search names and descriptions"
                      onChange={
                        (evt) => setSearchValue(evt.target.value)
                        // setFilters({ ...filters, search: evt.target.value })
                      }
                    />
                  </div>
                  <div className="column is-one-half">
                    <Select
                      closeMenuOnSelect={false}
                      isClearable
                      isMulti
                      onChange={(region) =>
                        setFilters({
                          ...filters,
                          region: (region || []).map(({ value }) => value),
                        })
                      }
                      placeholder="Select regions"
                      options={config.REGION_OPTIONS}
                      value={config.REGION_OPTIONS.filter(({ value }) =>
                        filters.region.includes(value)
                      )}
                    />
                  </div>
                  <div className="column is-full">
                    <Select
                      closeMenuOnSelect={false}
                      isClearable
                      isMulti
                      onChange={(agency) =>
                        setFilters({
                          ...filters,
                          agency: (agency || []).map(({ value }) => value),
                        })
                      }
                      placeholder="Select agencies"
                      options={agencies}
                      value={agencies.filter(({ value }) =>
                        filters.agency.includes(value)
                      )}
                    />
                  </div>
                  <div className="column is-one-half">
                    <Select
                      closeMenuOnSelect={false}
                      isClearable
                      isMulti
                      onChange={(months) =>
                        setFilters({
                          ...filters,
                          month: (months || []).map(({ value }) => value),
                        })
                      }
                      placeholder="Select month(s)"
                      options={config.MONTH_OPTIONS}
                      value={config.MONTH_OPTIONS.filter(({ value }) =>
                        filters.month.includes(value)
                      )}
                    />
                  </div>
                  <div className="column is-one-half">
                    <Select
                      closeOnSelect={false}
                      isClearable
                      isMulti
                      onChange={(years) =>
                        setFilters({
                          ...filters,
                          year: (years || []).map(({ value }) => value),
                        })
                      }
                      placeholder="Select year(s)"
                      options={config.YEAR_OPTIONS}
                      value={config.YEAR_OPTIONS.filter(({ value }) =>
                        filters.year.includes(value)
                      )}
                    />
                  </div>
                </div>
                <div className="events-scroll-panel">
                  {loader}
                  <AutoSizer>
                    {({ height, width }) => (
                      <List
                        width={width}
                        height={height}
                        rowCount={events.length}
                        deferredMeasurementCache={cache}
                        rowHeight={cache.rowHeight}
                        rowRenderer={rowRenderer}
                        scrollToAlignment="start"
                        scrollToIndex={selectedIndex}
                      />
                    )}
                  </AutoSizer>
                </div>
              </div>
            </div>
            <div className="calendar column is-one-half is-hidden-touch">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor={({ start }) => start.toDate()}
                endAccessor={({ end }) => end.toDate()}
                titleAccessor="name"
                defaultDate={new Date()}
                selectable
                onSelectEvent={({ extra, extras }) =>
                  setSelected((extra || extras)["cityscrapers.org/id"])
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default App
