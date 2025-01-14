import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  fireEvent,
  waitForElement,
  wait
} from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
import NewOccupantForm from "./NewOccupantForm";
import * as data from "../../api/api";
import Occupant from "../Occupant/Occupant";
import { createMemoryHistory } from "history";

const mockPost = jest.spyOn(data, "createNewOccupant");

describe("Input form", () => {
  it("should contain correct title", () => {
    const { getByText } = render(<NewOccupantForm />);
    expect(getByText("Create New Occupant")).toBeInTheDocument();
  });

  it("should have input text for name", () => {
    const { getByLabelText } = render(<NewOccupantForm />);
    expect(getByLabelText(/name/i)).toBeInTheDocument();
  });

  it("should have input text for employee id", () => {
    const { getByLabelText } = render(<NewOccupantForm />);
    expect(getByLabelText("Employee ID")).toBeInTheDocument();
  });

  it("should have input text for gender", () => {
    const { getByLabelText } = render(<NewOccupantForm />);
    expect(getByLabelText("Gender")).toBeInTheDocument();
  });

  it("should have input text for remarks", () => {
    const { getByLabelText } = render(<NewOccupantForm />);
    expect(getByLabelText("Remarks")).toBeInTheDocument();
  });

  it("should have dropdown for Home Office", () => {
    const { getByLabelText } = render(<NewOccupantForm />);
    expect(getByLabelText("Home Office")).toBeInTheDocument();
  });

  it("should have dropdown for status", () => {
    const { getByLabelText } = render(<NewOccupantForm />);
    expect(getByLabelText("Occupant Status*")).toBeInTheDocument();
  });

  it("should have text", () => {
    const { getByDisplayValue, getByLabelText } = render(<NewOccupantForm />);
    const name = getByLabelText(/name/i);
    fireEvent.change(name, { target: { value: "Bob" } });
    expect(getByDisplayValue("Bob")).toBeInTheDocument();
  });

  it("should fill up input text fields", () => {
    const { getByLabelText } = render(<NewOccupantForm />);

    const name = getByLabelText(/name/i);
    fireEvent.change(name, { target: { value: "Bob" } });

    const employeeId = getByLabelText("Employee ID");
    fireEvent.change(employeeId, { target: { value: "123" } });

    const gender = getByLabelText("Gender");
    fireEvent.change(gender, { target: { value: "male" } });

    const remarks = getByLabelText("Remarks");
    fireEvent.change(remarks, { target: { value: "testing" } });

    const homeOffice = getByLabelText("Home Office");
    fireEvent.change(homeOffice, { target: { value: "Australia, Melbourne" } });

    const status = getByLabelText("Occupant Status*");
    fireEvent.change(status, { target: { value: "allocated" } });

    expect(name.value).toBe("Bob");
    expect(employeeId.value).toBe("123");
    expect(gender.value).toBe("male");
    expect(remarks.value).toBe("testing");
    expect(homeOffice.value).toBe("Australia, Melbourne");
    expect(status.value).toBe("allocated");
  });
});

describe("Confirmation message", () => {
  it("should clear input text when submit button is clicked", async () => {
    mockPost.mockReturnValueOnce("");
    const { getByText, getByLabelText } = render(<NewOccupantForm />);

    const name = getByLabelText(/name/i);
    fireEvent.change(name, { target: { value: "Bob" } });

    const employeeId = getByLabelText("Employee ID");
    fireEvent.change(employeeId, { target: { value: "123" } });

    const gender = getByLabelText("Gender");
    fireEvent.change(gender, { target: { value: "male" } });

    const remarks = getByLabelText("Remarks");
    fireEvent.change(remarks, { target: { value: "testing" } });

    const homeOffice = getByLabelText("Home Office");
    fireEvent.change(homeOffice, { target: { value: "Singapore, Singapore" } });

    const status = getByLabelText("Occupant Status*");
    fireEvent.change(status, { target: { value: "unallocated" } });

    const submitButton = getByText("Create", {
      selector: "input[type=submit]"
    });

    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    await wait(() => {
      expect(name.value).toBe("");
      expect(employeeId.value).toBe("");
      expect(gender.value).toBe("");
      expect(remarks.value).toBe("");
      expect(homeOffice.value).toBe("");
      expect(status.value).toBe("");
    });
  });

  it("should clear form after hitting submit", async () => {
    mockPost.mockReturnValueOnce("");
    const { getByLabelText, getByText } = render(<NewOccupantForm />);

    const nameInput = getByLabelText(/name/i);
    const button = getByText("Create", { selector: "input[type=submit]" });

    fireEvent.change(nameInput, { target: { value: "James Corden" } });
    fireEvent.click(button);

    await wait(() => {
      expect(nameInput.value).toEqual("");
    });
  });

  it("should redirect to Occupants Page on creation", async () => {
    const renderApp = () => {
      const history = createMemoryHistory();
      return render(
        <Occupant history={history} occupants={[]}>
          <NewOccupantForm />
        </Occupant>
      );
    };

    const { getByTestId } = renderApp();

    const OccupantsPage = await waitForElement(() => getByTestId("occupants"));
    expect(OccupantsPage).toBeInTheDocument();
  });

  it("should display failure message when there is an error", async () => {
    const { getByLabelText, getByText } = render(<NewOccupantForm />);

    const nameInput = getByLabelText(/name/i);
    const button = getByText("Create", { selector: "input[type=submit]" });

    fireEvent.change(nameInput, { target: { value: "James Corden" } });
    fireEvent.click(button);

    const failureMessage = await waitForElement(() =>
      getByText("Unable to create new occupant :(")
    );

    expect(failureMessage).toBeInTheDocument();
  });
});

describe("Redirect upon successful submission", () => {
  it("should redirect to Occupants Page on creation", async () => {
    const history = { push: jest.fn() };
    const triggerRender = jest.fn();
    mockPost.mockReturnValueOnce("");

    const { getByLabelText, getByText } = render(
      <NewOccupantForm history={history} triggerRender={triggerRender} />
    );

    await wait(() => {
      const name = getByLabelText(/name/i);
      fireEvent.change(name, { target: { value: "Bob" } });

      const employeeId = getByLabelText("Employee ID");
      fireEvent.change(employeeId, { target: { value: "123" } });

      const gender = getByLabelText("Gender");
      fireEvent.change(gender, { target: { value: "male" } });

      const remarks = getByLabelText("Remarks");
      fireEvent.change(remarks, { target: { value: "testing" } });

      const homeOffice = getByLabelText("Home Office");
      fireEvent.change(homeOffice, {
        target: { value: "Australia, Melbourne" }
      });

      const status = getByLabelText("Occupant Status*");
      fireEvent.change(status, { target: { value: "allocated" } });

      const button = getByText("Create", { selector: "input[type=submit]" });

      fireEvent.click(button);
    });

    expect(history.push).toHaveBeenCalled();
  });
});
