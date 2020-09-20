import React, { useContext, useState, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  // Initialize
  const contactContext = useContext(ContactContext);

  // Destructuring Assignment []
  // useState() return a stateful value, and a function to update it.
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });

  const { addContact, current, clearCurrent, updateContact } = contactContext;
  const { name, email, phone, type } = contact;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
    // @param deps — If present, effect will only activate if the values in the list change.
  }, [contactContext, current]);

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current === null ? "Add Contact" : "Update Contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional
      <div>
        <input
          type="submit"
          value={current === null ? "Add Contact" : "Update Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button
            className="btn btn-light btn-block"
            onClick={() => clearCurrent()}
          >
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
