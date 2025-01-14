import Modal from "react-modal";
import React from "react";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";
import "./ConfirmationModal.css";

Modal.setAppElement("body");

const EditUserModal = ({
  modalIsOpen,
  closeModal,
  editUser,
  success,
  message,
  newRole
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      backgroundColor: "rgb(255,255,255)",
      transform: "translate(-50%, -50%)",
      width: "300px",
      height: "150px",
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: "15px",
      boxShadow: "0px 4px 4px rgba(150, 150, 150, 0.25)"
    }
  };

  const onFormChange = event => {
    newRole = event.target.value;
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      style={customStyles}
      contentLabel="EditUserModal"
    >
      <div className="DeleteUserModal">
        <p className="confirmation__Modal">Select a role for user:</p>
        <section className="roleSelector">
          <select
            id="roles"
            label="roleNames"
            name="roles"
            onChange={onFormChange}
            type="text"
            data-testid="roleSelector"
          >
            <option value="">Select role</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
          </select>
        </section>
        <div className="button__Modal">
          <button onClick={closeModal} className="cancelDelete__Modal">
            Cancel
          </button>
          <button
            onClick={() => {
              editUser(newRole);
              setTimeout(() => closeModal(), 1000);
            }}
            className="confirmDelete__Modal"
          >
            Confirm
          </button>
        </div>
        <ConfirmationMessage success={success} message={message} />
      </div>
    </Modal>
  );
};

export default EditUserModal;
