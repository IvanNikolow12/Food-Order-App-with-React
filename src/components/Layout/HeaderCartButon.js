import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
    const [btnIsHigh, setBtnIsHigh] = useState(false);
    const cartCtx = useContext(CartContext)

    const { items } =cartCtx;

    const numberOfCartItems = cartCtx.items.reduce((curN, item) => {
        return curN + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHigh ? classes.bump : ''}`;

    useEffect(() => {
        if(cartCtx.items.length === 0) {
            return;
        }
        setBtnIsHigh(true);
        const timer = setTimeout(() => {
            setBtnIsHigh(false)
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
}

export default HeaderCartButton;