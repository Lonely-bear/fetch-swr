[中文](README.zh.md) | - [English](README.md)

# Fetch Swr

一个轻量级的npm包，它简化了从API获取数据的过程，同时提供了使用LocalForage在本地缓存结果的选项。

## 安装

要安装这个插件，只需在您的项目目录中运行以下命令：

```bash
npm install fetch-swr --save
```

## 使用方法

该插件提供了一种灵活的方式来获取和缓存数据。以下是如何使用它的方法：

```javascript
import defineFetch from 'fetch-swr';

const fetchWithCache = defineFetch({
  cache_time: 120, // 缓存持续时间，单位为秒
  fetchAfterCache: true, // 在用户获取数据后，提供缓存数据并开始新的数据获取来更新数据
  fetchAfterCacheDelay: 10, // 提供缓存后，再次获取数据之前的延迟时间，单位为秒
});

fetchWithCache(
  { url: 'https://api.example.com/data'  },
  (data) => {
    console.log('获取到更新后的数据：', data);
    // 您可以在这里更新页面数据
  },
  false // 设置为true以绕过缓存
).then(data => {
  // 处理数据
}).catch(err => {
  // 处理任何错误
});
```

## 参数

- `cache_time`: 缓存数据的持续时间，单位为秒。默认是`60`。
- `fetchAfterCache`: 一个布尔值，表示是否在提供缓存后再次获取数据。默认是`false`。
- `fetchAfterCacheDelay`: 在提供缓存后，再次获取数据之前的延迟时间，单位为秒。默认是`0`。

### fetchWithCache 函数

`fetchWithCache` 函数接受三个参数：

1. `params`: 包含`url`的对象，用于获取数据。
2. `callback`: 一个函数，将使用获取到的数据调用。
3. `noCache`: 一个布尔值，表示是否绕过缓存。默认是`false`。

## 贡献

欢迎贡献！请提交拉取请求或创建问题，以报告任何错误或建议。

## 许可

本项目采用[MIT许可](LICENSE)。
