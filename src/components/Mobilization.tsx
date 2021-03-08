import React, { useState, useEffect } from 'react';
import Section from './Section';
import Footer from './Footer';
import Navigation from './navigation';

interface MobilizationProps {
  /* Define when the mobilization is in edit mode. */
  editable?: boolean;
  colorScheme?: string;
  headerFont?: string;
  bodyFont?: string;
  /* Function used to link navigation bar with block,
   * receives block as parameter and should return a string like id. */
  linkTo: Function;
  /* This component is rendered just below the list of blocks,
   * and should lead to the addition of a new block when it is clicked
   *
   * TODO: Review button should external to the mobilization component.
   */
  // newBlockButton: PropTypes.any,
  /* Sections of your mobilization, you will receive an item from this
   * list when you are rendering block customization. */
  blocks: any[];
  /* This component renders wrapped to the block, in it you can
   * customize the rendering of your block, get block and editable
   * as property. */
  // blockWrapper: PropTypes.any,
  /* Array of widgets object used on render. */
  widgets: any[];
  /* Component responsible to render a widget logic,
   * receive { widget } props */
  widgetComponent: any;
  // TODO: Documentation
  extraWidgetProps: any;
  /* Function used to link widgets with block, receives (block, widgets)
   * as param.
   * Default function use the attrs widget.block_id to relationship. */
  blockWidgetsRef?: Function;
}

/**
 * A mobilization has two modes, in editing ({ editable: true })
 * and only rendering ({ editable: false }).
 * When a mobilization is in edit mode, it needs to receive extra
 * properties that will be used for block and widgets editing.
 */

const updateBlock = (
  block: any,
  newProps: any,
  blocks: any[],
  setBlocks: any
) => {
  const index = blocks.findIndex(currentBlock => currentBlock.id === block.id);

  setBlocks([
    ...blocks.slice(0, index),
    { ...blocks[index], ...newProps },
    ...blocks.slice(index + 1),
  ]);
};

const getVisibleBlocks = (blocks: any, editable: any) =>
  !editable ? blocks.filter((b: any) => !b.hidden) : blocks;

const Mobilization: React.FC<MobilizationProps> = props => {
  const { linkTo, editable } = props;
  const visibleBlocks = getVisibleBlocks(props.blocks, props.editable);

  const [blocks, setBlocks] = useState(visibleBlocks);

  useEffect(() => {
    let blocksTotalHeight: number = 0;
    const blocksWithOffsetTop: any[] = [];
    const element: any = document.querySelector('#blocks-list');

    // console.log('blocksTotalHeight', { blocksTotalHeight });

    // watch the scroll event
    const scroll = ({ target }: any) => {
      //
      // check if the current scroll position is greater or equals
      // than one of the blocks offsetTop
      //
      blocksWithOffsetTop.map((block: any) => {
        const scrollPassed = target.scrollTop + 120 >= block.offsetTop;
        // console.log('scrollPassed', {
        //   scrollPassed,
        //   scrollTopReached: !block.scrollTopReached,
        // });
        if (scrollPassed && !block.scrollTopReached) {
          // console.log('map updateBlock');
          updateBlock(block, { scrollTopReached: true }, blocks, setBlocks);
        }
        return scrollPassed;
      });

      //
      // small fix if the last block is small than viewport
      // if the scroll position is greater or equals than
      // sum of all blocks height, sinalyze that the last block was reached
      //
      const viewportBottom = target.scrollTop + target.offsetHeight;
      const isBottom = viewportBottom >= blocksTotalHeight;
      const lastBlock = visibleBlocks.slice(-1)[0];

      if (isBottom && !lastBlock.scrollTopReached) {
        // console.log('isBottom updateBlock');
        updateBlock(lastBlock, { scrollTopReached: true }, blocks, setBlocks);
      }
    };

    if (typeof window !== 'undefined') {
      // get the offsetTop of each block and put it on state
      visibleBlocks.forEach((block: any, index: number) => {
        const { offsetTop, offsetHeight }: any =
          document.querySelector(`#${linkTo(block)}`) || {};
        const scrollTopReached = index === 0;

        blocksWithOffsetTop.push({ ...block, offsetTop, scrollTopReached });
        blocksTotalHeight += offsetHeight;
      });

      element.addEventListener('scroll', scroll);
    }
    return () => {
      element.removeEventListener('scroll', scroll);
    };
  }, [blocks, visibleBlocks, linkTo]);

  // Props used on editable mode
  // Props to customize layout themes
  // TODO: Rever funcionamento da customização de layouts
  const { colorScheme, headerFont, bodyFont } = props;

  const themeClassName = `${colorScheme} ${headerFont}-header ${bodyFont}-body`;
  const layoutClassName = editable ? 'flex-auto relative' : 'absolute';
  const layoutStyle = !editable
    ? { top: 0, bottom: 0, left: 0, right: 0 }
    : undefined;
  // Props to render blocos
  const { blockWidgetsRef, widgets, widgetComponent, extraWidgetProps } = props;

  return (
    <div
      className={`flex flex-column ${themeClassName} ${layoutClassName}`}
      style={layoutStyle}
    >
      <Navigation blocks={blocks} editable={editable} linkTo={linkTo} />
      <div
        id="blocks-list"
        className="flex-auto"
        style={{ overflowY: 'hidden' }}
      >
        {blocks.map((b: any, i: any) => (
          <Section
            key={`section-${i}`}
            anchor={linkTo(b)}
            block={b}
            editable={!!editable}
            widgets={blockWidgetsRef ? blockWidgetsRef(b, widgets) : []}
            widgetComponent={widgetComponent}
            extraWidgetProps={extraWidgetProps}
          />
        ))}
        <Footer mobilization={extraWidgetProps.mobilization} />
      </div>
    </div>
  );
};

Mobilization.defaultProps = {
  editable: false,
  blocks: [],
  widgets: [],
  extraWidgetProps: {},
  blockWidgetsRef: (b: any, ws: any) =>
    ws.filter((w: any) => w.block_id === b.id),
};

export default Mobilization;
