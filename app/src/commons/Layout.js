import React, {useState} from 'react';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/core/styles';

import Body from './Body';
import Bar from './Bar';
import Menu from './Menu';
import routes from './routes';
import components from '../pages/components';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    '@global': {
        '.starter': {
            padding: '3rem 1.5rem',
            'text-align': 'center'
        }
    },
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0
    }
}));

export default () => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    return <div className={classes.root}>
        <Bar
            open={open}
            handleDrawerOpen={() => setOpen(true)}
        />
        <div className={classNames(classes.content, {
            [classes.contentShift]: open,
        })}>
            <Body routes={routes(components)}/>
        </div>
        <Menu
            open={open}
            handleDrawerClose={() => setOpen(false)}
        />
    </div>;
};
