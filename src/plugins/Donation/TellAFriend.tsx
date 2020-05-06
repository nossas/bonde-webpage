import React from 'react';
import PropTypes from 'prop-types';
import TellAFriendBase from '../../components/ux/TellAFriendBase';

// type Props = {
//   preview: any;
//   mobilization: any;
//   widget: any;
// }

const DonationTellAFriend = ({
  preview,
  mobilization,
  widget,
  ...ownProps
}: any) => {
  return (
    <TellAFriendBase
      {...ownProps}
      preview={preview}
      mobilization={mobilization}
      widget={widget}
      message="Oba, doação registrada! Sua doação é via boleto? Verifique seu email."
    />
  );
};

DonationTellAFriend.propTypes = {
  preview: PropTypes.bool,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
};

export default DonationTellAFriend;
