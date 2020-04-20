import React from 'react';
import Editor from './EditableModel';
import { checkToParse } from '../../../../utils';
import './styles.scss';

type Props = {
  mobilization: Record<any, any>;
  widget: Record<any, any>;
};

const DraftEditor = ({ mobilization, widget: { settings } }: Props) => {
  const { body_font: bodyFont } = mobilization;

  const theme =
    mobilization && mobilization.color_scheme
      ? mobilization.color_scheme.replace('-scheme', '')
      : null;

  let value = checkToParse(settings.content);

  return (
    <div
      className="widgets--content-plugin widget editor-new"
      style={{ fontFamily: bodyFont }}
    >
      <Editor readOnly value={value} theme={theme} />
    </div>
  );
};

export default DraftEditor;
