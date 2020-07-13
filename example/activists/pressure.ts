type Activist = {
  firstname: string;
  lastname: string;
  email: string;
  city?: string;
};

type Payload = {
  activist: Activist;
};

type Widget = {
  id: number;
};

interface Args {
  payload: Payload;
  widget: Widget;
};

interface Response {
  data: any;
};

const pressure = async ({ payload, widget }: Args): Promise<any> => {
  const { activist } = payload;
  try {
    let input: any = {
      first_name: activist.firstname,
      last_name: activist.lastname,
      name: `${activist.firstname} ${activist.lastname}`,
      email: activist.email
    };
    if (activist.city) {
      input.city = activist.city;
    };

    const query = JSON.stringify({
      query: `mutation Pressure ($activist: ActivistInput!, $widget_id: Int!) {
      create_email_pressure(
        widget_id: $widget_id,
        activist: $activist
        ) {
          data
        }
      }`,
      variables: { activist: input, widget_id: widget.id }
    });
    const response = await fetch('https://api-graphql.staging.bonde.org/v1/graphql', {
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      body: query,
    });

    const responseJson: Response = await response.json();
    return responseJson.data;
  } catch (err) {
    // TODO: Show popup window error
    console.log('pressure err', err);
  }
};

export default pressure;