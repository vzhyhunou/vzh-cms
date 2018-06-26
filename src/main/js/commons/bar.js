'use strict';

import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import Locale from './locale';

const styles = {
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1
    }
};

export default withStyles(styles)(({classes, ...props}) =>
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    color="inherit"
                    href="/"
                >
                    <HomeIcon/>
                </IconButton>
                <Typography
                    variant="title"
                    color="inherit"
                    className={classes.flex}
                >
                    Project
                </Typography>
                <Locale {...props}/>
                <IconButton
                    color="inherit"
                    href={`/admin#/${props.path[0]}/${props.path[1]}`}
                >
                    <EditIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    </div>
);
