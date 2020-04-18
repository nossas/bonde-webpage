import React from 'react';
import PropTypes from 'prop-types';

const Raise = ({ message, classes, styles }: any) => (
  <div
    className={`p1 border-left border-red mb1 rounded-right red bold ${classes}`}
    style={{ ...styles }}
  >
    {message}
  </div>
);

Raise.propTypes = {
  message: PropTypes.string.isRequired,
  classes: PropTypes.array,
  styles: PropTypes.object,
};

Raise.defaultProps = {
  classes: [],
  styles: { backgroundColor: '#f9cace', borderWidth: '8px' },
};

export default Raise;
