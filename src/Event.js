import React from "react"
import "./Event.css"

const gCalLink = ({ agency, name, start, end, location, sources }) => {
  const eventName = encodeURIComponent(`${agency} - ${name}`)
  const dateString = encodeURIComponent(
    `${start.format("YYYYMMDD")}T${start.format("HHmmss")}/${end.format(
      "YYYYMMDD"
    )}T${end.format("HHmmss")}`
  )
  return `https://www.google.com/calendar/event?action=TEMPLATE&dates=${dateString}&text=${eventName}${
    location.name ? `&location=${encodeURIComponent(location.name)}` : ``
  }${
    sources.length > 0 ? `&details=${encodeURIComponent(sources[0].url)}` : ``
  }`
}

const Event = ({ event, selected, style }) => (
  <div className={`Event ${selected ? `selected` : ``}`} style={style}>
    <div className="card">
      <div className="card-content">
        <h4 className="title is-4">{event.agency}</h4>
        <h5 className="subtitle">{event.name}</h5>
        <p className="date">
          {event.start.format("dddd, MMMM Do, YYYY")}
          <br />
          {event.start.format("h:mma")}
        </p>
        <p className="location">
          <span className="tag is-white">Location</span> {event.location.name}
        </p>
      </div>
      <footer className="card-footer">
        {event.sources.length > 0 ? (
          <p className="card-footer-item">
            <a
              href={event.sources[0].url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View On Agency Site
            </a>
          </p>
        ) : (
          ``
        )}
        <p className="card-footer-item">
          <a href={gCalLink(event)} target="_blank" rel="noopener noreferrer">
            Add to Google Calendar
          </a>
        </p>
      </footer>
    </div>
  </div>
)

export default Event
