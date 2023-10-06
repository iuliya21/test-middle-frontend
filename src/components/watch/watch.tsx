import { Component, ReactNode } from "react";
import styles from "./watch.module.css";

type WatchState = {
  time: Date;
};

class Watch extends Component<{}, WatchState> {
  private intervalID: NodeJS.Timeout | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      time: new Date(),
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    if (this.intervalID) clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: new Date(),
    });
  }

  render(): ReactNode {
    const { time } = this.state;
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");

    return <p className={styles.timer}>{`${hours}:${minutes}:${seconds}`}</p>;
  }
}

export default Watch;
