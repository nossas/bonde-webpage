import React from 'react';
import PropTypes from 'prop-types';
import TellAFriendBase from '../../components/ux/TellAFriendBase';

const FormTellAFriend = ({ preview, mobilization, widget, ...props }: any) => (
  <TellAFriendBase
    preview={preview}
    mobilization={mobilization}
    widget={widget}
    message="Formulário submetido com sucesso!"
    {...props}
  />
);

FormTellAFriend.propTypes = {
  preview: PropTypes.bool,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
};

export default FormTellAFriend;
