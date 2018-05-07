import axios from "axios";

class Pump extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watering: false,
      progress: 0
    };
  }
  handleWaterClick(e) {
    e.preventDefault();
    if (!this.state.watering) {
      this.sendWater();
    }
  }
  handleStopClick(e) {
    e.preventDefault();
    this.stopPump();
  }
  sendWater() {
    this.setState({
      watering: true
    });
    axios.post(`http://localhost:8080/api/pump/water`).then(res => {
      this.runProgress()
        .then(() => {
          this.setState({
              watering: false
          });
        });
    });
  }
  runProgress() {
    return new Promise((resolve, reject) => {
      let __progress = this.state.progress;
      const interval = setInterval(() => {
        if (this.state.progress >= 100) {
          clearInterval(interval);
          this.setState({
            progress: 0,
          });
          resolve();
        } else {
          __progress++;
          this.setState({
            progress: __progress,
          });
        }
      }, 50);
    });
  }
  stopPump() {
    axios.post(`http://localhost:8080/api/pump/off`).then(res => {
      this.setState({
        watering: false
      });
    });
  }
  render() {
    return (
      <div className="pump card">
        <header className="card-header">
          <p className="card-header-title">Pump</p>
          <a href="#" className="card-header-icon" aria-label="more options">
            <span className="icon">
              <i className={"fas fa-sync-alt"} aria-hidden="true" />
            </span>
          </a>
        </header>
        <div className="card-content">
          <div className="content">
            <h1>pump status</h1>
            {this.state.watering ? (
              <div>
                <span>watering is in progress...</span>
                <progress
                  className="progress is-primary"
                  value={this.state.progress}
                  max="100"
                />
              </div>
            ) : null}
          </div>
        </div>
        <footer className="card-footer">
          <a
            href="#"
            className="card-footer-item"
            onClick={this.handleWaterClick.bind(this)}
          >
            Water
          </a>
          <a
            href="#"
            className="card-footer-item"
            onClick={this.handleStopClick.bind(this)}
          >
            Power Off
          </a>
        </footer>
      </div>
    );
  }
}

export default Pump;
