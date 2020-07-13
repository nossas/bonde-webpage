import { mocked } from 'ts-jest/utils';
import graphql from './request-graphql';
import pressure, { pressureQuery, Args } from './pressure';

jest.mock('./request-graphql');
const mockedGraphql = mocked(graphql);

jest.spyOn(global.console, 'log');

describe('activists module pressure tests', () => {
  const args: Args = {
    payload: {
      activist: {
        firstname: "Test",
        lastname: "Noname",
        email: "test@noname.org"
      },
    },
    widget: {
      id: 345
    }
  };

  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a query to called graphql api with input args', () => {
    mockedGraphql.mockResolvedValue({ data: { activist_pressure_id: 8576 } });

    return pressure(args)
      .then(() => {
        const { email, firstname, lastname } = args.payload.activist;
        const expected: string = JSON.stringify({
          query: pressureQuery,
          variables: {
            activist: {
              first_name: firstname,
              last_name: lastname,
              name: `${firstname} ${lastname}`,
              email
            },
            widget_id: args.widget.id
          } 
        });

        expect(mockedGraphql).toBeCalledWith(expected);
      });
  });

  it('should input city if preset in activist', () => {
    mockedGraphql.mockResolvedValue({ data: { activist_pressure_id: 8576 } });
    const city = 'Belo Horizonte';
    
    return pressure({
      widget: args.widget,
      payload: { activist: { ...args.payload.activist, city }}
    }).then(() => {
      const { email, firstname, lastname } = args.payload.activist;
      const expected: string = JSON.stringify({
        query: pressureQuery,
        variables: {
          activist: {
            first_name: firstname,
            last_name: lastname,
            name: `${firstname} ${lastname}`,
            email,
            city: city
          },
          widget_id: args.widget.id
        }
      });

      expect(mockedGraphql).toBeCalledWith(expected);
    });
  });

  it('should log error in console browser', () => {
    const error: string = '500 Internal Server Error';
    mockedGraphql.mockRejectedValue(error);

    return pressure(args).then(() => {
      expect(global.console.log).toBeCalledTimes(1);
      expect(global.console.log).toBeCalledWith('pressure err', error);
    });
  });
});