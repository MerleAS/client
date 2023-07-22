import classes from "../../styles/components/UI/modal.module.css";

import useIsMobile from "../util/useIsMobile";

const Modal = ({ onClose, children }) => {
  const isMobile = useIsMobile();
  const modalStyles = isMobile ? {width: '16rem'} : {width: '26rem'}
  return (
    <>
      <div className={classes.backdrop} onClick={onClose}></div>
      <div className={classes.modal} style={modalStyles}>
        <div className={classes.content}>{children}</div>
      </div>
    </>
  );
};

export default Modal;
