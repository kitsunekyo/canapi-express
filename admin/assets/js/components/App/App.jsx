import Header from "./../Header/Header.jsx";
import Dashboard from "./../Dashboard/Dashboard.jsx";

class App extends React.Component {
  render() {
    return (
      <div className="app-wrapper">
        <Header />
        <div className="site-content">
          <div className="container">
            <Dashboard />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
