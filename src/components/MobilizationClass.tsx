import React from 'react';
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

type MobilizationState = {
  blocks: any[];
};

/**
 * A mobilization has two modes, in editing ({ editable: true })
 * and only rendering ({ editable: false }).
 * When a mobilization is in edit mode, it needs to receive extra
 * properties that will be used for block and widgets editing.
 */

const getVisibleBlocks = (blocks: any, editable: any) =>
  !editable ? blocks.filter((b: any) => !b.hidden) : blocks;

class Mobilization extends React.Component<
  MobilizationProps,
  MobilizationState
> {
  static defaultProps = {
    editable: false,
    blocks: [],
    widgets: [],
    extraWidgetProps: {},
    blockWidgetsRef: (b: any, ws: any) =>
      ws.filter((w: any) => w.block_id === b.id),
  };

  // constructor(props: MobilizationProps) {
  //   super(props);
  //   this.state = { blocks: getVisibleBlocks(props.blocks, props.editable) };
  // }

  // UNSAFE_componentWillReceiveProps(nextProps: MobilizationProps) {
  //   if (this.props.blocks !== nextProps.blocks) {
  //     this.setState({
  //       blocks: getVisibleBlocks(nextProps.blocks, nextProps.editable),
  //     });
  //   }
  // }

  // componentDidMount() {
  //   if (typeof window !== 'undefined') {
  //     let blocksTotalHeight: number = 0;

  //     // get the offsetTop of each block and put it on state
  //     const blocksWithOffsetTop: any[] = this.state.blocks.map(
  //       (block: any, index: number) => {
  //         const { offsetTop, offsetHeight }: any = document.querySelector(
  //           `#${this.props.linkTo(block)}`
  //         );

  //         const scrollTopReached = index === 0;

  //         blocksTotalHeight += offsetHeight;

  //         return { ...block, offsetTop, scrollTopReached };
  //       }
  //     );
  //     // update all blocks
  //     this.setState({ blocks: blocksWithOffsetTop });

  //     // watch the scroll event
  //     window.document
  //       .querySelector('#blocks-list')
  //       ?.addEventListener('scroll', ({ target }: any) => {
  //         // check if the current scroll position is greater or equals
  //         // than one of the blocks offsetTop
  //         this.state.blocks.forEach((block: any) => {
  //           const scrollPassed = target.scrollTop + 120 >= block.offsetTop;
  //           if (scrollPassed && !block.scrollTopReached) {
  //             this.updateBlock(block, { scrollTopReached: true });
  //           }
  //         });

  //         // small fix if the last block is small than viewport
  //         // if the scroll position is greater or equals than
  //         // sum of all blocks height, sinalyze that the last block was reached
  //         const viewportBottom = target.scrollTop + target.offsetHeight;
  //         const isBottom = viewportBottom >= blocksTotalHeight;
  //         const lastBlock = this.state.blocks.slice(-1)[0];

  //         if (isBottom && !lastBlock.scrollTopReached) {
  //           this.updateBlock(lastBlock, { scrollTopReached: true });
  //         }
  //       });
  //   }
  // }

  // updateBlock(block: any, newProps: any) {
  //   const { blocks } = this.state;
  //   const index = blocks.findIndex(
  //     currentBlock => currentBlock.id === block.id
  //   );

  //   this.setState({
  //     blocks: [
  //       ...blocks.slice(0, index),
  //       { ...blocks[index], ...newProps },
  //       ...this.state.blocks.slice(index + 1),
  //     ],
  //   });
  //   console.log('updateBlock', { block, blocks });
  // }

  render() {
    // Props used on editable mode
    // Props to customize layout themes
    // TODO: Rever funcionamento da customização de layouts
    const { editable, colorScheme, headerFont, bodyFont } = this.props;
    const themeClassName = `${colorScheme} ${headerFont}-header ${bodyFont}-body`;
    const layoutClassName = editable ? 'flex-auto relative' : 'relative';
    const layoutStyle = !editable
      ? { top: 0, bottom: 0, left: 0, right: 0, flexGrow: 1 }
      : undefined;

    // Props to render blocos
    const {
      linkTo,
      blockWidgetsRef,
      widgets,
      widgetComponent,
      extraWidgetProps,
    } = this.props;

    // TODO: remove this and get of fetch
    const blocks = getVisibleBlocks(this.props.blocks, editable);

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
        </div>
        <Footer mobilization={extraWidgetProps.mobilization} />
      </div>
    );
  }
}

export default Mobilization;
