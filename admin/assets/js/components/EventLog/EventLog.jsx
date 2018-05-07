import axios from "axios";
import moment from "moment";

class EventLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      sort: {
        by: 'timestamp',
        desc: 1,
      },
      events: []
    };
  }
  componentWillMount() {
    this.fetchEvents();
  }
  fetchEvents() {
    return new Promise((resolve, reject) => {
      axios.get(`${ process.env.API_HOST }/event`).then(res => {
        this.setState({
          events: res.data,
          loading: false
        });
        this.sortBy(this.state.sort.by, this.state.sort.desc);
        resolve();
      }, (err) => {
        reject();
      });
    });
  }
  sortBy(prop, desc = false) {
    let sorted = null;
    if (desc) {
      sorted = this.state.events.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
    } else {
      sorted = this.state.events.sort((a, b) => {
        return new Date(a.timestamp) - new Date(b.timestamp);
      });
    }
    this.setState({
      events: sorted
    });
  }
  handleReloadClick(e) {
    e.preventDefault();
    if (!this.state.loading) {
      this.setState({
        loading: true
      });
      this.fetchEvents();
    } else {
    }
  }
  handleSortClick(e) {
    e.preventDefault();
    if (this.state.sort.desc) {
      this.sortBy("timestamp", false);
      this.setState({
        sort: {
          desc: 0,
        },
      });
    } else {
      this.sortBy('timestamp', true);
      this.setState({
        sort: {
          desc: 1,
        },
      });
    }
  }
  render() {
    const eventItems = this.state.events.map(event => {
      return (
        <tr key={event._id}>
          <td>{event.level}</td>
          <td>{event.event}</td>
          <td>{event.note}</td>
          <td>{moment(event.timestamp).format("YYYY-MM-DD HH:mm:ss")}</td>
        </tr>
      );
    });
    return (
      <div className="monitor card">
        <header className="card-header">
          <p className="card-header-title">Event Log</p>
          <a
            href="#"
            className="card-header-icon"
            aria-label="more options"
            onClick={this.handleReloadClick.bind(this)}
          >
            <span className="icon">
              <i
                className={
                  "fas fa-sync-alt " + (this.state.loading ? "fa-spin" : "")
                }
                aria-hidden="true"
              />
            </span>
          </a>
        </header>
        <div className="card-content">
          <div className="content">
            <table className="table table is-striped table is-narrow table is-hoverable">
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Event</th>
                  <th>Note</th>
                  <th>
                    <a
                      href="#"
                      onClick={this.handleSortClick.bind(this)}
                    >
                      Timestamp &nbsp;
                      { (this.state.sort.desc) ? (
                        <i className="fas fa-caret-down"></i>
                      ) : (
                        <i className="fas fa-caret-up"></i>
                      ) }
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody>{eventItems}</tbody>
            </table>
          </div>
        </div>
        <footer className="card-footer" />
      </div>
    );
  }
}

export default EventLog;
