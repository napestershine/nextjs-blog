import React from 'react';
import {Typography, Divider} from "@material-ui/core";
import {Facebook, Instagram, Pinterest, Twitter} from '@material-ui/icons';

const SocialMediaLinks = () => {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Follow us
            </Typography>
            <a href="https://www.facebook.com/gofooddy">
                <Facebook/>
            </a>
            <a href="https://www.instagram.com/gofooddy">
                <Instagram/>
            </a>
            <a href="https://twitter.com/gofooddy">
                <Twitter/>
            </a>
            <a href="https://www.pinterest.com/gofooddy">
                <Pinterest/>
            </a>
            <Divider/>
        </React.Fragment>
    );
};

export default SocialMediaLinks;