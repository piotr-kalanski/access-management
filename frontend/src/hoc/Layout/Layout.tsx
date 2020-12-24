import React, { Fragment } from 'react';
import Toolbar from './Toolbar';
import Footer from './Footer';

const Layout = (props:any) => {
    return (
        <Fragment>
            <Toolbar />
            <div>
                {props.children}
            </div>
            <Footer />
        </Fragment>
    )
}

export default Layout;
