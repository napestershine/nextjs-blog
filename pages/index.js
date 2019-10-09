import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import Link from '../src/Link';
import fetch from 'isomorphic-unfetch';
import Header from "../components/Header";
import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig();
const {API_URL} = publicRuntimeConfig;

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
        <Header categories={props.categories}/>
        <Container maxWidth="sm">
            <Box my={4}>
                <ul>
                    {props.posts.map(post => (
                        <li key={post.id}>
                            <Link href="/p/[id]" as={`/p/${post.slug}`}>
                                {post.title.rendered}
                            </Link>
                        </li>
                    ))}
                </ul>
                <Copyright/>
            </Box>
        </Container>
    </React.Fragment>
);

Index.getInitialProps = async function () {
    const res = await fetch(`${API_URL}/posts`);
    const data = await res.json();
    console.log(`Show posts fetched. Count: ${data.length}`);

    const res2 = await fetch(`${API_URL}/categories?orderby=count&order=desc`);
    const data2 = await res2.json();
    console.log(`Show categories fetched. Count: ${data2.length}`);

    return {
        posts: data.map(post => post),
        categories: data2.map(category => category)
    };
};

export default Index;
