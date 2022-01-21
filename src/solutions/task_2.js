// Please implement your solution in this file
import { prepareData } from "./task_1";
import { useState, useEffect } from "react";

const API_URL = "https://api.spacexdata.com/v3/launches/past";

const useApiData = (filterParams) => {
  let [isLoading, setLoading] = useState(false);
  let [responseJson, setResponseJson] = useState([]);
  let [result, setResult] = useState([]);

  const getApiData = async () => {
    setLoading(true);
    const response = await fetch(API_URL);
    const responseJson = await response.json();
    setResponseJson(responseJson);
    setLoading(false);
  };

  useEffect(() => {
    getApiData();
  }, []);

  useEffect(() => {
    setResult(prepareData(filterParams)(responseJson));
  }, [responseJson, filterParams]);

  return [isLoading, result];
};

export const RocketsList = ({ filterParams }) => {
  const [isLoading, result] = useApiData(filterParams);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (result.length === 0) {
    return <div>No data</div>;
  }

  return result.map((item) => (
    <div
      key={item.flight_number}
    >{`#${item?.flight_number} ${item?.mission_name} (${item?.payloads_count})`}</div>
  ));
};
