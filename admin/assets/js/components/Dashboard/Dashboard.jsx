import Monitor from "./../Monitor/Monitor.jsx";
import EventLog from "./../EventLog/EventLog.jsx";
import Pump from "./../Pump/Pump.jsx";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <div className="columns">
          <div className="column">
            <Monitor />
          </div>
          <div className="column">
            <EventLog />
          </div>
        </div>
        <div className="columns">
          <div className="column is-narrow">
            <Pump />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
