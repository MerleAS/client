"use client"

import { useState } from "react";
import axios from "axios";

import Modal from "../../../../components/UI/modal";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

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

  return (
    <>
      <div className="w-full p-8">
        <h2 className="mt-[5%] w-full flex items-center justify-center text-2xl mb-8">
          Contact
        </h2>
        <div className="w-full flex items-center justify-center">
          <p className="w-full md:w-2/3 lg:w-1/2 text-center leading-9 mb-12">
            MERLE Client Service Center is available Monday to Friday from 10am
            - 9pm (CET) and on Saturday, Sunday from 11am to 7pm (CET)
          </p>
        </div>
        <div className="w-full md:w-4/5 md:mx-[10%] border border-gray-400 flex flex-col space-y-8 md:space-y-16 p-4 md:p-12">
          <h4 className="text-lg font-medium">Write to us</h4>
          <h5 className="text-base font-light">Your information</h5>
          <div className="grid grid-cols-1 md/lg:grid-cols-2 gap-x-10 gap-y-20">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="border-b border-gray-300 focus:outline-none placeholder-opacity-100 placeholder-gray-400"
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="border-b border-gray-300 focus:outline-none placeholder-opacity-100 placeholder-gray-400"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border-b border-gray-300 focus:outline-none placeholder-opacity-100 placeholder-gray-400"
            />
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone number"
              className="border-b border-gray-300 focus:outline-none placeholder-opacity-100 placeholder-gray-400"
            />
          </div>
          <h5 className="text-base font-light">Your request</h5>
          <div className="flex flex-col space-y-20">
            <textarea
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="subject"
              className="border-b border-gray-300 focus:outline-none placeholder-opacity-100 placeholder-gray-400"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="message"
              className="border-b border-gray-300 focus:outline-none placeholder-opacity-100 placeholder-gray-400"
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              className="px-[5%] py-[1%] bg-gray-300 rounded-sm"
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {modal.isActive && (
        <Modal onClose={() => setModal({ isActive: false, message: "" })}>
          <p>{modal.message}</p>
          <button
            onClick={() => setModal({ isActive: false, message: "" })}
            className="px-[5%] py-[1%] bg-black text-white rounded-sm"
          >
            OK
          </button>
        </Modal>
      )}
    </>
  );
};

export default Contact;
