import React from 'react';

type Props = {
  message: string;
  classes: Array<any>;
  styles: Record<any, any>;
};

const Raise = ({ message, classes, styles }: Props) => (
  <div
    className={`p1 border-left border-red mb1 rounded-right red bold ${classes}`}
    style={{ ...styles }}
  >
    {message}
  </div>
);

Raise.defaultProps = {
  classes: [],
  styles: { backgroundColor: '#f9cace', borderWidth: '8px' },
};

export default Raise;
