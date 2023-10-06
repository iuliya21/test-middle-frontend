import { Component } from 'react';
import styles from "./header.module.css";
import Watch from '../watch/watch';
import LanguageSelector from '../lang-selector/lang-selector';

class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <Watch />
        <LanguageSelector />
        <h1 className={styles.title}>Healthy Food</h1>
      </header>
    );
  }
}

export default Header;