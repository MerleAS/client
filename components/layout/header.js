import classes from "../../styles/components/layout/header.module.css";

import Link from '../UI/link';

const Header = (props) => {
  const { className, color } = props;

  return (
    <nav className={`${classes.nav} ${className}`}>
      <div className={classes.navOptions}></div>
      <Link className={classes.logo} href="/" color={color}>MERLE.</Link>
      <div className={classes.navOptions}>
        <Link className={classes.navOption} color={color} href="/search">Search</Link>
        <Link className={classes.navOption} color={color} href="/cart">Cart</Link>
      </div>
    </nav>
  );
};

export default Header;
