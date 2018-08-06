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
    related: [{
        username: 'letiagoalves',
        description: 'developer'
    }, {
        username: 'twitter',
        description: 'social network'
    }], // optional Array of Objects,
    inReplyTo: 1337, // optional Number
};
const tweetLink = twitterShare(params);
```

## Contributing
Feel free to contribute with improvements or bugfixes.

## License

twitter-share is [MIT licensed](./LICENSE).
