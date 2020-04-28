import React from 'react';
import theme from '../../../base/theme';

type Props = {
  success: boolean;
  buttonText: string;
  loading: boolean;
  bodyFont: string;
};

const Button = ({ success, buttonText, loading, bodyFont }: Props) => (
  <div style={{ fontFamily: bodyFont }}>
    <button
      type="submit"
      disabled={loading}
      className="caps btn bg-darken-4 p2 col-12 mt1 mb2 rounded white"
    >
      {loading ? 'Enviando...' : buttonText}
    </button>
    {success && (
      <div className="center">Sua ação foi registrada com sucesso!</div>
    )}
  </div>
);

Button.defaultProps = {
  success: false,
  loading: false,
  bodyFont: theme.fontFamily,
};

export default Button;
