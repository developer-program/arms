import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  fireEvent,
  getByText,
  getByPlaceholderText,
  getByLabelText
} from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import NewOccupantForm from "./NewOccupantForm";

describe("Input form", () => {
  it("should have input area for name", () => {
    const { getByLabelText } = render(<NewOccupantForm />);
    expect(getByLabelText("Name")).toBeInTheDocument();
  });

  it("should have input area for employee ID", () => {
    const { getByLabelText } = render(<NewOccupantForm />);
    expect(getByLabelText("EmployeeId")).toBeInTheDocument();
  });

  it("should have input button to submit new occupant attributes", () => {
    const { getByText } = render(<NewOccupantForm />);
    expect(getByText("Create")).toBeInTheDocument();
  });

  it("should detect input for name", () => {
    const { getByLabelText } = render(<NewOccupantForm />);
    const nameInput = getByLabelText("Name");

    fireEvent.change(nameInput, { target: { value: "Tim" } });
    
    expect(nameInput).toHaveAttribute("type", "text");
    expect(nameInput).toHaveValue("Tim");
  });

  it("should detect input for employeeID field", () => {
    const { getByLabelText } = render(<NewOccupantForm />);
    const nameInput = getByLabelText("EmployeeId");

    fireEvent.change(nameInput, { target: { value: "sd123123123" } });

    expect(nameInput).toHaveAttribute("type", "text");
    expect(nameInput).toHaveValue("sd123123123");
  });

  it("should detect input for remarks field", () => {
    const { getByLabelText } = render(<NewOccupantForm />);
    const nameInput = getByLabelText("Remarks");

    fireEvent.change(nameInput, {
      target: { value: "He might need to extend stay by 2 months" }
    });
    expect(nameInput).toHaveAttribute("type", "text");
    expect(nameInput).toHaveValue("He might need to extend stay by 2 months");
  });

  it("should render a create button", () => {
    const { getByText } = render(<NewOccupantForm />);
    const createButton = getByText("Create");

    expect(createButton).toBeInTheDocument();
  });

});