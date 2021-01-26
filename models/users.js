const {Schema , model} = require('mongoose');

const usersSchema =new Schema ({
    nombre:{type:String,required:true},
    email:{type:String,required:true,unique:true,match:[/.+\@.+\..+/, 'Por favor ingrese un correo válido']},
    sexo:{type:String,enum:['Masculino','Femenino'],required:true},
    avatar:{type:String,default:'https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-creador-de-avatar-masculino.jpg'},
    apellidos:{type:String,required:true},
    cloudinary_id: {type: String}
},{
    collection:'users',
    // nos devuelve dos parametros en el json de creacion y actualizacion
    timestamps:true
})

// ocultamos propiedades (en este caso __v) de un objeto de mongoose en nodejs en el json response

usersSchema.methods.toJSON= function(){
    let obj = this.toObject();
    delete obj.__v
    return obj
}

module.exports = model('User',usersSchema)
