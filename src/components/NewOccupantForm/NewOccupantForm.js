import React, { useState } from "react";
import "./NewOccupantForm.css";
import Input from "../Input/Input";
import TextArea from "../Input/TextArea";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";
import { createNewOccupant } from "../../api/api";
import homeOfficeData from "../../assets/HomeOfficeData";

const NewOccupantForm = props => {
  const emptyForm = {
    name: "",
    employeeId: "",
    gender: "",
    remarks: "",
    homeOffice: "",
    status: ""
  };

  const [formInputs, setFormInputs] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const onFormChange = event => {
    const { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const onFormSubmit = async event => {
    try {
      event.preventDefault();

      const response = await createNewOccupant(
        formInputs.name,
        formInputs.employeeId,
        formInputs.gender,
        formInputs.remarks,
        formInputs.homeOffice,
        formInputs.status
      );

      setMessage(response);
      setSuccess(true);
      setSubmitted(true);
      setFormInputs(emptyForm);

      props.triggerRender();
      props.history.push(`/occupants`);
    } catch (err) {
      setMessage("Unable to create new occupant :(");
      setSuccess(false);
      setSubmitted(true);
    }
  };

  return (
    <form className="occupantFormContainer" onSubmit={onFormSubmit}>
      <h1 className="occupantForm__heading">Create New Occupant</h1>
      <div className="occupantForm">
        <Input
          id="name"
          label="Name*"
          name="name"
          onChange={onFormChange}
          value={formInputs.name}
          type="text"
          required
        />
        <Input
          id="employee-id"
          label="Employee ID"
          name="employeeId"
          onChange={onFormChange}
          value={formInputs.employeeId}
          type="text"
        />
        <div className="occupantForm__split">
          <section>
            <label htmlFor="gender" className="occupantForm__genderLabel">
              Gender
            </label>
            <select
              id="gender"
              label="Gender"
              name="gender"
              onChange={onFormChange}
              value={formInputs.gender}
              type="text"
            >
              <option value="">Select Gender...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="neutral">Neutral</option>
            </select>
          </section>
          <section>
            <label
              htmlFor="homeOffice"
              className="occupantForm__homeOfficeLabel"
            >
              Home Office
            </label>
            <select
              id="homeOffice"
              name="homeOffice"
              onChange={onFormChange}
              value={formInputs.homeOffice}
              type="text"
            >
              <option value="">Select Home Office...</option>
              {homeOfficeData.map(homeOffice => {
                const keys = Object.keys(homeOffice);
                const values = homeOffice[keys];
                return keys.map(country => {
                  return values.map(city => {
                    return (
                      <option key={city} value={`${country}, ${city}`}>
                        {country}, {city}
                      </option>
                    );
                  });
                });
              })}
            </select>
          </section>
        </div>
        <section>
          <label htmlFor="status" className="occupantForm__statusLabel">
            Occupant Status*
          </label>
          <select
            id="status"
            name="status"
            required
            value={formInputs.status}
            onChange={onFormChange}
          >
            <option value="">Select...</option>
            <option value="allocated">Allocated</option>
            <option value="unallocated">Unallocated</option>
            <option value="inactive">Inactive</option>
          </select>
        </section>
        <TextArea
          id="remarks"
          label="Remarks"
          name="remarks"
          className="occupantForm__remarks"
          onChange={onFormChange}
          value={formInputs.remarks}
          type="text"
        />
      </div>
      {submitted ? (
        <ConfirmationMessage success={success} message={message} />
      ) : (
        ""
      )}
      <input
        className="occupantForm__createButton"
        value="Create"
        type="submit"
      />
    </form>
  );
};

export default NewOccupantForm;
