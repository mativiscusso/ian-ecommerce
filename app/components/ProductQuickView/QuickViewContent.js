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

    const handleVariant = (e) => {
        const selected = { key: e.currentTarget.id, value: e.target.innerText };
        setVariantsSelected([
            ...variantsSelected,
            { [e.currentTarget.id]: e.target.innerText },
        ]);
        const filteredVariants = productState.filter((variant) => {
            return (
                variant.propertyValues[selected.key].toUpperCase() ==
                    selected.value && variant.stock > 0
            );
        });

        const filteredOptions = generateOptions(filteredVariants);
        const elementSelected = setInitalStateDisabled(filteredOptions, false);
        setIsDisabled({ ...isDisabled, ...elementSelected });
        setEnabledTooltip(true);

        if (variantsSelected.length === propertyKeys.length - 1) {
            console.log(variantsSelected.length);
            console.log(propertyKeys.length);

            setLimitVariants(true);
            setShopCartButtonEnabled(false);
        }
    };

    const resetVariantsSelected = (addToCart) => {
        setVariantsSelected([]);
    };

    const handleDeleteChipVariant = (e) => {
        const splitSelected = e.currentTarget.id.split(",");
        const selected = { key: splitSelected[0], value: splitSelected[1] };
        setShopCartButtonEnabled(true);
        const variantsSelectedFiltered = variantsSelected.filter((variant) => {
            return variant[selected.key] != selected.value;
        });

        setVariantsSelected(variantsSelectedFiltered);

        if (variantsSelected.length == 1) {
            const elementSelected = setInitalStateDisabled(options, true);
            setIsDisabled({ ...elementSelected });
        }
        setLimitVariants(false);
    };

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    {props.images ? (
                        <img
                            src={`${process.env.REACT_APP_API_URL}/files/${props.images[0]}?width=800`}
                            alt="Product"
                            className={classes.imgFluid}
                        />
                    ) : (
                        <img
                            src="https://www.chanchao.com.tw/TWSF/kaohsiung/images/default.jpg"
                            alt="Product"
                            className={classes.imgFluid}
                        />
                    )}
                    {/* {props.isFeatured ? (
                        <RbNew className={classes.ribbonNew} />
                    ) : (
                        ""
                    )} */}
                </Grid>
                <Grid item xs={12} md={5} className={classes.detailProduct}>
                    {/* {props.categories && (
                        <Breadcrumbs separator="-" aria-label="breadcrumb">
                            {props.categories.map((category, i) => {
                                return (
                                    <Link
                                        key={i + category.name}
                                        color="inherit"
                                        href="#"
                                    >
                                        {category.name}
                                    </Link>
                                );
                            })}
                        </Breadcrumbs>
                    )} */}
                    <Divider />
                    <Typography variant="h6" gutterBottom>
                        {props.name}
                    </Typography>

                    <Typography gutterBottom variant="h6" color="textPrimary">
                        ${props.price}
                    </Typography>

                    <Typography
                        className={classes.lineHeight}
                        variant="body1"
                        gutterBottom
                    >
                        {props.description}
                    </Typography>
                    {/* {propertyKeys &&
                        propertyKeys.map((variantProperty, i) => (
                            <div key={`${i}variant`}>
                                <Typography variant="body1">
                                    {variantProperty}
                                </Typography>
                                <div className={classes.variantsRow}>
                                    {Object.entries(
                                        options[i][propertyKeys[i]]
                                    ).map(([key, value], j) => (
                                        <div key={`${key}val`}>
                                            {isDisabled[`${value}`] === true ? (
                                                enabledTooltip ? (
                                                    <Tooltip
                                                        title="Sin Stock"
                                                        arrow
                                                    >
                                                        <Button
                                                            variant="outlined"
                                                            size="small"
                                                            color="primary"
                                                            id={propertyKeys[i]}
                                                            onClick={
                                                                handleVariant
                                                            }
                                                            disabled={
                                                                limitVariants
                                                            }
                                                        >
                                                            {value}
                                                        </Button>
                                                    </Tooltip>
                                                ) : (
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        color="primary"
                                                        id={propertyKeys[i]}
                                                        onClick={handleVariant}
                                                        disabled={limitVariants}
                                                    >
                                                        {value}
                                                    </Button>
                                                )
                                            ) : (
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="primary"
                                                    id={propertyKeys[i]}
                                                    onClick={handleVariant}
                                                    disabled={limitVariants}
                                                >
                                                    {value}
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    <br />
                    <div>
                        {variantsSelected &&
                            variantsSelected.map((variable, i) =>
                                Object.entries(variable).map(([key, value]) => (
                                    <Chip
                                        color="secondary"
                                        key={key + i}
                                        id={`${value}`}
                                        size="small"
                                        onDelete={handleDeleteChipVariant}
                                        label={`${key}:${value}`}
                                        deleteIcon={
                                            <CancelIcon
                                                id={`${key},${value}`}
                                                key={key}
                                            />
                                        }
                                    />
                                ))
                            )}
                    </div>
                    <br />
                    <div>
                        {props.tags &&
                            props.tags.map((tag, i) => (
                                <Chip
                                    variant="outlined"
                                    className={classes.marginTags}
                                    color="primary"
                                    label={tag}
                                    component="a"
                                    href="#chip"
                                    key={i + tag}
                                    clickable
                                />
                            ))}
                    </div> */}

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
