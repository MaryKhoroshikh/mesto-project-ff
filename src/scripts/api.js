const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-28/',
    headers: {
      authorization: '78d3b3a3-1ec4-4d78-97c9-c99f9bcb0626',
      'Content-Type': 'application/json'
    }
}

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(handleResponse);
}

const getProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
      .then(handleResponse);
}

const postCard = (newCard) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(newCard)
    }).then(handleResponse);
}

const patchProfile = (newProfile) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(newProfile)
  })
    .then(handleResponse)
}

const patchAvatar = (newAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(newAvatar)
  })
    .then(handleResponse)
}

const deleteFromServerCard = (cardID) => {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(handleResponse)
}

const putLike = (cardID) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(handleResponse)
}

const deleteLike = (cardID) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(handleResponse)
}

export { getInitialCards, getProfile, postCard, patchProfile, patchAvatar, deleteFromServerCard, putLike, deleteLike }