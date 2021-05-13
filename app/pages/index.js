import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Header from "components/Header";
import MainFeatured from "components/MainFeatured";
import Footer from "components/Footer";

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));
const mainFeaturedPost = {
    title: "Title of a longer featured blog post",
    description:
        "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: "https://source.unsplash.com/random",
    imgText: "main image description",
    linkText: "Continue reading…",
};
const sections = [
    { title: "Technology", url: "#" },
    { title: "Design", url: "#" },
    { title: "Culture", url: "#" },
    { title: "Business", url: "#" },
    { title: "Politics", url: "#" },
    { title: "Opinion", url: "#" },
    { title: "Science", url: "#" },
    { title: "Health", url: "#" },
    { title: "Style", url: "#" },
    { title: "Travel", url: "#" },
];

export default function Blog() {
    const classes = useStyles();

    return (
        <>
            <Container>
                <Header title="E-Commerce" sections={sections} />
                <main>
                    <MainFeatured post={mainFeaturedPost} />

                    <Grid container spacing={5} className={classes.mainGrid}>
                        Sidebar
                    </Grid>
                </main>
            </Container>
        </>
    );
}
