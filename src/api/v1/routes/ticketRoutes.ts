import { Router } from "express";
import * as ticketController from "../controllers/ticketController";

const router = Router();

// Health check
router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// CRUD
router.post("/tickets", ticketController.createTicket);
router.get("/tickets", ticketController.getAllTickets);
router.get("/tickets/:id", ticketController.getTicketById);
router.put("/tickets/:id", ticketController.updateTicket);
router.delete("/tickets/:id", ticketController.deleteTicket);

// Urgency
router.get("/tickets/:id/urgency", ticketController.getTicketUrgency);

export default router;
