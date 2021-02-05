const Blog=require('../models/blogs')
const saveimg =(img) => Blog.product = img.path.exec()
const create = (user) => Blog.create(user);
const getmyblog =(id) => Blog.findById(id).exec()

const getAll =(query) => Blog.find(query).exec()
const getBytitle = (title) => Blog.find({title}).exec()
var newblog
const update =(id,data,userid) => {
   myblog=Blog.findById(id,function(err,res){
      try{
         if(res.userId==userid){
           newblog= Blog.findByIdAndUpdate(id,data , {new:true}).exec()
           return
         }
      }
     catch{
        return("Un_Authenticated")
     }
   })

   return(myblog)
} 
   
const deleteOne= (id,userid) =>{ 
   myblog=Blog.findById(id,function(err,res){
      try{
         if(res.userId==userid){
            Blog.findByIdAndRemove(id).exec()
         }
      }
     catch{
        return("notfound")
     }
   })
   return("deleted")
} 
const getBlogs = async (query, pagination, author) => {
   if (author == undefined)
     return blogModel.find(query).sort([['updatedAt', -1]]).limit(pagination.limit).skip(pagination.skip).exec();
   else {
     const foundUsers = await getAll(author)
     let blogsIds = []
     foundUsers.forEach(u => {
       blogsIds.push(...u.blogs)
     })
     console.log(...blogsIds)
     return blogModel.find(query).where('_id').in(blogsIds)
       .limit(pagination.limit).skip(pagination.skip).exec();
   }
 }
 const createcomment=(comment,blogid) =>{
    debugger
    Blog.updateOne ({_id:blogid},{$push:{comments:comment}}).exec()
    return comment
 }
const like=(blogid)=>{
return   Blog.findByIdAndUpdate(blogid,{$push:{likes:1}},{new:true}).exec()


}

module.exports={
   create,
   getAll,
   getBytitle,
   update,
   deleteOne,
   saveimg,
   getBlogs,
   getmyblog,
   createcomment,
   like
} 