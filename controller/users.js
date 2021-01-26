const User = require('../models/users')
const cloudinary = require('../cloudinaryConfig')
// obtenemos usuarios
const getUsers = (req,res)=>{
    User.find({},(err,usuarios)=>{
        if(err){
            return res.status(400).json({
                success:false,
                err
            })
        }

        res.json({
            success:true,
            usuarios,
            length:usuarios.length
        })
    })
}

// crear nuevos usuarios

const PostUser = async (req,res)=>{
    // console.log(req.file);
    try {
        // subir imagen a cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
         // creamos el nuevo usuario

         let usuario = new User({
            nombre:req.body.nombre,
            apellidos:req.body.apellidos,
            sexo:req.body.sexo,
            email:req.body.email,
            avatar: result.secure_url,
            cloudinary_id: result.public_id
        })

        // guardar usuario con la foto de cloudinary

        await usuario.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    success:false,
                    err
                })
            }

            res.json({
                success:true,
                result
            })
        })

      } catch (err) {
        console.log(err);
      }


    


   
}
// const PostUser =(req,res)=>{
//     console.log(req.body.image);
//     // let usuario = new User({
//     //     nombre:req.body.nombre,
//     //     apellidos:req.body.apellidos,
//     //     sexo:req.body.sexo,
//     //     email:req.body.email
//     // })


//     // usuario.save((err,result)=>{
//     //     if(err){
//     //         return res.status(400).json({
//     //             success:false,
//     //             err
//     //         })
//     //     }

//     //     res.json({
//     //         success:true,
//     //         result
//     //     })
//     // })
// }

// modificar un usuario

const updateUser = (req,res)=>{
    let id = req.params.id
    console.log(req);
    let options ={
        new:true,
        runValidators:true
    }
    User.findByIdAndUpdate(id,req.body,options,(err,result)=>{
        if(err){
            return res.status(400).json({
                success:false,
                err
            })
        }

        res.json({
            success:true,
            result
        })
    })
}


// borrar un usuario de la DB 

const deleteUser = (req,res) =>{
    let id = req.params.id

    User.findByIdAndRemove(id,(err,result)=>{
        if(err){
            res.status(400).json({
                success:false,
                err
            })
        }

        res.json({
            success:true,
            result
        })
    })
}

// exportamos las funciones
module.exports = {
    getUsers,
    PostUser,
    updateUser,
    deleteUser
}