import urlJoin from 'url-join';

const makeAPIRequest = async (url, _params = {}) => {
  const headers = Object.assign({
    'Content-Type': 'application/json'
  }, _params.header);
  const body = _params.body && _params.body !== 'string' ? JSON.stringify(_params.body) : _params.body;
  const params = Object.assign(_params, { headers, body });
  const urlFinal = Array.isArray(url) ? urlJoin(...(url.map(String))) : url;

  return fetch(urlFinal, params)
    .then(async res => {
      if (res.status === 204) return null;
      if (res.status !== 200) console.log(res);
      if (res.status === 400) {
        const resp = await res.json();
        throw resp;
      }
      let response = null;
      try {
        response = res.json();
      } catch (err) {
        console.log('[API] Request has empty response. Cannot convert it to JSON.');
        return null;
      }
      return response;
    });
};

export { makeAPIRequest }