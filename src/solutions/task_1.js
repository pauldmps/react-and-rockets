// Please implement your solution in this file

export const prepareData =
  ({ year, customerName }) =>
  (data) => {
    const getPayloadCount = (item) => {
      const {
        rocket: { second_stage },
      } = item;
      return second_stage.payloads.length;
    };

    const filterFunction = (item) => {
      const {
        launch_year,
        rocket: { second_stage },
      } = item;
      return (
        Number(launch_year) === year &&
        second_stage.payloads.find((payload) =>
          payload.customers.find((customer) => customer.includes(customerName))
        )
      );
    };

    const sortFunction = (a, b) =>
      getPayloadCount(b) - getPayloadCount(a) ||
      b.flight_number - a.flight_number;

    const outputFunction = (item) => {
      const { flight_number, mission_name } = item;
      return {
        flight_number,
        mission_name,
        payloads_count: getPayloadCount(item),
      };
    };

    const result = data
      .filter(filterFunction)
      .sort(sortFunction)
      .map(outputFunction);

    return result;
  };
