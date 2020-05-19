import ReactGA from 'react-ga';

export default (event: { category: string; action: string, label?: string }) =>
  ReactGA.event(event);
