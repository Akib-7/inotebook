var mongoose=require('mongoose')

const connectToMongo=()=>{
mongoose.connect("mongodb://127.0.0.1:27017/inotebook").then(()=>{
    console.log('Connected to Mongo Successfully');
})

}
module.exports = connectToMongo;