import { Typography } from "@material-ui/core";
import MuiLink from '@material-ui/core/Link';

const Footer = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <MuiLink color="inherit" href="/">
            GoFooddy
        </MuiLink>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
    );
}

export default Footer;