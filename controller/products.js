const Product = require('../models/products')
const cloudinary = require('../cloudinaryConfig')

const getProducts = (req,res)=>{
    Product.find({},(err,productos)=>{
        if(err){
            return res.json({
                success:false,
                productos
            })
        }

        res.json({
            success:true,
            productos,
            length:productos.length
        })
    })
}

const PostProducts =async (req,res)=>{
    let id = req.params.id

    try {
        const result = await cloudinary.uploader.upload(req.file.path)

        let producto = new Product({
            name:req.body.name,
            description:req.body.description,
            cost:req.body.cost,
            image:result.secure_url,
            cloudinary_id:result.public_id
        })
    
        await producto.save((err,result)=>{
            if(err){
                return res.json({
                    success:false,
                    result
                })
            }
    
            res.json({
                success:true,
                result
            })
        })
    } catch (error) {
        console.log(error);
    }

   
}

const UpdateProduct = (req,res)=>{
    let id= req.params.id

    Product.findByIdAndUpdate(id,req.body,{new:true,runValidators:true},(err,result)=>{
        if(err){
            return res.json({
                success:false,
                result
            })
        }

        res.json({
            success:true,
            result
        })
    })
}

const DeleteProduct = (req,res)=>{
    let id = req.params.id

    Product.findByIdAndRemove(id,(err,result)=>{
        if(err){
            return res.json({
                success:false,
                result
            })
        }

        res.json({
            success:true,
            result
        })
    })
}

module.exports = {
    getProducts,
    PostProducts,
    UpdateProduct,
    DeleteProduct
}