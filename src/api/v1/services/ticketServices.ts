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
    if (ticket.status === "resolved") return "RESOLVED";

    const baseScores = {
        critical: 50,
        high: 30,
        medium: 20,
        low: 10,
    };

    const ageInDays = 
    (Date.now() - ticket.createdAt.getTime()) / (1000 * 60 * 60 * 24);

    const urgencyScore = baseScores[ticket.priority] + ageInDays * 5;

    if (urgencyScore >= 80) return "CRITICAL";
    if (urgencyScore >= 60) return "HIGH";
    if (urgencyScore >= 40) return "MEDIUM";
    return "LOW";
};

