import React from "react";
class GeoLocationDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: "",
      items: null,
    };
  }
  onIpChange = (event) => {
    this.setState({
      ip: event.target.value,
    });
  };
  handleSubmit = (e) => {
    fetch("http://localhost:5000/get-geo-location?ip=" + this.state.ip)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ items: data }, () => console.log(this.state.items));
      });
    e.preventDefault();
  };
  _renderObject(ObjectTest) {
    if (ObjectTest != null)
      return Object.entries(ObjectTest).map(([key, value], i) => {
        return (
          <div key={key}>
            {key}:{value}
          </div>
        );
      });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ip address"
                  value={this.state.ip}
                  onChange={this.onIpChange}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <input
                  type="submit"
                  value="get Geo Location"
                  className="btn btn-primary"
                />
              </div>
            </div>
          </div>
        </form>
        <div>{this._renderObject(this.state.items)}</div>
      </div>
    );
  }
}

export default GeoLocationDetail;
