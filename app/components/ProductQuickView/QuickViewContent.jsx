import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { ReactComponent as RbNew } from "../utils/svg/rb-new.svg";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import ShopCartButton from "../Product/ShopCartButton";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
    detailProduct: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    imgFluid: {
        position: "relative",
        width: "100%",
    },
    marginTags: {
        marginRight: "0.3rem",
    },
    ribbonNew: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 70,
    },
    lineHeight: {
        padding: ".5rem 0",
    },
    variantsRow: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
    },
});

const QuickViewContent = (props) => {
    const [state, setState] = useState({});
    const classes = useStyles();
    const [variantsSelected, setVariantsSelected] = useState([]);
    const [productState, setProductState] = useState([]);
    const [propertyKeys, setPropertyKeys] = useState([]);
    const [isDisabled, setIsDisabled] = useState({});
    const [enabledTooltip, setEnabledTooltip] = useState(false);
    const [limitVariants, setLimitVariants] = useState(false);
    const [shopCartButtonEnabled, setShopCartButtonEnabled] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <img
                        src="https://www.chanchao.com.tw/TWSF/kaohsiung/images/default.jpg"
                        alt="Product"
                        className={classes.imgFluid}
                    />
                </Grid>
                <Grid item xs={12} md={5} className={classes.detailProduct}>
                    <Divider />
                    <Typography variant="h6" gutterBottom>
                        {props.name}
                    </Typography>

                    <Typography gutterBottom variant="h6" color="textPrimary">
                        ${props.variants[0].price}
                    </Typography>

                    <Typography
                        className={classes.lineHeight}
                        variant="body1"
                        gutterBottom
                    >
                        {props.description}
                    </Typography>
                    <ShopCartButton
                        {...props}
                        listVariants={[]}
                        variantsSelected={[]}
                        resetVariantsSelected={[]}
                        enabled={shopCartButtonEnabled}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default QuickViewContent;
