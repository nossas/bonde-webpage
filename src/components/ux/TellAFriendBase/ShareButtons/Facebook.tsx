import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { Wrap } from './styles';

const FacebookShareButton = ({ href }: any) => {
  const handleClick = () => {
    window.open(
      `http://www.facebook.com/sharer.php?u=${href}`,
      'Compartilhar no Facebook',
      'width=800,height=600'
    );
  };

  return (
    <Wrap>
      <button onClick={handleClick} style={{ backgroundColor: '#2D88ED' }}>
        Compartilhar no Facebook
      </button>
    </Wrap>
  );
};

FacebookShareButton.propTypes = {
  href: PropTypes.string.isRequired,
};

export default FacebookShareButton;
