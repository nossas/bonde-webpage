import React from 'react';
import Editor from './EditableMode';
import { checkToParse } from '../../../../utils';
import { Wrapper } from './styles';

type Props = {
  mobilization: Record<any, any>;
  settings: Record<any, any>;
};

const DraftEditor = ({ mobilization, settings }: Props) => {
  const { body_font: bodyFont } = mobilization;

  const theme =
    mobilization && mobilization.color_scheme
      ? mobilization.color_scheme.replace('-scheme', '')
      : null;

  let value = checkToParse(settings.content);

  return (
    <Wrapper
      className="widgets--content-plugin widget editor-new"
      style={{ fontFamily: bodyFont }}
    >
      <Editor readOnly value={value} theme={theme} />
    </Wrapper>
  );
};

export default DraftEditor;
