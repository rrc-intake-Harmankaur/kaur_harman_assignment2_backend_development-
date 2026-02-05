import { HTTP_STATUS } from "../../../constrants/httpConstrants"; 
import { Request, Response } from "express";
import * as ticketService from "../services/ticketServices";

export const createTicket = (req: Request, res: Response): 
Response => { 
    const { title, description, priority } = req.body;
    
    if (!title)
        return res 
    .status(HTTP_STATUS.BAD_REQUEST)
    .json({ message: "Missing required field: title" });
    
    if (!description)
        return res
    .status(HTTP_STATUS.BAD_REQUEST)
    .json({ message: "Missing required field: description" }); 
    
    if (!["critical", "high", "medium", "low"].includes(priority)) 
        return res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Invalid priority. Must be one of: critical, high, medium, low", 
    }); 
    
    const ticket = ticketService.createTicket({ title, description, priority });
    return res.status(HTTP_STATUS.CREATED).json(ticket); };
    
export const getAllTickets = (_: Request, res: Response):  
Response => { 
    return res.status(HTTP_STATUS.OK).json(ticketService.getAllTickets()); 
}; 

export const getTicketById = (req: Request, res: Response): 
Response => { 
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id; 
    const ticket = ticketService.getTicketById(id); 
    if (!ticket) return res .status(HTTP_STATUS.NOT_FOUND) .json({ message: "Ticket not found" }); 
    return res.status(HTTP_STATUS.OK).json(ticket); }; 
    export const updateTicket = (req: Request, res: Response): 
    Response => { 
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id; 
        const ticket = ticketService.updateTicket(id, req.body); 
        if (!ticket) 
            return res .status(HTTP_STATUS.NOT_FOUND) .json({ message: "Ticket not found" }); 
        return res.status(HTTP_STATUS.OK).json(ticket); }; 
        
export const deleteTicket = (req: Request, res: Response): 
Response => { 
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id; 
    const deleted = ticketService.deleteTicket(id); 
    if (!deleted) 
        return res .status(HTTP_STATUS.NOT_FOUND) .json({ message: "Ticket not found" }); 
    return res.status(HTTP_STATUS.OK).json({ message: "Ticket deleted" }); }; 
    export const getTicketUrgency = (req: Request, res: Response): 
    Response => { 
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id; 
        const ticket = ticketService.getTicketById(id); 
        if (!ticket) 
            return res .status(HTTP_STATUS.NOT_FOUND) .json({ message: "Ticket not found" }); 
        const urgency = ticketService.calculateUrgency(ticket); 
        return res.status(HTTP_STATUS.OK).json({ ...ticket, urgency });}