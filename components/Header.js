import AppBar from '@material-ui/core/AppBar';
import {Container, Button, IconButton, Typography, Toolbar, Link} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import renderHTML from 'react-render-html';
import fetch from "isomorphic-unfetch";
import Index from "../pages";


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

const Header = props => (

    <AppBar position="static">
        <Container maxWidth="lg">
            <Toolbar className={useStyles.toolbar}>
                <Button size="small">Subscribe</Button>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    className={useStyles.toolbarTitle}>
                    GoFooddy
                </Typography>
                <IconButton>
                    <SearchIcon/>
                </IconButton>
            </Toolbar>
            <Toolbar component="nav" variant="dense" className={useStyles.toolbarSecondary}>
                {props.categories && props.categories.map(category => (
                    <Link
                        color="inherit"
                        noWrap
                        key={category.id}
                        variant="body2"
                        href="#"
                        className={useStyles.toolbarLink}>
                        {renderHTML(category.name)}
                    </Link>
                ))}
            </Toolbar>
        </Container>
    </AppBar>
);

Header.getInitialProps = async function () {
    const res = await fetch(`https://example.com/wp-json/wp/v2/categories?orderby=count&order=desc`);
    const data = await res.json();

    console.log(`Show categories fetched. Count: ${data.length}`);

    return {
        categories: data.map(category => category)
    };
};

export default Header;