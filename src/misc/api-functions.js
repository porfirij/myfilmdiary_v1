import * as constants from "./constants";

export async function fetchApi(apiRequest) {
  const response = await fetch(
    `${constants.API_URL}${apiRequest.type}?key=${constants.API_KEY}`,
    {
      method: apiRequest.method || "GET",
      headers: apiRequest.headers || null,
      body: JSON.stringify(apiRequest.body) || null
    }
  );

  const resData = await response.json();

  if (response.ok) {
    return { ok: true, data: resData };
  } else {
    return { ok: false, data: resData };
  }
}

export async function getUserData(token) {
  const response = await fetchApi({
    type: constants.API_REQUEST_GET_USER_DATA,
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: {
      idToken: token
    }
  });

  if (response.ok) {
    return response.data.users[0];
  } else {
    return response.data.error.message;
  }
}
