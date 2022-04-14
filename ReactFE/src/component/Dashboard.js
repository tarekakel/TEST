import React from "react";
import io from "socket.io-client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
class Dashboard extends React.Component {
  state = {
    socketData: [],
    labels: [],
    data: [],
  };

  componentWillUnmount() {
    this.socket.close();
    console.log("component unmounted");
  }
  componentDidMount() {
    var sensorEndpoint = "http://localhost:5000";
    this.socket = io.connect(sensorEndpoint, {
      reconnection: true,
      // transports: ['websocket']
    });
    console.log("component mounted");
    this.socket.on("my_response", (message) => {
      this.setState({
        socketData: message["data"],
        labels: Object.keys(message["data"]),
        data: Object.values(message["data"]),
      });

      console.log("labels", this.state.labels, "data", this.state.data);
    });
  }

  render() {
    var options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Bar Chart",
        },
      },
    };
    var data = {
      labels: this.state.labels,
      datasets: [
        {
          label: "Dataset 1",
          data: this.state.data,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
    return (
      <React.Fragment>
        <Bar options={options} data={data} />
      </React.Fragment>
    );
  }
}
export default Dashboard;
