const twitterShare = require('../src/index.js');

describe('link creation', () => {
    describe('params assertions', () => {
        describe('when an invalid text is given', () => {
            test('should throw an Error', () => {
                expect(() => twitterShare({
                    text: 1337,
                })).toThrowError('text must be a {String}');
                expect(() => twitterShare({
                    text: {},
                })).toThrowError('text must be a {String}');
                expect(() => twitterShare({
                    text: [],
                })).toThrowError('text must be a {String}');
            });
        });
        describe('when an invalid url is given', () => {
            test('should throw an Error', () => {
                expect(() => twitterShare({
                    url: 1337,
                })).toThrowError('url must be a {String}');
                expect(() => twitterShare({
                    url: {},
                })).toThrowError('url must be a {String}');
                expect(() => twitterShare({
                    url: [],
                })).toThrowError('url must be a {String}');
            });
        });
        describe('hashtags', () => {
            describe('when hashtags is not an Array', () => {
                test('should throw an Error', () => {
                    expect(() => twitterShare({
                        hashtags: 1337,
                    })).toThrowError('hashtags must be a {Array}');
                    expect(() => twitterShare({
                        hashtags: {},
                    })).toThrowError('hashtags must be a {Array}');
                    expect(() => twitterShare({
                        hashtags: 'somehashtag',
                    })).toThrowError('hashtags must be a {Array}');
                });
            });
            describe('when hashtags is an Array but it is empty', () => {
                test('should throw an Error', () => {
                    expect(() => twitterShare({
                            hashtags: [],
                        }))
                        .toThrowError('hashtags list must not be empty');
                });
            });
            describe('when hashtags contains a non String', () => {
                test('should throw an Error', () => {
                    expect(() => twitterShare({
                            hashtags: [null],
                        }))
                        .toThrowError('hashtags list must contain only {String} elements');
                    expect(() => twitterShare({
                            hashtags: [true],
                        }))
                        .toThrowError('hashtags list must contain only {String} elements');
                    expect(() => twitterShare({
                            hashtags: [1337],
                        }))
                        .toThrowError('hashtags list must contain only {String} elements');
                    expect(() => twitterShare({
                            hashtags: [{}],
                        }))
                        .toThrowError('hashtags list must contain only {String} elements');
                    expect(() => twitterShare({
                            hashtags: [
                                [],
                            ],
                        }))
                        .toThrowError('hashtags list must contain only {String} elements');
                });
            });
        });
        describe('when an invalid via is given', () => {
            test('should throw an Error', () => {
                expect(() => twitterShare({
                    via: 1337,
                })).toThrowError('via must be a {String}');
                expect(() => twitterShare({
                    via: {},
                })).toThrowError('via must be a {String}');
                expect(() => twitterShare({
                    via: [],
                })).toThrowError('via must be a {String}');
            });
        });
        describe('related', () => {
            describe('when related is not an Array', () => {
                test('should throw an Error', () => {
                    expect(() => twitterShare({
                        related: 1337,
                    })).toThrowError('related must be a {Array}');
                    expect(() => twitterShare({
                        related: {},
                    })).toThrowError('related must be a {Array}');
                    expect(() => twitterShare({
                        related: 'someusername',
                    })).toThrowError('related must be a {Array}');
                });
            });
            describe('when related is an Array but it is empty', () => {
                test('should throw an Error', () => {
                    expect(() => twitterShare({
                            related: [],
                        }))
                        .toThrowError('related list must not be empty');
                });
            });
        });
        describe('when an invalid inReplyTo is given', () => {
            test('should throw an Error', () => {
                expect(() => twitterShare({
                    inReplyTo: 'invalid',
                })).toThrowError('inReplyTo must be a {Number}');
                expect(() => twitterShare({
                    inReplyTo: {},
                })).toThrowError('inReplyTo must be a {Number}');
                expect(() => twitterShare({
                    inReplyTo: [],
                })).toThrowError('inReplyTo must be a {Number}');
            });
        });
    });

    describe('created link', () => {
        describe('web intent url', () => {
            test('should create a link with correct web intent url', () => {
                const expectedLink = /^https\:\/\/twitter\.com\/intent\/tweet/;
                expect(twitterShare({})).toMatch(expectedLink);
            });
        });
        describe('query parameters', () => {
            describe('text', () => {
                test('should create link', () => {
                    expect(twitterShare({
                            text: 'check out this tweet doug',
                        }))
                        .toBe('https://twitter.com/intent/tweet?text=check%20out%20this%20tweet%20doug');
                });
            });
            describe('url', () => {
                test('should create link', () => {
                    expect(twitterShare({
                            url: 'https://github.com/letiagoalves',
                        }))
                        .toBe('https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fletiagoalves');
                });
            });
            describe('hashtags', () => {
                test('should create link', () => {
                    expect(twitterShare({
                            hashtags: ['some', 'cool', 'hashtags'],
                        }))
                        .toBe('https://twitter.com/intent/tweet?hashtags=some,cool,hashtags');
                });
            });
            describe('via', () => {
                test('should create link', () => {
                    expect(twitterShare({
                            via: 'someusername',
                        }))
                        .toBe('https://twitter.com/intent/tweet?via=someusername');
                });
            });
            describe('related', () => {
                test('should create link', () => {
                    const expectedLink = 'https://twitter.com/intent/tweet?related=letiagoalves%2Cdeveloper,twitter%2Csocial%20network';
                    expect(twitterShare({
                            related: [{
                                username: 'letiagoalves',
                                description: 'developer',
                            }, {
                                username: 'twitter',
                                description: 'social network',
                            }],
                        }))
                        .toBe(expectedLink);
                });
            });
            describe('inReplyTo', () => {
                test('should create link', () => {
                    expect(twitterShare({
                            inReplyTo: 1337,
                        }))
                        .toBe('https://twitter.com/intent/tweet?in-reply-to=1337');
                });
            });
            describe('multiple parameters', () => {
                test('should create link', () => {
                    const expectedLink = 'https://twitter.com/intent/tweet?text=hello%20friend&url=https%3A%2F%2Fgithub.com%2Fletiagoalves&hashtags=letiagoalves,github&via=letiagoalves&related=github%2Csocial%20network&in-reply-to=1337';
                    expect(twitterShare({
                            text: 'hello friend',
                            url: 'https://github.com/letiagoalves',
                            hashtags: ['letiagoalves', 'github'],
                            via: 'letiagoalves',
                            related: [{
                                username: 'github',
                                description: 'social network',
                            }],
                            inReplyTo: 1337,
                        }))
                        .toBe(expectedLink);
                });
            });
        });
    });
});
