import React from "react";

function Contact(props) {
  return (
    <div className="whole">
      <div className="contact-card">
        <img src={props.photo} alt={props.name} className="contact-image" />
        <div className="contact-details">
          <h2 className="contact-name">{props.name}</h2>
          <p className="contact-info">{props.contact}</p>
          <p className="contact-info">{props.mail}</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
