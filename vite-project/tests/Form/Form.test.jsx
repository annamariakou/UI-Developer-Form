import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Form from "../../src/components/Form/Form";

describe("Form Component", () => {
  // onSubmit function
  const mockOnSubmit = vi.fn();

  // Reset mock before test
  beforeEach(() => {
    mockOnSubmit.mockReset();
  });

  it("renders form with empty fields", () => {
    render(<Form onSubmit={mockOnSubmit} />);

    // Check that all fields have empty values
    expect(screen.getByPlaceholderText("eg. John")).toHaveValue("");
    expect(screen.getByPlaceholderText("eg. Doe")).toHaveValue("");
    expect(screen.getByPlaceholderText("eg. john@gmail.com")).toHaveValue("");
    expect(screen.getByRole("combobox")).toHaveValue("");
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("fills and submits the form", () => {
    render(<Form onSubmit={mockOnSubmit} />);

    // Fill form fields
    fireEvent.change(screen.getByPlaceholderText("eg. John"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("eg. Doe"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("eg. john@gmail.com"), {
      target: { value: "john@gmail.com" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "active" },
    });

    // Submit form
    fireEvent.click(screen.getByText("Add"));

    // Check that the mockOnSubmit was called with form data
    expect(mockOnSubmit).toHaveBeenCalledWith({
      firstName: "John",
      lastName: "Doe",
      email: "john@gmail.com",
      status: "active",
    });
  });

  it("validates required fields", () => {
    render(<Form onSubmit={mockOnSubmit} />);

    // Submit the form without filling fields
    fireEvent.click(screen.getByText("Add"));

    // Check that the mockOnSubmit was not called
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("prevents editing if user status is disabled", () => {
    const userToEdit = {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@gmail.com",
      status: "disabled",
    };

    render(<Form userToEdit={userToEdit} onSubmit={mockOnSubmit} />);

    // Check that inputs are read-only and you cannot select
    expect(screen.getByPlaceholderText("eg. John")).toHaveAttribute("readonly");
    expect(screen.getByPlaceholderText("eg. Doe")).toHaveAttribute("readonly");
    expect(screen.getByPlaceholderText("eg. john@gmail.com")).toHaveAttribute(
      "readonly"
    );
    expect(screen.getByRole("combobox")).toBeDisabled();

    // Submit form
    fireEvent.click(screen.getByText("Edit"));

    // Check that mockOnSubmit function was not called
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("edits user data", () => {
    const userToEdit = {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@gmail.com",
      status: "inactive",
    };

    render(<Form userToEdit={userToEdit} onSubmit={mockOnSubmit} />);

    // Check that the form inputs are populated with data
    expect(screen.getByPlaceholderText("eg. John")).toHaveValue("Jane");
    expect(screen.getByPlaceholderText("eg. Doe")).toHaveValue("Smith");
    expect(screen.getByPlaceholderText("eg. john@gmail.com")).toHaveValue(
      "jane@gmail.com"
    );
    expect(screen.getByRole("combobox")).toHaveValue("inactive");

    // Change the status to active
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "active" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Edit"));

    // Check that the mockOnSubmit was called with updated data
    expect(mockOnSubmit).toHaveBeenCalledWith({
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@gmail.com",
      status: "active",
    });
  });
});
