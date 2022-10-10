import classes from '../../styles/components/UI/link.module.css';

const Link = (props) => {

    const {children, href, onClick, className, color} = props

    let style;
    if (color === 'black') {
        style = `${classes.black}`
    } else if ( color === 'white' ) {
        style = `${classes.white}`
    }

    return <a onClick={onClick} href={href} className={`${style} ${className}`}>{children}</a>
};

export default Link;