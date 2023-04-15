function convertObjectResult(result) {
    return {
        value: result
    }
}

function convertArrayResult(result) {
    return {
        value: result,
        count: result.length
    }
}
module.exports = {
    convertObjectResult,
    convertArrayResult
}