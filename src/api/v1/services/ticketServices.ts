export interface Ticket {
    id: string;
    title: string;
    description: string;
    priority: "critical" | "high" | "medium" | "low";
    status: "open" | "in-progress" | "resolved";
    createdAt: Date;
}

export const tickets: Ticket[] = [];

export const calculateUrgency = (ticket: Ticket): string => {
    if (ticket.status === "resolved") {
        return "Resolved. No further action required.";
    }

    const baseScores = {
        critical: 50,
        high: 30,
        medium: 20,
        low: 10,
    };

    const ageInDays = 
    (Date.now() - ticket.createdAt.getTime()) / (1000 * 60 * 60 * 24);

    const urgencyScore = baseScores[ticket.priority] + ageInDays * 5;

    const UrgencyLevel = 
        urgencyScore <= 25
        ? "Low urgency. Address when capacity allows."
        : urgencyScore <= 35
        ? "Moderate. Schedule for attention."
        :urgencyScore <=45
        ? "High urgency. Prioritize resolution."
        : "Critical. Immediately attention required.";

        return UrgencyLevel;
};

export const getAllTickets = (): Ticket[] => structuredClone(tickets);

export const getTicketById = (id: string): Ticket | undefined =>
    tickets.find(t => t.id === id);

export const createTicket = (
    data: Omit<Ticket, "id" | "status" | "createdAt">
): Ticket => {
    const ticket: Ticket = {
        id: Date.now().toString(),
        ...data,
        status: "open",
        createdAt: new Date(),
    };
    tickets.push(ticket);
    return ticket;
};

export const updateTicket = (
    id: string,
    updates: Partial<Ticket>
): Ticket | undefined => {
    const ticket = tickets.find(t => t.id === id);
    if (!ticket) return undefined;
    Object.assign(ticket, updates);
    return ticket;
};

export const deleteTicket = (id: string): boolean => {
    const index = tickets.findIndex(t => t.id === id);
    if (index === -1) return false;
    tickets.splice(index, 1);
    return true;
};