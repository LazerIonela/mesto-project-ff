const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-4",
  headers: {
    authorization: "20bb1308-5f38-49f7-891a-95d491f4962c",
    "Content-Type": "application/json",
  },
};

function request(url, options) {
  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function getUserInfoApi() {
  return request(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  });
}

export function getInitialCardsApi() {
  return request(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  });
}

export function editProfileApi(name, about) {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  });
}

export function editAvatarApi(avatar) {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  });
}

export function postCardApi(name, link) {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  });
}

export function deleteCardApi(cardId) {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

export function putLikeApi(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
}

export function deleteLikeApi(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}
