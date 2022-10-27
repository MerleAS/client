import classes from "../../styles/components/UI/modal.module.css";

import useIsMobile from "../util/useIsMobile";

const Modal = ({ onClose, children, className }) => {
  const isMobile = useIsMobile();
  const modalStyles = isMobile
    ? `${classes.mobileModal} ${className}`
    : `${classes.modal} ${className}`;
  return (
    <>
      <div className={classes.backdrop} onClick={onClose}></div>
      <div className={modalStyles}>
        <div className={classes.content}>{children}</div>
      </div>
    </>
  );
};

export default Modal;
