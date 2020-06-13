const user = require('../models/user.model');

exports.register = (req, res ,next ) => {
    
    let new_user = user({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        password : req.body.password,
        created_at: new Date() ,
        updated_at: new Date()
    });

    user.find({ email: new_user.email }, function (err, docs) {
        if (err) { return next(err)}

        if (docs.length == 0) {
            new_user.save( (err ,result ) => {
                if (err) { return next(err)}
               
                data = {
                    status : 'success',
                    code : 200,
                    data : result,
                    message : 'New Account Created Successfully'
                }
                
                res.json(data)
            })
        }else{
            data = {
                status : 'failed',
                code : 201,
                data : {},
                message : 'This Email Already Have an User'
            }
            res.json(data)
        }
    });
    
}

exports.login = (req, res ,next ) => {
    
   let email = req.body.email;
   let password = req.body.password;

    user.find({ email: email }, function (err, user) {
        if (err) { return next(err)}

        if (user.length == 0) {
                data = {
                    status : 'success',
                    code : 404,
                    data : {},
                    message : 'No Account for this Email'
                }              
                res.json(data)
        }else{
            
            if(user[0].password == password ){
                let u = user[0];
                delete u.password; 
                data = {
                    status : 'success',
                    code : 200,
                    data : u,
                    message : 'Successfully Logged in'
                }
                res.json(data)
            }else{
                data = {
                    status : 'failed',
                    code : 201,
                    data : {},
                    message : 'Password is invalid'
                }
                res.json(data)
            }
            
        }
    });
    
}