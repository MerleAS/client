import { useReducer } from "react";

import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";

import ArrowUp from "../../public/icons/SVG/arrowUp.svg";
import ArrowDown from "../../public/icons/SVG/arrowDown.svg";
import classes from "../../styles/pages/faq.module.css";

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

const FAQ = ({ initialState, questionsList, heading }) => {
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
        <h2 className={classes.heading}>{heading}</h2>
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

export async function getServerSideProps(context) {
  const query = context.query.qry;
  let questionsList = [];
  let heading;

  if (query === "delivery-and-returns") {
    heading = "DELIVERY AND RETURNS";
    questionsList = [
      {
        question: "SHIPPING",
        anwser:
          "You can choose between different shipping agencies such as helthjem and posten. Helthjem deliveres packages between 2-5 days, and posten in 1-3 working days",
      },
      {
        question: "RETURN",
        anwser:
          "If you regret a purchase from us, the Right of Cancellation Act applies. We have a 14-day right of withdrawal from the date of purchase. If you want to return the item, you must send an email to post@MERLE.no and inform us that you wish to return the item. The package must be sent back to us with tracking from the post office (you pay the shipping cost for the return) and you must send us the tracking number so that we can track the package.All tags and original garment tag/thread must still be attached to the item when returning. We have carefully photographed the item before sending it out and require the item to be returned in the same condition as it was received. We do not tolerate taking back items that have been used or where the tag is no longer attached to the item. We transfer the money back to the card that was used when ordering the item - and you will have the money back 4-10 working days after we have received the item in return.​",
      },
      {
        question: "DELIVERY",
        anwser:
          "Your package will be delivered to your home or a package box near by.",
      },
      {
        question: "IF YOU DONT COLLECT YOUR PACKAGE",
        anwser:
          "If you do not collect the order and are otherwise completely passive, this will not give us any indication as to why the package has not been collected. You will then not have met the requirements set for you in accordance with § 11 and § 13 of the Right of Cancellation Act, and thus lose the right to withdraw from the agreement. When the order is returned as undelivered it will be credited in full (minus the handling charge) and the item(s) will be returned to stock. The handling cost includes postage two ways (NOK 80 x 2), plus an uncollected fee of NOK. 500 - a total of NOK 660.",
      },
    ];
  } else {
    heading = "FREQUENTLY ASKED QUESTIONS";
    questionsList = [
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
  }

  const initialState = [];
  questionsList.forEach(() => {
    initialState.push(false);
  });

  return {
    props: {
      questionsList,
      initialState,
      heading,
    },
  };
}

export default FAQ;
