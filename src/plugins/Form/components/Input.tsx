import React from 'react';
import PropTypes from 'prop-types';
/** @jsx jsx */
// eslint-disable-next-line react/react-in-jsx-scope
// @ts-ignore
import { css, jsx } from '@emotion/core';

const renderFieldKind = ({ field, name, onChange, onBlur }: any) => {
  if (field.kind === 'dropdown') {
    return (
      <select
        name={name}
        className="select block border border-gray94"
        css={css`
          border-radius: 2px;
          padding: 1rem;
          display: inline-block;
          height: inherit;
        `}
        onChange={onChange}
      >
        <option value="">{'Selecione...'}</option>
        {field.placeholder.split(',').map(function(v: any, index: number) {
          return <option key={`dropdown-option-${index}`}>{v}</option>;
        })}
      </select>
    );
  }
  return (
    <input
      name={name}
      type={field.kind === 'email' ? 'email' : 'text'}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={field.placeholder}
      className="input block border border-gray94"
      css={css`
        border-radius: 2px;
        padding: 1rem;
      `}
    />
  );
};

const Input = (props: any) => {
  const { mobilization, field } = props;
  return (
    <div className="mb2" style={{ fontFamily: mobilization.body_font }}>
      <label
        className="caps bold mb1 inline-block white"
        css={css`
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 1rem;
        `}
      >
        {field.label}
        {field.required === 'true' ? '*' : null}
      </label>
      {renderFieldKind(props)}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
};

export default Input;
