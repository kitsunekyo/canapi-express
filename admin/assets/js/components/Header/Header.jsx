class Header extends React.Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <a href="#" className="navbar-item">
              <img src="/img/logo-landscape.png" alt="logo" />
            </a>
            <a
              className="navbar-burger"
              role="button"
              aria-label="menu"
              aria-expanded="false"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>
          <div className="navbar-menu" />
        </div>
      </nav>
    );
  }
}

export default Header;
