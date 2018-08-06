const isString = (value) => typeof value === 'string';
const isNumber = (value) => typeof value === 'number';
const TWITTER_INTENT_URL = 'https://twitter.com/intent/tweet';

/**
 * @param {String} text
 * @return {Object}
 */
function textEntity(text) {
    return {
        name: 'text',
        value: encodeURIComponent(text),
    };
}

/**
 * @param {String} url
 * @return {Object}
 */
function urlEntity(url) {
    return {
        name: 'url',
        value: encodeURIComponent(url),
    };
}

/**
 * @param {Array} hashtags
 * @return {Object}
 */
function hashtagsEntity(hashtags) {
    return {
        name: 'hashtags',
        value: hashtags.join(','),
    };
}

/**
 * @param {String} via
 * @return {Object}
 */
function viaEntity(via) {
    return {
        name: 'via',
        value: via,
    };
}

/**
 * @param {Array} related
 * @return {Object}
 */
function relatedEntity(related) {
    const ENCODED_SEPARATOR = encodeURIComponent(',');
    const value = related.map((item) => {
        const encodedDescription = encodeURIComponent(item.description);
        return `${item.username}${ENCODED_SEPARATOR}${encodedDescription}`;
    }).join(',');

    return {
        name: 'related',
        value,
    };
}

/**
 * @param {String} inReplyTo
 * @return {Object}
 */
function inReplyToEntity(inReplyTo) {
    return {
        name: 'in-reply-to',
        value: inReplyTo,
    };
}

/**
 * @description
 * Create a Web Intent for Twitter link
 *
 * @param {Object} params
 * @param {String} params.text
 * @param {String} params.url
 * @param {Array} params.hashtags
 * @param {String} params.via
 * @param {Array} params.related
 * @param {Number} params.inReplyTo
 *
 * @return {String}
 */
function createLink(params) {
    const {
        text,
        url,
        hashtags,
        via,
        related,
        inReplyTo,
    } = params;

    const qsEntities = [];

    if (text) {
        if (!isString(text)) {
            throw new Error('text must be a {String}');
        }
        qsEntities.push(textEntity(text));
    }

    if (url) {
        if (!isString(url)) {
            throw new Error('url must be a {String}');
        }
        qsEntities.push(urlEntity(url));
    }

    if (hashtags) {
        if (!Array.isArray(hashtags)) {
            throw new Error('hashtags must be a {Array}');
        }
        if (hashtags.length === 0) {
            throw new Error('hashtags list must not be empty');
        }
        if (hashtags.some((tag) => !isString(tag))) {
            throw new Error('hashtags list must contain only {String} elements');
        }
        qsEntities.push(hashtagsEntity(hashtags));
    }

    if (via) {
        if (!isString(via)) {
            throw new Error('via must be a {String}');
        }
        qsEntities.push(viaEntity(via));
    }

    if (related) {
        if (!Array.isArray(related)) {
            throw new Error('related must be a {Array}');
        }
        if (related.length === 0) {
            throw new Error('related list must not be empty');
        }
        qsEntities.push(relatedEntity(related));
    }

    if (inReplyTo) {
        if (!isNumber(inReplyTo)) {
            throw new Error('inReplyTo must be a {Number}');
        }
        qsEntities.push(inReplyToEntity(inReplyTo));
    }

    const query = qsEntities.length === 0 ? '' : '?';
    const qs = qsEntities.map((entity) => `${entity.name}=${entity.value}`).join('&');

    return `${TWITTER_INTENT_URL}${query}${qs}`;
}

module.exports = createLink;
