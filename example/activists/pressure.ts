import graphql, { Response } from './request-graphql';

export type Activist = {
  firstname: string;
  lastname: string;
  email: string;
  city?: string;
};

export type Payload = {
  activist: Activist;
  targets_id?: string;
};

export type Widget = {
  id: number;
};

export interface Args {
  payload: Payload;
  widget: Widget;
};

export const pressureQuery: string = `
mutation Pressure($activist: ActivistInput!, $widget_id: Int!, $input: EmailPressureInput) {
  create_email_pressure(widget_id: $widget_id, activist: $activist, input: $input) {
    data
  }
}
`;

const pressure = async ({ payload, widget }: Args): Promise<any> => {
  const { activist, targets_id } = payload;
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
      query: pressureQuery,
      variables: { activist: input, input: { targets_id }, widget_id: widget.id }
    });
    
    const response: Response = await graphql(query);
    
    return response.data;
  } catch (err) {
    // TODO: Show popup window error
    console.log('pressure err', err);
  }
};

export default pressure;