import AppBar from '@material-ui/core/AppBar';
import {Container, Button, IconButton, Typography, Toolbar, Link} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import renderHTML from 'react-render-html';
import fetch from "isomorphic-unfetch";
import Index from "../pages";
import Box from "@material-ui/core/Box";
import React from "react";


const useStyles = makeStyles(theme => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    toolbarTitle: {
        flex: 1
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto'
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0
    }
}));

const Header = ({categories}) => {

    const classes = useStyles();

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar className={classes.toolbar}>
                    <Button size="small">Subscribe</Button>
                    <Link href="/about" color="secondary" title="About Us">
                        <Button size="small">About</Button>
                    </Link>
                    <Link href="/contact" color="secondary" title="Contact Us">
                        <Button size="small">Contact</Button>
                    </Link>
                    <Typography
                        component="h2"
                        variant="h5"
                        color="inherit"
                        align="center"
                        noWrap
                        className={classes.toolbarTitle}>
                        GoFooddy
                    </Typography>
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                </Toolbar>
                <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                    {categories && categories.map(category => (
                        <Link
                            color="inherit"
                            noWrap
                            key={category.id}
                            variant="body2"
                            href="#"
                            className={classes.toolbarLink}>
                            {renderHTML(category.name)}
                        </Link>
                    ))}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;