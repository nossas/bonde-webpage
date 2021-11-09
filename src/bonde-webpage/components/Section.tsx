import React from 'react';
import styled from '@emotion/styled';
import WidgetArea from './WidgetArea';

const Block = styled.div`
  padding: 5em 0;

  &:after,
  &:before {
    content: ' ';
    display: table;
  }
  &:after {
    clear: both;
  }
`;

const getBackgroundStyle = (block: any) => {
  if (block.bg_image)
    return {
      background: `url('${block.bg_image}') no-repeat`,
      backgroundSize: 'cover',
    };
  else if (block.bg_class) {
    try {
      const rgba = JSON.parse(block.bg_class);
      return {
        backgroundColor: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`,
      };
    } catch (ex) {
      // Silent error because use className
      return {};
    }
  }
  return undefined;
};

/**
 * The basic rendering structure of a block has features
 * such as navigating between blocks, and events such as
 * mouseEnter and mouseOut.
 */
const Section = (props: SectionProps) => {
  const {
    anchor,
    block,
    widgets,
    widgetComponent,
    extraWidgetProps,
    editable,
    wrapper: BlockWrapper,
  } = props;

  const RenderBlock = () => {
    return (
      <div
        id={anchor}
        className={
          block.bg_class && block.bg_class.indexOf('{') === -1
            ? block.bg_class
            : ''
        }
        style={{ ...getBackgroundStyle(block) }}
      >
        <div className="col-10 mx-auto">
          <Block>
            {widgets &&
              widgets.map((widget: any) => (
                <WidgetArea
                  key={`widget-${widget.id}`}
                  block={block}
                  widget={widget}
                  widgetComponent={widgetComponent}
                  extraWidgetProps={extraWidgetProps}
                />
              ))}
          </Block>
        </div>
      </div>
    );
  };

  if (BlockWrapper) {
    return (
      <BlockWrapper block={block} editable={editable}>
        <RenderBlock />
      </BlockWrapper>
    );
  }

  return <RenderBlock />;
};

type SectionProps = {
  /* Define anchor to navigate between blocks, this value must
   * be unique per block. */
  anchor: string;
  /* This component renders wrapped to the block, in it you can
   * customize the rendering of your block, get block and editable
   * as property. */
  wrapper?: any;
  /* Data structure of block, passed to blockWrapper component */
  block: any;
  /* True if mobilization is editable mode */
  editable: boolean;
  /* Array of widgets related on Section */
  widgets: any[];
  /* Component responsible to render a widget logic,
   * receive { widget } props */
  widgetComponent: any;
  // TODO: documentation
  extraWidgetProps: any;
};

export default Section;
