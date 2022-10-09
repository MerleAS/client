import classes from '../../styles/components/layout/header.module.css'

const Header = (props) => {

    const {className } = props;
    return (
        <nav className={`${classes.nav} ${className}`}>
        <div className={classes.navOptions}></div>
        <a className={classes.logo}>MERLE.</a>
        <div className={classes.navOptions}>
          <a className={classes.navOption}>Search</a>
          <a className={classes.navOption}>Cart</a>
        </div>
      </nav>
    )
}

export default Header;