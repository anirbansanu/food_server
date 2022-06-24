const mysql = require('mysql');


const pool = mysql.createPool(
    {
        connectionLimit : 10, //important
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'data',
        debug    :  false
});

const db = {
    getUsersFeilds: ()=>{
        return new Promise((resolve,reject)=>{
            pool.query(`SELECT column_name FROM information_schema.columns WHERE table_schema = 'users' AND table_name = 'users'`,
            (err,result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            })
        })
    },
    getAdmin: (id)=>{
        return new Promise((resolve, reject)=>{
            pool.query(`SELECT * FROM admin WHERE id = ${id}`, (err,result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            })
        })
    },
    setLike: (bool,id)=>{
        return new Promise((resolve, reject)=>{
            if(bool === true)
            {
                
                pool.query(`UPDATE movies SET likee = "1" WHERE movies.id = ${id} AND movies.likee = "0"`,(err,result)=>{
                    if(err){
                        return reject(err);
                    }
                    return resolve(result);
                })
            }
            else{
                pool.query(`UPDATE movies SET likee = "0" WHERE movies.id = ${id} AND movies.likee = "1"`,(err,result)=>{
                    if(err){
                        return reject(err);
                    }
                    return resolve(result);
                })
            }
            
        })
    },
    /**
     * @param {int} id Pass Movies ID (as form of Int) 
     * @param {Object} data Pass Values (as form of Object) which you want to update .
     */
    updateMovies: (id,data)=>{
        return new Promise((resolve, reject)=>{
            try{
                pool.query(`UPDATE movies SET title = ?, genre = ?, stock = ? WHERE movies.id = ?`,[data.title, data.genre, data.stock, id],(err,result)=>{
                    if(err){
                        return reject(err);
                    }
                    return resolve(result);
                })
            }
            catch (err){
                return reject(err);
            }
               
        })
    },
    delMovies: (id)=>{
        return new Promise((resolve, reject)=>{
            pool.query(`DELETE FROM movies WHERE movies.id = ?`,[id],(err,result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            })
        })
    },
    getGenres: ()=>{
        return new Promise((resolve, reject)=>{
            pool.query(`SELECT * FROM genre`,(err,result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            })
        })
    },
    getGenre: (id)=>{
        return new Promise((resolve, reject)=>{
            pool.query(`SELECT * FROM genre WHERE id = ?`,[id],(err,result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result[0]);
            })
        })
    }
}

const user = {
    auth: (data)=>{
        return new Promise((resolve, reject)=>{
            pool.query(`SELECT * FROM users WHERE user_id = "${data.user_id}" AND password = ${data.password}`, (err,result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            })
        })
    },
    getUsers: ()=>{
        return new Promise((resolve, reject)=>{
            pool.query(`SELECT * FROM users`, (err,result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            })
        })
    },
    getUser: (id)=>{
        return new Promise((resolve, reject)=>{
            pool.query(`SELECT * FROM users WHERE id = ${id}`, (err,result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            })
        })
    },
    setUser: (obj,filePath)=>{
        return new Promise((resolve, reject)=>{
            pool.query(`INSERT INTO users (name, file, user_id, password) VALUES(?,?,?,?)`,[obj.name, obj.path, obj.user_id, obj.password], (err,result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            })
        })
    },
}

