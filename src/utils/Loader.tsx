import React from 'react';

class Loader extends React.Component {
  render() {
    return (
      <div className='loader-container'>
        <div className='loader'></div>
        <p>Loading...</p>
      </div>
    );
  }
}

export default Loader;
