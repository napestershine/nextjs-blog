import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import fetch from 'isomorphic-unfetch';
import Header from "../components/Header";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <MuiLink color="inherit" href="https://material-ui.com/">
                Your Website
            </MuiLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Index = props => (
    <React.Fragment>
        <Header/>
        <Container maxWidth="sm">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Next.js example
                </Typography>
                <Link href="/about" color="secondary" title="About Us">
                    About
                </Link>
                <Link href="/contact" color="secondary" title="Contact Us">
                    Contact
                </Link>
                <h1>Posts</h1>
                <ul>
                    {props.posts.map(post => (
                        <li key={post.id}>
                            <Link href="/p/[id]" as={`/p/${post.slug}`}>
                                {post.title.rendered}
                            </Link>
                        </li>
                    ))}
                </ul>
                <ProTip/>
                <Copyright/>
            </Box>
        </Container>
    </React.Fragment>
);

Index.getInitialProps = async function () {
    const res = await fetch(`https://example.com/wp-json/wp/v2/posts`);
    const data = await res.json();

    console.log(`Show posts fetched. Count: ${data.length}`);

    return {
        posts: data.map(post => post)
    };
};

export default Index;
