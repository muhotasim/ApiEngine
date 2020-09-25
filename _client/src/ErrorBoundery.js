import React from "react";
class ErrorBoundery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      info: "",
    };
  }
  componentDidCatch(error, info) {
    this.setState({
      error: true,
      info: info,
    });
  }
  render() {
    if (this.state.error) {
      return (
        <div>
          <div
            className="alert alert-md alert-danger"
            style={{ background: "#e30910", color: "white" }}
          >
            <p>Error found details are shown bellow</p>
            <p>{this.state.info}</p>
            <button
              className="btn btn-xs btn-primary "
              onClick={() => {
                location.reload();
              }}
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }
    return <div>{this.props.children}</div>;
  }
}

export default ErrorBoundery;