const product = {
    getAll: ()=>{
        return new Promise((resolve, reject)=>{
            pool.query(`SELECT 
            p.id, p.name, p.brand_name, p.description, p.file, DATE_FORMAT(p.date,'%d/%m/%y') AS date, p.price , u.u_id, u.city, u.district, u.state, c.cat_name FROM products AS p 
            INNER JOIN users AS u ON u.u_id = p.seller_id 
            INNER JOIN category AS c ON c.id = p.category_id`, 
            (err,result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            })
        })
    },
    getAllByUser: (id)=>{
        return new Promise((resolve, reject)=>{
            pool.query(`SELECT 
            p.id, p.name, p.description, p.file, p.fileone, p.filetwo, p.filethree, p.filefour, DATE_FORMAT(p.date,'%d/%m/%y') AS date, p.price , 
            u.u_id, u.city, u.district, u.state, c.cat_name FROM products AS p 
            INNER JOIN users AS u ON u.u_id = p.seller_id 
            INNER JOIN category AS c ON c.id = p.category_id
            WHERE p.seller_id = ${id}`, 
            (err,result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            })
        })
    },
    getByUser: (p_id,u_id)=>{
        return new Promise((resolve, reject)=>{
            pool.query(`SELECT 
            p.id, p.name, p.description, p.file, p.fileone, p.filetwo, p.filethree, p.filefour, DATE_FORMAT(p.date,'%d/%m/%y') AS date, p.views, p.purchasing_date, p.price , u.u_id, u.f_name, u.l_name, u.phone, u.email, u.city, u.district, u.state, c.cat_name FROM products AS p 
            INNER JOIN users AS u ON u.u_id = p.seller_id 
            INNER JOIN category AS c ON c.id = p.category_id WHERE p.id = ${p_id} AND p.seller_id = ${u_id}`, (err,result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            })
        })
    },
    get: (id)=>{
        return new Promise((resolve, reject)=>{
            pool.query(`SELECT 
            p.id, p.name, p.brand_name, p.description, p.file, p.fileone, p.filetwo, p.filethree, p.filefour,  DATE_FORMAT(p.date,'%d/%m/%y') AS date, p.views, p.purchasing_date, p.price , p.category_id AS cat_id, u.u_id, u.f_name, u.l_name, u.phone, u.email, u.city, u.district, u.state, c.cat_name FROM products AS p 
            INNER JOIN users AS u ON u.u_id = p.seller_id 
            INNER JOIN category AS c ON c.id = p.category_id WHERE p.id = ${id}`, (err,result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            })
        })
    },
    set: (obj)=>{
        return new Promise((resolve, reject)=>{
            pool.query(`INSERT INTO products 
            (name, description,	brand_name, file, fileone, filetwo, filethree, filefour, price, purchasing_date, seller_id, category_id, date) 
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,NOW())`,
            [obj.name, obj.description, obj.brand_name, obj.file, obj.fileone, obj.filetwo, obj.filethree, obj.filefour, obj.price, obj.purchasing_date, obj.seller_id, obj.category_id], 
            (err,result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            })
        })
    },
    update: (obj)=>{
        return new Promise((resolve, reject)=>{
            pool.query(`INSERT INTO products 
            (name, description,	brand_name, file, fileone, filetwo, filethree, filefour, price, purchasing_date, seller_id, category_id, date) 
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,NOW())`,
            [obj.name, obj.description, obj.brand_name, obj.file, obj.fileone, obj.filetwo, obj.filethree, obj.filefour, obj.price, obj.purchasing_date, obj.seller_id, obj.category_id], 
            (err,result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            })
        })
    },
    del: (id)=>{
        return new Promise((resolve, reject)=>{
            pool.query(`DELETE FROM products WHERE products.id = ?`,[id],(err,result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            })
        })
    }
}
const cat = {
    getall: ()=>{
        return new Promise((resolve, reject)=>{
            pool.query(`SELECT * FROM category`, (err,result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            })
        })
    },
    set: (obj)=>{
        return new Promise((resolve, reject)=>{
            pool.query(`INSERT INTO category (cat_name) VALUES(?)`,[obj.cat_name], (err,result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            })
        })
    },
    del: (id)=>{
        return new Promise((resolve, reject)=>{
            pool.query(`DELETE FROM category WHERE category.id = ?`,[id],(err,result)=>{
                if(err){
                    return reject(err);
                }
                return resolve(result);
            })
        })
    }
}
module.exports = {db,user,product,cat};
