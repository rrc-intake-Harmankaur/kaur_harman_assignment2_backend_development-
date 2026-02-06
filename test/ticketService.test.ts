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
    expect(result.urgencyLevel).toBe("Resolved. No further action required");
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
    expect(result.urgencyLevel).toBe("Low urgency. Address when capacity allows.");
    expect(result.urgencyScore).toBeGreaterThanOrEqual(10);
    expect(result.urgencyScore).toBeLessThanOrEqual(25);
  });

  it("should return Moderate message when urgencyScore is between 26 and 35", () => {
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
    expect(result.urgencyLevel).toBe("Moderate. Schedule for attention.");
    expect(result.urgencyScore).toBeGreaterThan(25);
    expect(result.urgencyScore).toBeLessThanOrEqual(35);
  });

  it("should return High urgency message when urgencyScore is between 36 and 45", () => {
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
    expect(result.urgencyLevel).toBe("High urgency. Prioritize resolution.");
    expect(result.urgencyScore).toBeGreaterThan(35);
    expect(result.urgencyScore).toBeLessThanOrEqual(45);
    });
});
