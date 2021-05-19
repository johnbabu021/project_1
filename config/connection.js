const MongoClient = require('mongodb').MongoClient
const state = {
    db: null
}

module.exports.connect = function (done) {
    const url = "mongodb://localhost:27017"
    const dbname = 'accident'

    MongoClient.connect(url, (err, data) => {//err and done(err) have no common features
        if (err)
            return done(err)//this is passed to app.js in the if case
        else
            state.db = data.db(dbname)
        done()//else case in app.js is formed here
    })
}
module.exports.get = function () {
    return state.db
} 