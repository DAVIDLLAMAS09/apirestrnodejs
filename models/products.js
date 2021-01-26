const {Schema,model } = require('mongoose')

const productsSchema = new Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    cost:{type:Number,required:true},
    image:{type:String,default:'https://res.cloudinary.com/dd0czbbje/image/upload/v1611618854/pzfjzgznspzvst8unwx4.png'},
    available:{type:Boolean,default:true},
    cloudinary_id: {type: String}
},
{
    collection:'products',
    timestamps:true
})

productsSchema.methods.toJSON = function(){
    let obj = this.toObject()
    delete obj.__v
    return obj
}


module.exports = model('Products',productsSchema)