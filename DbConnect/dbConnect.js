import mongoose from "mongoose";


export const dbConnect = () =>{
    mongoose.connect(process.env.MONGO_URI,{
    dbName: "CrackiDataBase",
}).then((c)=>{
    console.log(`Database connected`);
}).catch((e)=>{
    console.log(e);
})
}
