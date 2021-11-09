import React from 'react';
// import { injectIntl, intlShape } from 'react-intl'
// import { SlateEditor, SlateContent } from 'slate-editor';
// import { BoldPlugin } from '@slate-editor/bold-plugin';
// import { ItalicPlugin } from '@slate-editor/italic-plugin';
// import { UnderlinePlugin } from '@slate-editor/underline-plugin';
// import { StrikethroughPlugin } from '@slate-editor/strikethrough-plugin';
// import { AlignmentPlugin } from '@slate-editor/alignment-plugin';
// import { LinkPlugin } from '@slate-editor/link-plugin';
// import { ListPlugin } from '@slate-editor/list-plugin';
// import { FontFamilyPlugin } from '@slate-editor/font-family-plugin';
// import { FontSizePlugin } from '@slate-editor/font-size-plugin';
// import { ImagePlugin } from '@slate-editor/image-plugin';
// import { ColorPlugin } from '@slate-editor/color-plugin';
// import { GridPlugin } from '@slate-editor/grid-plugin';
// import { EmbedPlugin } from '@slate-editor/embed-plugin';

import { checkToParse } from '../../../../utils';
import { Wrapper } from './styles';

// const fontSizePluginOptions = { initialFontSize: 16 };

// const plugins = [
//   AlignmentPlugin(),
//   BoldPlugin(),
//   ColorPlugin(),
//   EmbedPlugin(),
//   FontFamilyPlugin(),
//   FontSizePlugin(fontSizePluginOptions),
//   GridPlugin(),
//   ImagePlugin(),
//   ItalicPlugin(),
//   LinkPlugin(),
//   ListPlugin(),
//   StrikethroughPlugin(),
//   UnderlinePlugin(),
// ];

const EditorSlate = ({ content }: any) => {
  // const EditorSlate = ({ content, readOnly }: any) => {
  const initialState = checkToParse(content);
  return <Wrapper className="widgets--content-plugin">{initialState}</Wrapper>;
  // const initialState = checkToParse(content);
  // return (
  //   <Wrapper className="widgets--content-plugin">
  //     <SlateEditor
  //       plugins={plugins}
  //       initialState={initialState}
  //       style={{ color: '#fff' }}
  //     >
  //       <SlateContent
  //         wrapperStyle={{ position: 'relative', zIndex: 'inherit' }}
  //         style={{ minHeight: 150 }}
  //         readOnly={readOnly}
  //       />
  //     </SlateEditor>
  //   </Wrapper>
  // );
};

// EditorSlate.propTypes = {
//   intl: intlShape.isRequired
// }

export default EditorSlate;
