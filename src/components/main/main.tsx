import { Component } from "react";
import styles from "./main.module.css";
import Reviews from "../reviews/reviews";

class Main extends Component {
  render() {
    return (
      <div className={styles.reviews}>
        <h2 className={styles.subtitle}>Отзывы клиентов</h2>
        <Reviews />
      </div>
    )
  }
}

export default Main;