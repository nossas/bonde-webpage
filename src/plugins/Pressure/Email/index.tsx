import React, { useReducer } from 'react';
import { Count, Form, Targets } from '../components';
import { Header } from '../styles';
import EmailFields from './EmailFields';
import { getTargetList } from '../utils';
import FetchTargets from '../FetchTargets';

/* TODO: Change static content by props
 * - title
 * - bgColor
 */

type Props = {
  /* Below props are from root parent */
  editable: boolean;
  mobilization: any;
  widget: {
    id: number;
    count: number;
    settings: {
      main_color: string;
      call_to_action?: string;
      title_text: string;
      button_text: string;
      pressure_subject?: string;
      pressure_body?: string;
      disable_edit_field: string;
      targets: string;
      finish_message_type?: string;
      finish_message?: Record<any, any>;
      finish_message_background?: string;
      count_text?: string;
      show_city?: string;
    };
  };
  block: any;
  // ApolloClient instance
  client?: any;
  pressureTargets?: any[];
  overrides: {
    FinishCustomMessage: {
      component?: any;
      props: any;
    };
    FinishDefaultMessage: {
      component?: any;
      props: any;
    };
  };
  analyticsEvents: {
    pressureIsFilled: () => void;
    pressureSavedData: () => void;
  };
  asyncFillWidget: (params: {
    payload: Record<string, any>;
    widget: Record<string, any>;
  }) => Promise<any>;
};

const initialState = {
  loading: false,
  data: undefined,
  errors: [],
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'fetching':
      return { ...state, loading: true, data: undefined, errors: [] };
    case 'success':
      return { ...state, loading: false, data: action.payload, errors: [] };
    case 'failed':
      return {
        ...state,
        loading: false,
        errors: action.payload,
        data: undefined,
      };
    default:
      throw new Error('action.type not found');
  }
};

export const EmailPressure = ({
  // ApolloClient instance
  // client,
  pressureTargets,
  widget,
  asyncFillWidget,
  mobilization,
  analyticsEvents,
  overrides,
}: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    main_color: mainColor,
    call_to_action: callToAction,
    title_text: titleText,
    // Maybe `reply_email` is necessary...
    // reply_email,
    count_text: countText,
    finish_message_type: finishMessageType,
    disable_edit_field: disableEditField,
    targets,
  } = widget.settings;

  let targetList: string[] = [];
  let pureTargets: any[] = pressureTargets || [];
  // if (pressureTargets && pressureTargets.length > 0) {
  //   pureTargets
  // }
  if (!!targets) {
    targetList = getTargetList(targets) || [];
  }

  const handleSubmit = ({ targetsInput, ...data }: any): Promise<any> | any => {
    if (targetList.length < 1 && !targetsInput) {
      dispatch({
        type: 'failed',
        payload: [
          'Ops, você precisa selecionar pelo menos um alvo para poder pressionar',
        ],
      });
    } else {
      dispatch({ type: 'fetching' });
      // const mapList = (target: string) => getEmailTarget(target);
      const payload = {
        activist: {
          firstname: data.name,
          lastname: data.lastname,
          email: data.email,
          city: data.city || null,
        },
        targets_id: targetsInput ? targetsInput.value : null,
        mail: {
          disableEditField,
          subject: data.subject,
          body: data.body,
        },
      };

      return asyncFillWidget({ payload, widget })
        .then((data: any) => {
          if (!data.create_email_pressure) throw new Error('pressure_failed');

          analyticsEvents && analyticsEvents.pressureSavedData();
          return dispatch({ type: 'success', payload: data });
        })
        .catch((_e: any) => {
          // console.log('e', e);
          return dispatch({
            type: 'failed',
            payload: ['Houve um erro ao fazer a pressão'],
          });
        });
    }
  };

  if (state.data) {
    const {
      FinishCustomMessage: {
        component: FinishCustomMessage,
        props: customProps,
      },
      FinishDefaultMessage: {
        component: FinishDefaultMessage,
        props: defaultProps,
      },
    } = overrides;

    return finishMessageType === 'custom' ? (
      <FinishCustomMessage
        mobilization={mobilization}
        widget={widget}
        {...customProps}
      />
    ) : (
      <FinishDefaultMessage
        mobilization={mobilization}
        widget={widget}
        {...defaultProps}
      />
    );
  }

  return (
    <div id={`widget-${widget.id}`}>
      <div onKeyDown={e => e.stopPropagation()} />
      <Header backgroundColor={mainColor}>{callToAction || titleText}</Header>
      <Form
        widget={widget}
        pureTargets={pureTargets}
        onSubmit={handleSubmit}
        saving={state.loading}
        BeforeStandardFields={() => {
          return (
            <>
              <Targets
                targets={targetList}
                pureTargets={pureTargets}
                pressureType={'email'}
              />
              {EmailFields.before(
                targetList,
                analyticsEvents.pressureIsFilled()
              )}
            </>
          );
        }}
        AfterStandardFields={() => EmailFields.after(disableEditField === 's')}
        errors={state.errors}
      />
      {countText && (
        <Count
          shadow
          value={widget.count || 0}
          color={mainColor}
          text={countText}
          startCounting={typeof window !== 'undefined'}
        />
      )}
    </div>
  );
};

// EmailPressure.defaultProps = {
//   widget: {
//     settings: {
//       main_color: '#f23392',
//       title_text: 'Pressione quem pode tomar essa decisão',
//       button_text: 'Enviar',
//       disable_edit_field: 'n',
//     },
//   },
// };

// Wrapper All Plugin to get targets group
export default ({ client, ...props }: any) => (
  <FetchTargets client={client} widgetId={props.widget.id}>
    {({ data }: any) => <EmailPressure pressureTargets={data} {...props} />}
  </FetchTargets>
);
