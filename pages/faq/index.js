import { useState, useReducer } from "react";

import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";

import ArrowUp from "../../public/icons/SVG/arrowUp.svg";
import ArrowDown from "../../public/icons/SVG/arrowDown.svg";
import classes from "../../styles/pages/faq.module.css";

const questionsList = [
  {
    question: "Authenticity",
    anwser:
      "We have a team of experts that authenticates all the pieces on the website",
  },
  {
    question: "Shipping time",
    anwser: "Shipping usually takes between 3-7 days",
  },
  {
    question: "Products",
    anwser:
      "The products sold on this platform are secondhand products, but we make sure to only sell products which are in great condition",
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      const newState = [...state];
      newState[action.payload.index] = !newState[action.payload.index];
      return newState;
    default:
      return state;
  }
};

const initialState = [];
questionsList.forEach((element) => {
  initialState.push(false);
});

const FAQ = () => {
  const [listState, dispatch] = useReducer(reducer, initialState);

  const listHandler = (index) => {
    console.log(index);
    console.log(listState);
    dispatch({ type: "CHANGE", payload: { index: index } });
  };

  return (
    <>
      <Header />
      <div className={classes.container}>
        <h2 className={classes.heading}>FREQUENTLY ASKED QUESTIONS</h2>
        <div className={classes.contentContainer}>
          {questionsList.map((item, index) => (
            <div key={index} className={classes.listItemContainer}>
              <div
                className={classes.questionContainer}
                onClick={() => listHandler(index)}
              >
                <h5>{item.question}</h5>
                {!listState[index] && <ArrowUp height="30" width="30" />}
                {listState[index] && <ArrowDown height="30" width="30" />}
              </div>
              {listState[index] && (
                <div className={classes.awnserContainer}>
                  <p className={classes.text}>{item.anwser}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
