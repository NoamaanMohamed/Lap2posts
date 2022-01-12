const db = require('../db_config/config');
const SQL = require('sql-template-strings');

class Post {
    constructor(data) {
        this.title = data.title
        this.name = data.name
        this.body = data.body
    }

    static get all(){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.run(SQL`SELECT * FROM posts`  );
                let posts = result.rows.map(r => new Post(r))
                res(posts)
            } catch (err) {
                rej(`Error retrieving posts: ${err}`)
            }
        })
    }
}

module.exports = Post