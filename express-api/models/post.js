const db = require('../db_config/config');
const SQL = require('sql-template-strings');
const { post } = require('../controllers/posts');

class Post {
    constructor(data) {
        this.id = data.id
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

    static findById(id){
        return new Promise (async (res, rej) => {
            try {
                let postData = await db.run('SELECT * FROM posts WHERE id = $1;', [ id ]);
                let post = new Post(postData.rows[0]);
                res(post);
            } catch (err) {
                rej('Post not found');
            };
        });
    };

    static create(title,name,body){
        return new Promise (async (resolve, reject) => {
            try {
                let postData = await db.run('INSERT INTO posts (title, name, body) VALUES ($1,$2,$3) RETURNING *;', [ title,name,body ]);
                let post = new Post(postData.rows[0]);
                resolve (post);
            } catch (err) {
                reject('Post could not be created');
            };
        });
    };
}

module.exports = Post