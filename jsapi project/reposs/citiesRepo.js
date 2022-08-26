let fs = require('fs');
const FILE_NAME = './assets/colors.json';

let colors ={
    
    get: function(resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                 reject(err);
            }
            else{
                resolve(JSON.parse(data));
            }

        });
    } ,
    getByID: function(id, resolve,reject) {
        fs.readFile(FILE_NAME,function(err, data){
            if(err){
                reject(err);
            }
            else{
                let city = JSON.parse(data).find(p=>p.id ==id);
                resolve(color);
            }
        });
    } ,
    search: function(searchObject, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err);
            }
            else{
                let color = JSON.parse(data);
                if (searchObject){
                    color = color.filter(
                        c => (searchObject.id ? c.id == searchObject.id : true) &&
                        (searchObject.name ? c.name.toLowerCase().indexOf(searchObject.name)>=  0 : true ));
                    } 
                    resolve(colors);
                }
        });
    }
};
module.exports = color;