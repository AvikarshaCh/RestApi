const mongoose = require('mongoose')
const User = require('../model/usermodel')
 
//code for post request
exports.create_user = async (req, res, next) => {
    try {
        const userObj = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            Password: req.body.Password
        })
       
        const data = await userObj.save()
        res.status(200).json({
            code: 1,
            msg: "User Created Successfully",
            createduser: data,
            error: null
        });
    } catch (err) {
        res.status(500).json({
            code: 0,
            msg: "Kuch Toh Gadbad Hai Daya",
            createduser: null,
            error: err
        });
    }
}
 
 
//code for get user list
exports.get_users = async (req, res, next) => {
    try {
        const data = await User.find();
        if (data) {
            res.status(200).json({
                code: 1,
                msg: "This is simple get request for user",
                data: data,
                error: null
            })
        } else {
            res.status(200).json({
                code: 1,
                msg: "No data found",
                data: null,
                error: null
            })
        }
    } catch (error) {
        res.status(500).json({
            code: 0,
            msg: "Kuch Toh Gadbad Hai Daya",
            data: null,
            error: error
        })
    }
}
 
//code for getting single user
exports.get_user_ById = async (req, res, next) => {
    try {
        const data = await User.findById(req.params.userId);
        if (data) {
            res.status(200).json({
                code: 1,
                msg: "This is simple get request for single user",
                data: data,
                error: null
            })
        }else{
            res.status(200).json({
                code: 1,
                msg: "No user available for given ID",
                data: null,
                error: null
            })
        }
 
    } catch (error) {
        res.status(500).json({
            code: 0,
            msg: "Kuch Toh Gadbad Hai Daya",
            data: null,
            error: error
        })
    }
}
 
//code for update single user
exports.update_user = async (req, res, next) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.userId,req.body,{new:true,runValidator:true});
        if (data) {
            res.status(200).json({
                code: 1,
                msg: "This is simple put request for single user",
                data: data,
                error: null
            })
        }else{
            res.status(200).json({
                code: 1,
                msg: "No user available for given ID",
                data: null,
                error: null
            })
        }
 
    } catch (error) {
        res.status(500).json({
            code: 0,
            msg: "Kuch Toh Gadbad Hai Daya",
            data: null,
            error: error
        })
    }
}
 
 
//code for delete single user
exports.delete_user = async (req, res, next) => {
    try {
        const data = await User.findByIdAndDelete(req.params.userId);
        if (!data) {
            res.status(404).json({
                code: 1,
                msg: "No user found",
                data: data,
                error: null
            })
        }else{
            res.status(404).json({
                code: 1,
                msg: "User Found and User Deleted",
                data: data,
                error: null
            })
        }
 
    } catch (error) {
        res.status(500).json({
            code: 0,
            msg: "Kuch Toh Gadbad Hai Daya",
            data: null,
            error: error
        })
    }
}
 
 