# Fetch Swr

A lightweight npm package that simplifies fetching data from APIs while providing an option to cache the results locally using LocalForage.

## Installation

To install the plugin, simply run the following command in your project directory:

```bash
npm install fetch-swr --save
```

## Usage

The plugin provides a flexible way to fetch data and cache it. Here's how you can use it:

```javascript
import defineFetch from 'fetch-swr';

const fetchWithCache = defineFetch({
  cache_time: 120, // Cache duration in seconds
  fetchAfterCache: true, // After user fetch, give the cache data and start a new fetch to update data
  fetchAfterCacheDelay: 10, // Delay in seconds before fetching after cache
});

fetchWithCache(
  { url: 'https://api.example.com/data' },
  (data) => {
    console.log('Fetched updated data:', data);
    // You can update your page data here
  },
  false // Set to true if you want to bypass the cache
).then(data => {
  // Handle the data
}).catch(err => {
  // Handle any errors
});
```

## Parameters

- `cache_time`: The duration in seconds for which the fetched data should be cached. Default is `60`.
- `fetchAfterCache`: A boolean indicating whether to fetch data again after the cache is served. Default is `false`.
- `fetchAfterCacheDelay`: The delay in seconds before fetching data again after the cache is served. Default is `0`.

### fetchWithCache Function

The `fetchWithCache` function accepts three parameters:

1. `params`: An object containing the `url` to fetch data from.
2. `callback`: A function that will be called with the fetched data.
3. `noCache`: A boolean to indicate whether to bypass the cache. Default is `false`.

## Contributing

Contributions are welcome! Please submit a pull request or create an issue for any bugs or suggestions.

## License

This project is licensed under the [MIT License](LICENSE).
