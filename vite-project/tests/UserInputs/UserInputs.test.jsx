import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import UserInputs from "../../src/components/UserInputs/UserInputs";

describe("UserInputs Component", () => {
  // Mock for onEdit and onRemove
  const mockOnEdit = vi.fn();
  const mockOnRemove = vi.fn();

  // Sample data
  const users = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      status: "active",
      created: "2022-01-01T00:00:00.000Z",
      updated: "2022-01-02T00:00:00.000Z",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      status: "inactive",
      created: "2022-01-03T00:00:00.000Z",
      updated: "2022-01-04T00:00:00.000Z",
    },
  ];

  it("renders user details correctly", () => {
    render(
      <UserInputs users={users} onEdit={mockOnEdit} onRemove={mockOnRemove} />
    );

    // Check if the user details are rendered properly
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("active")).toBeInTheDocument();
    expect(screen.getByText("Created: 01/01/2022")).toBeInTheDocument();
    expect(screen.getByText("Updated: 01/02/2022")).toBeInTheDocument();

    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByText("inactive")).toBeInTheDocument();
    expect(screen.getByText("Created: 01/03/2022")).toBeInTheDocument();
    expect(screen.getByText("Updated: 01/04/2022")).toBeInTheDocument();
  });

  it("calls onEdit when the edit button is clicked", () => {
    render(
      <UserInputs users={users} onEdit={mockOnEdit} onRemove={mockOnRemove} />
    );

    // Click on edit button
    fireEvent.click(screen.getAllByAltText("Edit")[0]);

    // Check if the mockOnEdit was called with correct user
    expect(mockOnEdit).toHaveBeenCalledWith(users[0]);
  });

  it("calls onRemove when the delete button is clicked", () => {
    render(
      <UserInputs users={users} onEdit={mockOnEdit} onRemove={mockOnRemove} />
    );

    // Click on delete button
    fireEvent.click(screen.getAllByAltText("Delete")[0]);

    // Check if the mockOnRemove was called with the correct user
    expect(mockOnRemove).toHaveBeenCalledWith(users[0]);
  });
});
