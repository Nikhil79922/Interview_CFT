import { Request, Response } from "express";
import { UsageService } from "./usage.service";
import { createUsageSchema,userIdParamSchema } from "./usage.validation";
import { sendResponse } from "../../shared/constants/successRes";
import { TryCatch } from "../../shared/constants/tryCatch";

export class UsageController {

    private usageService = new UsageService();

    createUsage = TryCatch( async (req: Request,res: Response) => {
            const validatedData = createUsageSchema.parse(req.body);
            const usage = await this.usageService.createUsage(validatedData);
            sendResponse(res, 201 , 'Usage Readed successFull',usage);
    } );

    getCurrentUsage = TryCatch(async (req: Request,res: Response) => {
            const { id } =userIdParamSchema.parse(req.params);
            const data =await this.usageService.getCurrentUsage(id);
            sendResponse(res,200,"Current usage fetched successfully",data);
    });

    getBillingSummary = TryCatch(async (req: Request,res: Response) => {
            const { id } =userIdParamSchema.parse(req.params);
            const data =await this.usageService.getBillingSummary(id);
            sendResponse(res,200,"Billing summary fetched successfully",data);
        }
    );
}