function respondWithJson(res, message = "", status = 400, data = []) {
    return res.status(status).json({
        message,
        status,
        data
    })
}

module.exports = respondWithJson