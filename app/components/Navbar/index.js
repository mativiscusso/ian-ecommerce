import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    IconButton,
    Drawer,
    Link as NavItem,
    MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useEffect } from "react";
import Link from "components/Link";
import NextLink from "next/link";

const headersData = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Cart",
        href: "/cart",
    },
    {
        label: "Checkout",
        href: "/checkout",
    },
    {
        label: "Login",
        href: "/login",
    },
    {
        label: "Register",
        href: "/register",
    },
];

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: "#400CCC",
        paddingRight: "79px",
        paddingLeft: "118px",
        "@media (max-width: 900px)": {
            paddingLeft: 0,
        },
    },
    logo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        textTransform: "uppercase",
        size: "18px",
        marginLeft: "38px",
        [theme.breakpoints.down("md")]: {
            marginLeft: 0,
            padding: "0 1rem 2rem 1rem",
        },
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    drawerContainer: {
        padding: "20px 30px",
        display: "flex",
        flexDirection: "column",
    },
}));

export default function Navbar() {
    const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    });

    const { mobileView, drawerOpen } = state;

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({ ...prevState, mobileView: true }))
                : setState((prevState) => ({
                      ...prevState,
                      mobileView: false,
                  }));
        };

        setResponsiveness();

        window.addEventListener("resize", () => setResponsiveness());
    }, []);

    const displayDesktop = () => {
        return (
            <Toolbar className={toolbar}>
                {femmecubatorLogo}
                <div>{getMenuButtons()}</div>
            </Toolbar>
        );
    };

    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: false }));

        return (
            <Toolbar>
                <IconButton
                    {...{
                        edge: "start",
                        color: "inherit",
                        "aria-label": "menu",
                        "aria-haspopup": "true",
                        onClick: handleDrawerOpen,
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Drawer
                    {...{
                        anchor: "left",
                        open: drawerOpen,
                        onClose: handleDrawerClose,
                    }}
                >
                    <div className={drawerContainer}>{getDrawerChoices()}</div>
                </Drawer>

                <div>{femmecubatorLogo}</div>
            </Toolbar>
        );
    };

    const getDrawerChoices = () => {
        return headersData.map(({ label, href }) => {
            return (
                <Link href={href} color="inherit" className={menuButton}>
                    {label}
                </Link>
            );
        });
    };

    const femmecubatorLogo = (
        <NextLink href="/">
            <a>
                <Typography variant="h6" component="h1" className={logo}>
                    Ecommerce
                </Typography>
            </a>
        </NextLink>
    );

    const getMenuButtons = () => {
        return headersData.map(({ label, href }) => {
            return (
                <>
                    <Link href={href} color="inherit" className={menuButton}>
                        {label}
                    </Link>
                </>
            );
        });
    };

    return (
        <nav>
            <AppBar className={header}>
                {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
        </nav>
    );
}
