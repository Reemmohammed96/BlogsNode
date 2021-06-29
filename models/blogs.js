const mongoose=require('mongoose')
const {Schema}=mongoose;
const blogSchema = new Schema({
    title:{
        type: String,
        required: true,
        maxLength: 140,
    },    
    body:{
        type:String,
        maxlength:14000
    },
    likeFlag:{
        type:String,
        default:"unlike"
    },
    tags:[String],
    blogImg:{
        type: String
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    Author:{
        type:String
    },
    authorImg:{
        type:String
    },
    comments:[{
        body:String,
       AuthorId:{
           type:Schema.Types.ObjectId,
           ref:'User'
       },
       AuthorImg:{
           type:String
       },
       AuthorName:String
    }],
    likes: [{type:Schema.Types.ObjectId, ref: 'user'}],
    
})
const blogModel = mongoose.model('Blog', blogSchema);
 module.exports = blogModel;