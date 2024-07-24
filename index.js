import localforage from "localforage";
async function fetchAfterCacheFunc(func, params, callback) {
  const data = await func(params);
  callback(data);
}

export function defineFetch({
  cache_time = 60,
  fetchAfterCache = false,
  fetchAfterCacheDelay = 0,
}) {
  return function (params, callback, noCache = false) {
    function fetchFunc(params) {
      return new Promise((resolve, reject) => {
        fetch(params.url)
          .then(function (response) {
            return response.json().then(function (json) {
              resolve(json);
            });
          })
          .catch((err) => {
            reject(err);
          });
      });
    }

    async function setLocalforage(params, data) {
      await localforage.setItem(params, {
        ...data,
        FSWR_CACHE_TIME: new Date().getTime() + cache_time * 1000,
      });
    }

    async function getLocalforage(params) {
      return await localforage.getItem(params);
    }
    
    return new Promise(async (resolve, reject) => {
      try {
        if(noCache) {
          const data = await fetchFunc(params);
          resolve(data);
          return;
        }
        const value = await getLocalforage(params.url);
        if (value && value.FSWR_CACHE_TIME > new Date().getTime()) {
          if (fetchAfterCache) {
            fetchAfterCacheFunc(fetchFunc, params, (data) => {
              setTimeout(async () => {
                await setLocalforage(params.url, data);
                callback && callback(await getLocalforage(params.url));
              }, fetchAfterCacheDelay * 1000);
            });
            resolve(value);
          } else {
            resolve(value);
          }
        } else {
          const data = await fetchFunc(params);
          await setLocalforage(params.url, data);
          resolve(data);
        }
      } catch (err) {
        reject(err);
      }
    });
  };
}
