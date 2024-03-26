
const express = require('express');
const router = express.Router();
const orderModelRequest = require('../controller/order.model')
//get request for products

router.get("/",orderModelRequest.get_orders)
//post request for product
router.post("/",orderModelRequest.create_order)

//get request for single product

router.get("/:orderId",orderModelRequest.get_order_ById)
//put request for single product

router.put("/:orderId",(req,res,next)=>{
    res.status(200).json({
        msg:"This is simple put request for order"
    })
})
//delete request for single product

router.delete("/:orderId",orderModelRequest.delete_order)

module.exports=router;