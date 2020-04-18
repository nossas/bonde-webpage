import ReactGA from 'react-ga';

const sendEvent = (event: any) => ReactGA.event(event);

const AnalyticsBase = {
  sendEvent,
};

export default AnalyticsBase;
