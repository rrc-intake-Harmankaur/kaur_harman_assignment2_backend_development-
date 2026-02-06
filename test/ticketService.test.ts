import { calculateUrgency, Ticket } from "../src/api/v1/services/ticketServices";

describe("ticketService.calculateUrgency", () => {
  it("should return RESOLVED message when ticket status is resolved", () => {
    // Arrange
    const ticket: Ticket = {
      id: "1",
      title: "Test",
      description: "Test",
      priority: "low",
      status: "resolved",
      createdAt: new Date(),
    };

    // Act
    const result = calculateUrgency(ticket);

    // Assert
    expect(result).toBe("Resolved. No further action required.");
  });

  it("should return Low urgency message when urgencyScore <= 25", () => {
    // Arrange (low priority, age ~0 days => score ~10)
    const ticket: Ticket = {
      id: "2",
      title: "Test",
      description: "Test",
      priority: "low",
      status: "open",
      createdAt: new Date(),
    };

    // Act
    const result = calculateUrgency(ticket);

    // Assert
    expect(result).toBe("Low urgency. Address when capacity allows.");
  });

  it("should return Moderate message when urgencyScore is between 26 and 35", () => {
    // Arrange (high priority base 30 + age ~0 => score ~30)
    const ticket: Ticket = {
      id: "3",
      title: "Test",
      description: "Test",
      priority: "high",
      status: "open",
      createdAt: new Date(),
    };

    // Act
    const result = calculateUrgency(ticket);

    // Assert
    expect(result).toBe("Moderate. Schedule for attention.");
  });

  it("should return High urgency message when urgencyScore is between 36 and 45", () => {
    // Arrange: high base 30 + age 2 days => 30 + (2*5)=40
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

    const ticket: Ticket = {
      id: "4",
      title: "Test",
      description: "Test",
      priority: "high",
      status: "open",
      createdAt: twoDaysAgo,
    };

    // Act
    const result = calculateUrgency(ticket);

    // Assert
    expect(result).toBe("High urgency. Prioritize resolution.");
  });
});
