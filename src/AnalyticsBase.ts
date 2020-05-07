import ReactGA from 'react-ga';

export default (event: { category: string; action: string }) =>
  ReactGA.event(event);
