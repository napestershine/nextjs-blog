import React from "react";
import Header from "../../components/Header";
import { Card, CardContent, CardMedia, Container, Divider, Grid, Hidden, Typography } from "@material-ui/core";
import renderHTML from "react-render-html";
import Moment from "react-moment";
import Link from "../../src/Link";
import Router from "next/router";
import fetch from "isomorphic-unfetch";
import Footer from "../../components/Footer";
import useSidebar from '../../components/Hooks/sidebar'

const CategoryPosts = props => {
    const { categories = [] } = props
    const sidebarHook = useSidebar(categories);

    return <React.Fragment>
        <Header />
        <Container>
            <main style={{ marginTop: 20 }}>
                <Grid container spacing={5}>
                    {/* Main content */}
                    <Grid item xs={12} md={8}>
                        {props.posts.map(post => (
                            <Grid item key={post.id}>
                                <Card>
                                    <Hidden xsDown>
                                        <CardMedia style={{ height: 0, paddingTop: '56.25%' }}
                                            image={post.jetpack_featured_media_url} title={post.title.rendered}
                                            alt={post.title.rendred} />
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
                                            <Typography variant="subtitle1">
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

                                Router.push({
                                    pathname: '/',
                                    query: {
                                        page: `${props.page - 1}`
                                    }
                                }, `/page/${props.page - 1}`);

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
                    {
                        sidebarHook
                    }
                </Grid>
            </main>
        </Container>
        <Footer />
    </React.Fragment>
}


CategoryPosts.getInitialProps = async function ({ query: { id, page = 1 } }) {
    //console.log(`https://gofooddy.com/wp-json/wp/v2/posts?_embed&categories=509&page=${page}`);
    const res = await fetch(`https://gofooddy.com/wp-json/wp/v2/posts?_embed&categories=509&page=${page}`);
    const data = await res.json();
    console.log(`Show posts fetched. Count: ${data.length}`);

    return {
        posts: data.map(post => post),
        page: parseInt(page, 10)
        // categories: data2.map(category => category)
    };
};

export default CategoryPosts;