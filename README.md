# twitter-share

Generate a Twitter share intent URL

## Instalation

```bash
$ npm install --save twitter-share
```

## Usage

```javascript
const twitterShare = require('twitter-share');

// create all the links!!!
const params = {
    text: 'Tweet text', // optional String
    url: 'Tweet url', // optional String
    hashtags: ['some', 'cool', 'hashtags'], // optional Array of Strings
    via: 'twitterusername', // optional String
    related: ['additional', 'twitter', 'usernames'], // optional Array of Strings,
    inReplyTo: 'PARENT_TWEED_IT', // optional String
};
const tweetLink = twitterShare(params);
```

## Contributing
Feel free to contribute with improvements or bugfixes.

## License

twitter-share is [MIT licensed](./LICENSE).
