const db=require('../config/connection');
const collection=require('../config/collection');
const { response } = require('../app');

const bcrypt=require('bcrypt')


module.exports={

doLogin:(userData)=>{
console.log(userData);
return new Promise(async(resolve,reject)=>{
    let response=function(){}
   let user=await db.get().collection(collection.USER_COLLECTION).findOne({mail:userData.mail})
   console.log(user);
if(user){
    console.log('user is here'+user);

    bcrypt.compare(userData.password,user.password).then((status)=>{
        if(status){
            console.log('success');
            response.status=true;
            response.user=user
            resolve((response))
        }
        else{
            resolve({status:false})
        }
    })
}
else{
    console.log('login failed');
    resolve({status:false})
}
})

},
doSignup:(userData)=>{
  return new Promise(async(resolve,reject)=>{
      userData.password=await bcrypt.hash(userData.password,10);
      userData.cpassword=await bcrypt.hash(userData.cpassword,10)
    db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((response)=>{

        resolve(response.ops[0])
    })

  })
}


}