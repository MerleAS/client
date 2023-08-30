import { useState } from "react";
import axios from "axios";

import Footer from "../../components/layout/footer";
import Header from "../../components/layout/header";
import Modal from "../../components/UI/modal";

import classes from "../../styles/pages/contact.module.css";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  console.log("message", message);

  const [modal, setModal] = useState({ isActive: false, message: "" });

  const submitHandler = async () => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      phoneNumber !== "" &&
      subject !== "" &&
      message !== ""
    ) {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/question/post-question`,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          number: phoneNumber,
          subject: subject,
          question: message,
        }
      );
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setSubject("");
      setMessage("");
      setModal({
        isActive: true,
        message: "Your request has successfully been submited",
      });
    } else
      setModal({
        isActive: true,
        message: "Please fill in all the inputs",
      });
  };

  console.log(modal);

  return (
    <>
      <Header />
      <div className={classes.container}>
        <h2 className={classes.heading}>Contact</h2>
        <p className={classes.info}>
          MERLE Client Service Center is available Monday to Friday from 10am -
          9pm (CET) and on Saturday, Sunday from 11am to 7pm (CET)
        </p>
        <div className={classes.contentContainer}>
          <h4 className={classes.subHeading}>Write to us</h4>
          <h5 className={classes.subHeading2}>Your information</h5>
          <div className={classes.inputGroup}>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className={classes.input}
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className={classes.input}
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={classes.input}
            />
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone number"
              className={classes.input}
            />
          </div>
          <h5 className={classes.subHeading2}>Your request</h5>
          <div className={classes.inputGroup2}>
            <textarea
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="subject"
              className={classes.input}
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="message"
              className={classes.input}
            />
          </div>
          <div className={classes.buttonContainer}>
            <button className={classes.button} onClick={submitHandler}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <Footer />
      {modal.isActive && (
        <Modal onClose={() => setModal({ isActive: false, message: "" })}>
          <p>{modal.message}</p>
          <button
            onClick={() => setModal({ isActive: false, message: "" })}
            className={classes.modalButton}
          >
            OK
          </button>
        </Modal>
      )}
    </>
  );
};

export default Contact;
