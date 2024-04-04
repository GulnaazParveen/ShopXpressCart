import mongoose from 'mongoose';
const dbconnection=async (database_url)=>{
      try{
           const DB_OPTIONS={
              dbName:"shoppingcart"
           }
           await mongoose.connect(database_url,DB_OPTIONS)
           console.log("datbase connection successfully");
      }catch(error){
        console.log(error);
      }
}
export default dbconnection