const mariadb = require('mariadb');

const pool = mariadb.createPool({
     host: '172.31.0.45', 
     user:'fernando', 
     password: 'fernando',
     database: 'blog_fer'
});

module.exports = pool;
