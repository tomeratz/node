// Api Authentication
module.exports.auth = (req, res, next) => {
    let apiKeys = new Map();
    apiKeys.set(global.env.API_KEY, true);
    const apiKey = req.get('X-API-KEY');
    console.log({ apiKey });
    if (apiKeys.has(apiKey)) {
        next()
    }
    else {
        const error = new Error('invalid API key');
        next(error);
    }
}

