import { useContext } from "react";

import { StateContext } from "../../context/stateContext";
import Modal from "../UI/modal";

const Error = () => {
  const { errorObject, setErrorObject } = useContext(StateContext);
  return (
    <>
      {errorObject.error && (
        <Modal>
          <p className="text-lg font-medium my-[5%]">{errorObject.message}</p>
          <button
            className="bg-black w-1/4 h-[40px] border border-black rounded-sm text-white mb-[5%]"
            onClick={() => setErrorObject({ error: false, message: "" })}
          >
            Ok
          </button>
        </Modal>
      )}
    </>
  );
};

export default Error;
