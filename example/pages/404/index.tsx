import React from 'react';
import ErrorPage from '../components/ErrorPage';

export default function Custom404() {
  return (
    <ErrorPage>
      <img src="/static/images/404.png" alt="404 Not Found" />
      <div className='content'>
        <h2>Ops!</h2>
        <p>Parece que essa página não está no mapa.</p>
        <p>Confira o link e carregue outra vez.</p>
        <p>Se o erro persistir, envie um email para <a href="mailto:suporte@bonde.org.">suporte@bonde.org</a>.</p>
        <p>Valeu pela paciência!</p>
      </div>
    </ErrorPage>
  );
}