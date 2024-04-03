import { dbConnect } from "./DbConnect/dbConnect.js";
import { app } from "./app.js";




dbConnect()
app.listen(process.env.PORT, ()=>{
    console.log(`Server Running on port ${process.env.PORT}`);
})