import React from 'react';
import styles from './Loader.module.css';

class Loader extends React.Component {
  render() {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
        <p>Loading...</p>
      </div>
    );
  }
}

export default Loader;
