import {Task}  from '../models/task.js'

import ErrorHandler from "../middlewares/error.js";

export const newTask = async(req,res)=>{

const {description,title} = req.body;


let task =await Task.create({
    description,
    title,
    user:req.user._id
})
res.status(201).json({
    sucess:true,
    task
});
}

export const myTask = async(req,res) =>{
   const userId = req.user._id;

    const task = await Task.find({user:userId});
    res.status(201).json({
        sucess:true,
        task
    })

}
export const updateTask = async(req,res) =>{

    const {id} = req.params;
    const task = await Task.findById(id);
    if (!task) return next(new ErrorHandler("Task not found", 404));
   
    task.isCompleted=!task.isCompleted;


    task.save();
    res.status(201).json({
        sucess :true,
        message:"updated",
        task
    })


}

export const deleteTask = async(req,res,next) =>{

    const {id} = req.params;
    const task = await Task.findById(id);
    if (!task) return next(new ErrorHandler("Task not found", 404));
    task.deleteOne();
    return res.status(201).json({
         sucess:true,
         message:"delted"
    })

}