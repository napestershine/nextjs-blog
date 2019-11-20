import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Link from '../../src/Link';
import SocialMediaLinks from "../SocialMediaLinks";

const useSidebar = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`https://gofooddy.com/wp-json/wp/v2/categories?orderby=count&order=desc&per_page=100`)
            .then(response => response.json())
            .then(data => {
                setCategories(data)
            });
    }, []);

    return <Grid item xs={12} md={4}>
        <SocialMediaLinks />
        <Typography variant="h6" gutterBottom>
            Categories
        </Typography>
        {categories.map(category => (
            category.count > 0 ?
                <Link display="block" variant="body1" href={`/category/${category.id}`}
                    key={category.slug} as={`/category/${category.slug}`}>
                    {category.name} ({category.count})
            </Link> : null
        ))}
    </Grid>
}

export default useSidebar