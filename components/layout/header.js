import classes from "../../styles/components/layout/header.module.css";

import Anchor from '../UI/anchor';

const Header = (props) => {
  const { className, color } = props;

  return (
    <nav className={`${classes.nav} ${className}`}>
      <div className={classes.navOptions}></div>
      <Anchor className={classes.logo} href="/" color={color}>MERLE.</Anchor>
      <div className={classes.navOptions}>
        <Anchor className={classes.navOption} color={color} href="/search">Search</Anchor>
        <Anchor className={classes.navOption} color={color} href="/cart">Cart</Anchor>
      </div>
    </nav>
  );
};

export default Header;
