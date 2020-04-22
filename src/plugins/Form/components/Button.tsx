import React from 'react';

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

export default Button;
