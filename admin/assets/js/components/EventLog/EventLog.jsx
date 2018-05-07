import axios from "axios";

class EventLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }
  componentWillMount() {
    this.fetchEvents();
  }
  fetchEvents() {
    axios.get(`http://localhost:8080/api/event`).then(res => {
      this.setState({
        events: res.data
      });
    });
  }
  render() {
    const eventItems = this.state.events.map(event => {
      return (
        <tr key={event._id}>
          <td>{ event.level }</td>
          <td>{ event.event }</td>
          <td>{ event.note }</td>
          <td>{ event.timestamp }</td>
        </tr>
      );
    });
    return (
      <div className="monitor card">
        <header className="card-header">
          <p className="card-header-title">Event Log</p>
          <a href="#" className="card-header-icon" aria-label="more options">
            <span className="icon">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </a>
        </header>
        <div className="card-content">
          <div className="content">
            <table className="table">
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Event</th>
                  <th>Note</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>{eventItems}</tbody>
            </table>
          </div>
        </div>
        <footer className="card-footer">
          <a href="#" className="card-footer-item">
            Save
          </a>
          <a href="#" className="card-footer-item">
            Edit
          </a>
          <a href="#" className="card-footer-item">
            Delete
          </a>
        </footer>
      </div>
    );
  }
}

export default EventLog;
