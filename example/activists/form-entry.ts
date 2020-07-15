import graphql, { Response } from './request-graphql';

type FormEntryField = {
  uid: string
  kind: string
  label: string
  placeholder: string
  required: boolean
  value: string
};

type FormEntry = {
  fields: string;
  widget_id: number;
};

type FieldPattern = {
  name: string;
  re: any;
};

type Input = {
  fields: FormEntryField[];
};

type Args = {
  mobilizationId: number;
  formEntry: FormEntry
};

export const formEntryQuery: string = `
mutation FormEntry($activist: ActivistInput!, $widget_id: Int!, $input: FormEntryInput!) {
  create_form_entry(widget_id: $widget_id, activist: $activist, input: $input) {
    data
  }
}
`;

export default async ({ formEntry: { fields: fieldsJSON, widget_id } }: Args): Promise<any> => {
  try {
    const activist: any = {};
    const input: Input = {
      fields: JSON.parse(fieldsJSON).map((field: any) => ({
        ...field,
        required: field.required === 'true' ? true : false
      }))
    };
    // Create activist input with label regex
    const fieldsPattners: FieldPattern[] = [
      { name: 'first_name', re: new RegExp(/^(nombre|first[\-\s]?name|nome|name)/, 'g') },
      { name: 'last_name', re: new RegExp(/^(sobre[\s\-]?nome|surname|last[\s\-]?name|apellido)/, "g") },
      { name: 'email', re: new RegExp(/^(e\-?mail|correo electronico)/, "g") },
      { name: 'phone', re: new RegExp(/^(celular|mobile|portable)/, "g") },
      { name: 'city', re: new RegExp(/^(cidade|city|ciudad)/) }
    ];
    fieldsPattners.forEach(({ name, re }: FieldPattern) => {
      const field = input.fields.filter(field => re.test(field.label.toLowerCase()))[0];
      if (!!field) {
        activist[name] = field.value;
      };
    });
    // Concat activist fullname
    activist['name'] = `${activist.first_name.trim()} ${(activist.last_name || '').trim()}`.trim();
    
    console.log('variables', { variables: { activist, input, widget_id } });
  
    const query = JSON.stringify({
      query: formEntryQuery,
      variables: { activist, input, widget_id }
    });
    const response: Response = await graphql(query);
    return response.data;
  } catch (err) {
    // TODO: Show popup window error
    console.log('form_entry err', err);
  }
};