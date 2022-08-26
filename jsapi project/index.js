// bring  in express server
let express = require('express');
let app = express();
let color = require('./reposs/color');
// use express router object
let router = express.Router();


// create Get to return a list of cities

router.get ('/', function(req, res, next){
//res.status(200).send(cities);
color.get(function(data){
    res.status(200).json({
        "status": 200,
        "statusText": "ok",
        "message": "All ok",
        "data":data
    });
}, function(err){
    next(err);
});
});

//create the get/search to search for cities for by id or name
//search?id=n&name=str
router.get ('/search' , function(req, res, next){
    let searchObject = {
        "id": req.query.id,
        "name": req.query.name,
    };
    
    color.search(searchObject, function(data){
        req.status(200).json({
            "status": 200,
            "statusText":"ok",
            "message": "recieved",
            "data": data
        });
        
},function(err){
    next(err);
});

});

//create router uses id calling byid function
router.get('/:id', function(req, res, next){
    color.getByID(req.params.id, function(data){
        if(data){
            res.status(200).json({
                "status":200,
                "StatusText": "super",
                "data": data
            });
        }
        else{
            res.status(404).send({
                "Status": 404,
                "StatusText": "Not found",
                "message": "The city with id " + req.params.id + " could not be found in the system! ",
                "error": {
                    "Code": "Not_Found",
                    "message": "The city with id " + req.params.id + " could not be found in the system! "
                }
            });
        }
    });
});




//configure router so all router all prefixed with api/v1

app.use('/api', router);

//create the server to listen on port 5000
 
var server = app.listen(5000, function(){
    console.log("node server is running on localhost 5000.....")
})