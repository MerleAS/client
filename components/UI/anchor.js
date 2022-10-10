import classes from "../../styles/components/UI/anchor.module.css";
import Link from "next/link";

const Anchor = (props) => {
  const { children, href, onClick, className, color } = props;

  let style;
  if (color === "black") {
    style = `${classes.black}`;
  } else if (color === "white") {
    style = `${classes.white}`;
  }

  return (
    <Link href={href} >
      <a onClick={onClick} className={`${style} ${className}`}>
        {children}
      </a>
    </Link>
  );
};

export default Anchor;
