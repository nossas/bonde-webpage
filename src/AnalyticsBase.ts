// import ReactGA from 'react-ga';
// import TagManager from 'react-gtm-module';

// export default (event: { category: string; action: string; label?: string }) =>
//   ReactGA.event(event);

type Event = {
  category: string
  action: string
  label?: string
  value?: string
}

export default ({ action, category, label, value }: Event) => {
  if (typeof window !== 'undefined') {
    console.log('event', { action, category, label, value });
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
}