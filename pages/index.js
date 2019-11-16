import React from 'react';
import {Card, CardContent, CardMedia, Container, Divider, Grid, Hidden, Typography} from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import Link from '../src/Link';
import fetch from 'isomorphic-unfetch';
import Header from "../components/Header";
import getConfig from 'next/config';
import Moment from 'react-moment';
import renderHTML from 'react-render-html';
import {Facebook, Instagram, Pinterest, Twitter} from '@material-ui/icons';
import Router from 'next/router';

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
        <Container>
            <main style={{marginTop: 20}}>
                <Grid container spacing={5}>
                    {/* Main content */}
                    <Grid item xs={12} md={8}>
                        {props.posts.map(post => (
                            <Grid item key={post.id}>
                                <Card>
                                    <Hidden xsDown>
                                        <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                                                   image={post.jetpack_featured_media_url} title={post.title.rendered}
                                                   alt={post.title.rendred}/>
                                    </Hidden>
                                    <div>
                                        <CardContent>
                                            <Typography component="h2" variant="h5">
                                                {renderHTML(post.title.rendered)}
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary">
                                                <Moment fromNow>{post.date}</Moment>
                                                &nbsp;by&nbsp;
                                                <Link href={`/author/${post._embedded.author[0].slug}`}>
                                                    {post._embedded.author[0].name}
                                                </Link>
                                            </Typography>
                                            <Typography variant="subtitle1" paragraph>
                                                {post.excerpt.rendered.length > 300 ? renderHTML(`${post.excerpt.rendered.substr(0, 300)}...`) : renderHTML(post.excerpt.rendered)}
                                            </Typography>
                                            <Link href={`/post/${post.id}`}>
                                                <Typography variant="button" color="primary">
                                                    Read More ...
                                                </Typography>
                                            </Link>
                                        </CardContent>
                                    </div>
                                </Card>
                            </Grid>
                        ))}
                        <button
                            onClick={() => {
                                const { page } = props;
                                const actualPage = parseInt(page) - 1;

                                Router.push({
                                    pathname: '/',
                                    query: {
                                        page: `${props.page - 1}`
                                    }
                                },  actualPage === 1 ?  `/` : `/page/${props.page - 1}`);

                            }}
                            disabled={props.page <= 1}>
                                Previous Posts
                        </button>
                        <button onClick={() => {

                             Router.push({
                                pathname: '/',
                                query: {
                                    page: `${props.page + 1}`
                                }
                            }, `/page/${props.page + 1}`);

                        }}>
                            Next Posts
                        </button>
                    </Grid>
                    {/* End main content */}
                    {/* Sidebar */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            Follow us
                        </Typography>
                        <Link href="https://www.facebook.com/gofooddy">
                            <Facebook/>
                        </Link>
                        <Link href="https://www.instagram.com/gofooddy">
                            <Instagram/>
                        </Link>
                        <Link href="https://twitter.com/gofooddy">
                            <Twitter/>
                        </Link>
                        <Link href="https://www.pinterest.com/gofooddy">
                            <Pinterest/>
                        </Link>
                        <Divider/>
                        <Typography variant="h6" gutterBottom>
                            Categories
                        </Typography>
                        {props.categories.map(category => (
                            category.count > 0 ?
                                <Link display="block" variant="body1" href={`/category/${category.id}`} key={category.slug} as={`/category/${category.slug}`}>
                                    {category.name} ({category.count})
                                </Link> : null

                        ))}
                    </Grid>
                    {/* End sidebar */}
                </Grid>
            </main>
        </Container>
        <Copyright/>
    </React.Fragment>
);

Index.getInitialProps = async function ({query: {page = 1}}) {
    const res = await fetch(`https://gofooddy.com/wp-json/wp/v2/posts?_embed&page=${page}`);
    const data = await res.json();
    console.log(`Show posts fetched. Count: ${data.length}`);

    const res2 = await fetch(`https://gofooddy.com/wp-json/wp/v2/categories?orderby=count&order=desc&per_page=100`);
    const data2 = await res2.json();
    console.log(`Show categories fetched. Count: ${data2.length}`);

    return {
        posts: data.map(post => post),
        page: parseInt(page, 10),
        categories: data2.map(category => category)
    };
};

export default Index;
