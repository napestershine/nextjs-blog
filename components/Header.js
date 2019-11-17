import AppBar from '@material-ui/core/AppBar';
import {Container, Button, IconButton, Typography, Toolbar, Link} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
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
        flexShrink: 0,
        color: 'white'
    }
}));

const Header = () => {

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
                        <Link href="/" color="textPrimary" title="GoFooddy">GoFooddy</Link>
                    </Typography>
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                </Toolbar>
                <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                        <Link
                            noWrap
                            variant="body2"
                            href="#"
                            className={classes.toolbarLink}>
                            Home
                        </Link>
                    <Link
                        color="inherit"
                        noWrap
                        variant="body2"
                        href="/category/recipe"
                        className={classes.toolbarLink}>
                        Recipe
                    </Link>
                    <Link
                        color="inherit"
                        noWrap
                        variant="body2"
                        href="/category/dessert"
                        className={classes.toolbarLink}>
                        Dessert
                    </Link>
                    <Link
                        noWrap
                        variant="body2"
                        href="/category/snacks"
                        className={classes.toolbarLink}>
                        Snacks
                    </Link>
                    <Link
                        noWrap
                        variant="body2"
                        href="#"
                        className={classes.toolbarLink}>
                        Drinks
                    </Link>
                    <Link
                        noWrap
                        variant="body2"
                        href="#"
                        className={classes.toolbarLink}>
                        Kitchen Tips
                    </Link>
                    <Link
                        noWrap
                        variant="body2"
                        href="#"
                        className={classes.toolbarLink}>
                        Submit Recipe
                    </Link>
                    <Link
                        noWrap
                        variant="body2"
                        href="#"
                        className={classes.toolbarLink}>
                        Your Saved Recipes
                    </Link>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;