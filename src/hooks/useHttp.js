import { useState, useEffect, useCallback } from "react";

// export async function fetchMeals() {
//   const res = await fetch("http://localhost:3000/meals");
//   const meals = await res.json();

//   if (!res.ok) {
//     throw new Error("Failed to fetch meals from the Server!");
//   }

//   return meals;
// }

// export async function submitOrder(reqBody) {
//   const res = await fetch("http://localhost:3000/orders", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(reqBody),
//   });

//   const submitOrderResponse = await res.json();

//   if (!submitOrderResponse.ok) {
//     throw new Error("Failed to create or send Order details to the Server!");
//   }

//   return true;
// }

async function sendHttpRequest(url, config) {
  const res = await fetch(url, config);
  const resData = await res.json();

  if (!res.ok) {
    throw new Error(
      resData.message ||
        "Server is not available at the moment! Please try later!"
    );
  }

  return resData;
}

export default function useHttp(url, config, initData) {
  const [data, setData] = useState(initData);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState();

  function clearData() {
    setData(initData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      setErrMsg("");
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setErrMsg(error.message || "Oops, something went wrong!");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    errMsg,
    sendRequest,
    clearData
  };
}
