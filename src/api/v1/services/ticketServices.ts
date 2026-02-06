export interface Ticket {
    id: string;
    title: string;
    description: string;
    priority: "critical" | "high" | "medium" | "low";
    status: "open" | "in-progress" | "resolved";
    createdAt: Date;
}

const daysAgo = (days: number): Date => {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
};

export const tickets: Ticket[] = [
  {
    id: "1",
    title: "Update footer copyright year",
    description: "Footer still shows 2024",
    priority: "low",
    status: "open",
    createdAt: daysAgo(3),
  },
  {
    id: "2",
    title: "Profile picture upload slow",
    description: "Upload takes 30+ seconds",
    priority: "medium",
    status: "open",
    createdAt:  daysAgo(3),
  },
  {
    id: "3",
    title: "Dashboard loading slowly",
    description: "Dashboard takes 10+ seconds to load",
    priority: "medium",
    status: "open",
    createdAt: daysAgo(6),
  },
  {
    id: "4",
    title: "Password reset email delayed",
    description: "Reset emails taking over 30 minutes",
    priority: "high",
    status: "open",
    createdAt: daysAgo(7),
  },
  {
    id: "5",
    title: "Export to PDF not working",
    description: "PDF export fails silently",
    priority: "high",
    status: "open",
    createdAt: daysAgo(8),
  },
  {
    id: "6",
    title: "Login page not loading",
    description: "Users report blank screen on login",
    priority: "critical",
    status: "open",
    createdAt: daysAgo(1),
  },
  {
    id: "7",
    title: "Dark mode toggle",
    description: "Dark mode doesn't persist",
    priority: "medium",
    status: "resolved",
    createdAt: daysAgo(5),
  }
];

export const calculateUrgency = (ticket: Ticket): any => {

    const baseScores = {
      critical: 50,
      high: 30,
      medium: 20,
      low: 10,
    };

    const ticketAge =
    (Date.now() - ticket.createdAt.getTime()) / (1000 * 60 * 60 * 24);

    const urgencyScore = baseScores[ticket.priority] + ticketAge * 5;

    const urgencyLevel =
    ticket.status === "resolved"
    ? "Resolved. No further action required"
    :urgencyScore <= 25
    ? "Low urgency. Address when capacity allows."
    : urgencyScore <= 35
    ? "Moderate. Schedule for attention."
    : urgencyScore <= 45
    ? "High urgency. Prioritize resolution."
    : "Critical. Immediately attention required.";

    return {
        ...ticket, 
        ticketAge,
        urgencyScore,
        urgencyLevel,
    };
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