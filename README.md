# SearchUnify SDK
[![Version npm](https://img.shields.io/npm/v/su-sdk.svg?style=flat-square)](https://www.npmjs.com/package/su-sdk)

[![NPM](https://nodei.co/npm/su-sdk.png?downloads=true&downloadRank=true)](https://nodei.co/npm/su-sdk/)

## Overview
The SearchUnify SDK enables developers to easily work with the SearchUnify platform and build scalable solutions with search, analytics, crawlers and more. You can get started in minutes using NPM.
The SearchUnify SDK simplifies use of SearchUnify Services by providing a set of libraries that are consistent and familiar for the developers. It provides support for API lifecycle consideration such as credential management, retries, data marshaling, and serialization. The SearchUnify SDKs also support higher level abstractions for simplified development.

## Key Features
* HTTP/2 Support and pluggable HTTP layer, new programming interfaces seamlessly take advantage of HTTP/2 features and provide new ways to build applications.
* Nonblocking I/O, the SearchUnify SDK for Javascript utilizes a new, nonblocking SDK architecture to support true nonblocking I/O. It features truly non blocking asynchronous clients that implement high concurrency across a few threads.

## Getting Started
Sign up for SearchUnify, before you begin, you need a SearchUnify account. Please see the oAuth section of the developer guide for information about how to retrieve your SearchUnify credentials.

## Installation
SDK requires [Node.js](https://nodejs.org/) to run. Install the dependencies and devDependencies and start the server.

## Authentication
Initialize the SDK, with OAuth 2.0 creds. Access token will be generated internally and will be used by SDK to serve the request to your SearchUnify instance.

The access token expires after 4 hours, SDK recreates access token once the token expires using refresh token.

## Execution
Initiate SearchUnify javascript SDK on Server. Using the SDK, you can use SearchUnify functional interface to retrieve or save data. To start using, initialize the SDK with your URL and API key.
```javascript
const { SearchUnifyRestClient } = require('su-sdk');

const suRestClient = new SearchUnifyRestClient({
  instance: 'https://yourInstance.searchunify.com',
  timeout: 60000,
  oauth2: {
    username: 'changeme',
    password: 'changeme',
    clientId: 'changeme',
    clientSecret: 'changeme'
  }
})
```

## Sample API call
```javascript
const tileData = async() => {
  try {
      const Analytics = suRestClient.Analytics();
      const data = await Analytics.getTilesData({
        startDate: '2022-12-09',
        endDate: '2022-12-10',
        searchClientId: 'searchClient UID'
      });
      console.log("data", data);
      } catch (error) {
      console.log("error", error);
  }
};

tileData();
```
## Documentation
Please refer to the SearchUnify developer guide to use the SDK. https://docs.searchunify.com/Content/Developer-Guides/SDKs.htm
The documentation is in review and might contain bugs🐞, we will update the link on https://docs.searchunify.com once its's final.

## License
MIT

**&copy; Powered by [SearchUnify](https://www.searchunify.com/)!**
