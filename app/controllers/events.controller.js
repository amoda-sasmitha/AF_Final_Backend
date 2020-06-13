const event = require('../models/event.model');

exports.insert = (req, res ,next ) => {
    console.log(req.body);
    let new_event = event({
        title: req.body.title,
        date: req.body.date,
        uid : req.body.uid,
        description: req.body.description,
        banner_image: req.file.path,
        created_at: new Date() ,
        updated_at: new Date()
    });

    new_event.save( (err ,result ) => {
        if (err) { return next(err)}
       
        data = {
            status : 'success',
            code : 200,
            data : result,
            message : 'event Added Successfully'
        }
        
        res.json(data)
    })
}

exports.getAll = (req, res ,next ) => {
    
    event.find({} , (err, result) => {
        if(err){ return next(err) }

        data = {
            status : 'success',
            code : 200,
            data : result
        }
    
        res.json(data);
    });
}

exports.getalluser = (req, res ,next ) => {
    
    event.find({ uid : req.params.userid } , (err, result) => {
        if(err){ return next(err) }

        data = {
            status : 'success',
            code : 200,
            data : result
        }
    
        res.json(data);
    });
}

exports.getsingle = (req, res ,next ) => {
    
    event.find({ _id : req.params.id } , (err, result) => {
        if(err){ return next(err) }

        data = {
            status : 'success',
            code : 200,
            data : result.length > 0 ? result[0] : {}
        }
    
        res.json(data);
    });
}

exports.update = (req, res ,next ) => {
    const id = req.params.id
    event.findOne({ _id : id } , (err, found_event ) => {
        if(err){ return next(err) }

        //if object not found
        if(!found_event){
            res.status(404).send();
        }else{

            //if title changed
            if( req.body.title ){ found_event.title = req.body.title }

            //if date changed
            if( req.body.date){ found_event.date = req.body.date }

            //if description changed
            if( req.body.description){ found_event.description = req.body.description }


            found_event.updated_at = new Date();

            found_event.save( (err , updated_object) => {
                if(err){ return next(err) }
                
                data = {
                    status : 'success',
                    code : 200,
                    data : updated_object,
                    message : 'Successfully Updated'
                }
                res.json(data);

            })

        }
    });
}

exports.delete = (req,res,next) => {
   
    const id = req.params.id
    event.findOne({ _id : id } , (err, found_event ) => {
        if(err){ return next(err) }

        //if object not found
        if(!found_event){
            res.status(404).send();
        }else{
            found_event.remove( (err, result) => {
                if(err){ return next(err) }

                data = {
                    status : 'success',
                    code : 200,
                    data : result,
                    message : 'Successfully Removed'
                }
                res.json(data);

            })
        }
    }) 
}