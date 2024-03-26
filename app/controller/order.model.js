const mongoose=require('mongoose');
const Order=require('../model/orderModel');
//code for creating order
exports.create_order = async (req,res,next)=>{

    try{
const orderObj = new Order({
        _id:new mongoose.Types.ObjectId(),
        product:req.body.productId,
        quantity:req.body.quantity
    })
        const data = await orderObj.save()

    res.status(200).json({
    code:1,
    msg:"Order created successfully",
    data:data,
    //createdProduct:data,
    error:null
});
    }catch(error){
        res.status(500).json({
            code:0,
            msg:"Something Went Wrong",
            data:null,
            error:error
        });
    }
}
//code for getting product list

exports.get_orders = async(req,res,next)=>{
    try{
        const data = await Order.find()
        if(data){
            res.status(200).json({
                code:1,
                message:"This is simple get request for order",
                data:data,
                error:null
            })
        }else{
            res.status(200).json({
                code:1,
                message:"No order available",
                data:null,
                error:null
            })
        }
    }catch(err){
        res.status(500).json({
            code:0,
            message:"Something went wrong",
            data:null,
            error:error
        })
    }
}
//code for getting single product
exports.get_order_ById = async (req,res,next)=>{
    try{
        const data =await Order.findById(req.params.orderId);
        if(data){
            res.status(200).json({
                code:1,
                message:"This is simple get request for single order",
                data:data,
                error:null
            });
        }else{
            res.status(200).json({
                code:1,
                message:"no order is available with given id",
                data:null,
                error:null
            });
        }
    }catch(error){
        res.status(500).json({
            code:0,
            message:"Somthing went wrong",
            data:null,
            error:error
        })
    }
}
//code for deleting product

exports.delete_order = async (req,res,next)=>{
    try{
        const data = await Order.findByIdAndDelete(req.params.orderId);
        if(!data){
            res.status(404).json({
                code:1,
                message:"No order found",
                data:data,
                error:null
            })
        }else{
            res.status(404).json({
                code:1,
                message:"order found and deleted successfully",
                data:data,
                error:null
            })
        }
    }catch(error){
        res.status(500).json({
            code:0,
            message:"Something went wrong",
            data:null,
            error:error
        })
    }
}