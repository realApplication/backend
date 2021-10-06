'use strict'
const {counterSchema}=require('../models/index')

const setCounter=async (idbook,counterbook)=>{
    
    let iddx = idbook.toString();
    let count = counterbook.toString();
   
   try {       
    let counterData = await counterSchema.findOne({where:{idbook:iddx}})
    let id =  counterData.dataValues.id;
    let data={
        idbook:iddx,
        counter:count
    } 
    await counterSchema.update(data,{where:{id:id}})  
    console.log('counter ', data.counter);
     return data.counter
    } 
    catch(err){
        console.log(' not found' , err.message);   
    }
   
}
const getCounter=async (id)=>{
    // let idx = id.toString(); 
    console.log('id------------>',id);
    try{
        let counterData = await counterSchema.findOne({where:{idbook:id}});
        console.log('counterData---------->',counterData);
        return counterData.dataValues.counter
    }
    catch(e){
        console.log(e);
    }
   
  
}
module.exports = {setCounter,getCounter}