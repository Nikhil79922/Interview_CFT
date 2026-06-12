import { Handler , NextFunction, Request, Response} from "express";

export const TryCatch = (handle:Handler)=>{
    return async(req:Request, res: Response , next : NextFunction )=>{
        try{
            await handle(req,res,next);
        } catch(err:any){
            console.log("Handler error",err.message)
            next(err);
        }
    }
}