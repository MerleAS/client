import { useContext } from "react";

import { StateContext } from "../../context/stateContext";

import Modal from "../UI/modal";

import classes from "../../styles/components/layout/error.module.css";

const error = () => {
  const { errorObject, setErrorObject } = useContext(StateContext);

  
  return (
    <>
      {errorObject.error && (
        <Modal>
          <p className={classes.textBoldLarge}>{errorObject.message}</p>
          <button
            className={classes.button}
            onClick={() => setErrorObject({ error: false, message: "" })}
          >
            Ok
          </button>
        </Modal>
      )}
    </>
  );
};

export default error;
