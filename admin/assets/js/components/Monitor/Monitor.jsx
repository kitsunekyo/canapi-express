import axios from "axios";

class Monitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      status: {
        air_humidity: 0,
        air_temperature: 0,
        soil_raw_data: 0,
        soil_status: '?',
      },
    };
  }
  componentWillMount() {
    this.fetchMonitor();
  }
  fetchMonitor() {
    axios.get(`http://localhost:8080/api/status`).then(res => {
      this.setState({
        status: res.data,
        loading: false,
      });
    });
  }
  handleReloadClick(e) {
    e.preventDefault();
    if (!this.state.loading) {
      this.setState({
        loading: true,
      });
      console.log('reload');
      this.fetchMonitor();
    } else {
      console.log('nope');
    }
  }
  render() {
    return (
      <div className="monitor card">
        <header className="card-header">
          <p className="card-header-title">Monitor</p>
          <a href="#" className="card-header-icon" aria-label="more options" onClick={ this.handleReloadClick.bind(this) }>
            <span className="icon">
              <i className={'fas fa-sync-alt ' + (this.state.loading ? 'fa-spin' : '')} aria-hidden="true" />
            </span>
          </a>
        </header>
        <div className="card-content">
          <div className="content">
            <div className="monitor-segment">
              <div className="monitor-segment__value">
                { this.state.status.air_humidity } <span>%</span>
              </div>
              <div className="monitor-segment__label">Air Humidity</div>
            </div>
            <div className="monitor-segment">
              <div className="monitor-segment__value">
                { this.state.status.air_temperature } <span>°C</span>
              </div>
              <div className="monitor-segment__label">Air Temperature</div>
            </div>
            <div className="monitor-segment">
              <div className="monitor-segment__value">
                { this.state.status.soil_status }
              </div>
              <div className="monitor-segment__label">Soil</div>
            </div>
          </div>
        </div>
        <footer className="card-footer">
          <a href="#" className="card-footer-item">
            Save
          </a>
        </footer>
      </div>
    );
  }
}
export default Monitor;
