import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "../../src/App";

// Mock Fetch API
globalThis.fetch = vi.fn();

describe("App Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

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

  it("fetches and displays users", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => users,
    });

    render(<App />);

    // Waiting for users to be fetched and displayed
    await waitFor(() =>
      expect(screen.getByText("John Doe")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("Jane Smith")).toBeInTheDocument()
    );
  });

  it("adds a new user", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => users,
    });

    render(<App />);

    // Waiting for users to be fetched
    await waitFor(() =>
      expect(screen.getByText("John Doe")).toBeInTheDocument()
    );

    // POST request
    fetch.mockResolvedValueOnce({
      json: async () => ({
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice@example.com",
        status: "active",
        created: new Date().toISOString(),
        updated: new Date().toISOString(), // Provide a value for updated
      }),
    });

    // Fill and submit the form
    fireEvent.change(screen.getByPlaceholderText("eg. John"), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByPlaceholderText("eg. Doe"), {
      target: { value: "Johnson" },
    });
    fireEvent.change(screen.getByPlaceholderText("eg. john@gmail.com"), {
      target: { value: "alice@example.com" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "active" },
    });
    fireEvent.click(screen.getByText("Add"));

    // Waiting for new user displayed
    await waitFor(() =>
      expect(screen.getByText("Alice Johnson")).toBeInTheDocument()
    );
  });

  it("edits an existing user", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => users,
    });

    render(<App />);

    // Wait for users to be fetched
    await waitFor(() =>
      expect(screen.getByText("John Doe")).toBeInTheDocument()
    );

    // PUT request
    fetch.mockResolvedValueOnce({
      json: async () => ({
        ...users[0],
        status: "inactive",
        updated: new Date().toISOString(),
      }),
    });

    // Click edit button for first user
    fireEvent.click(screen.getAllByAltText("Edit")[0]);

    // Change status to inactive and submit form
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "inactive" },
    });
    fireEvent.click(screen.getByText("Edit"));

    // Wait for updated user to show
    await waitFor(() =>
      expect(screen.getByText("John Doe")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getAllByText("inactive").length).toBeGreaterThan(0)
    );
  });

  it("removes a user", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => users,
    });

    render(<App />);

    // Wait for users to be fetched
    await waitFor(() =>
      expect(screen.getByText("John Doe")).toBeInTheDocument()
    );

    // DELETE request
    fetch.mockResolvedValueOnce({
      ok: true,
    });

    // Click delete icon for first user
    fireEvent.click(screen.getAllByAltText("Delete")[0]);

    // Wait for user to be removed
    await waitFor(() =>
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument()
    );
  });
});
