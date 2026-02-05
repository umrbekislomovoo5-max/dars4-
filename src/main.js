import express from  "express";
import {config} from 'dotenv';
import { getData, addData } from "./utils/file-manage.js";
config()
const app=express();
const PORT=Number(process.env.PORT);
app.use(express.json());
// app.get("/",(req,res)=>{
//     res.status(200).json({message:"success"})
    
// })

// app.post('/',(req,res)=>{
//     // console.log(req.body);
//     res.status(201).json(req.body)
// })
app.get("/", async(req,res)=>{
    const cars=await getData()
    return res.status(200).json(cars)

})

app.get("/cars/:id",async(req,res)=>{
    const cars=await getData()
    const id=Number(req.params.id)
    const car=cars.find(el=>el.id==id)
    if(!car){
        return res.status(404).json({
            message:'not found'
        })
    }
    return res.status(200).json(car)
}
)

app.post('/cars',async(req,res)=>{
    const cars=await getData()
    const id=cars.length ? cars.at(-1)?.id+1:1
     const newCar={
        id, ...req.body
     }
     cars.push(newCar);
     await addData(cars)
     return res.status(201).json(newCar)
})
app.patch('/cars/:id',async(req,res)=>{
    const cars=await getData()
    const id=Number(req.params?.id);;
    const index=cars.findIndex(el=>el.id===id);
    if(index===-1){
        return res.status(404).json({
            message:'car not found'
        })}
        cars[index]={
            id,...req.body};
            await addData(cars);
            return res.status(200).json(cars)
        
    
})
app.delete("/cars/:id",async(req,res)=>{
    const cars=await getData()
    const id=Number(req.params.id)
    const index=cars.findIndex(el=>el.id==id)
    if(index===-1){
        return res.status(404).json({
            message:'not found'
        })
    }
    cars.splice(index,1);
    await addData(cars);
    return res.status(200).json({})

})
app.listen(PORT,()=>{
    console.log('server running on port')
});
