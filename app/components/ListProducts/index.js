import React from "react";
import Product from "../Product";
// import { useQuery } from "@apollo/client";
// import { listProductsSite } from "../../graphql/query";
// import { searchProducts } from "../../graphql/query";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import { products } from "utils/products";
import { Container } from "@material-ui/core";

const ProductsList = () => {
    // const { loading, error, data } = useQuery(queryGQL, {
    //     variables: { searchVariable },
    // });
    const data = products;

    // if (loading) {
    //     return (
    //         <React.Fragment>
    //             <Grid container wrap="nowrap">
    //                 {Array.from(new Array(4)).map((index) => (
    //                     <Box key={index} width={210} marginRight={0.5} my={5}>
    //                         <Skeleton variant="rect" width={200} height={200} />
    //                         <Box pt={0.5}>
    //                             <Skeleton width={150} /> <br />
    //                             <Skeleton width={100} />
    //                             <Skeleton
    //                                 variant="rect"
    //                                 width={100}
    //                                 height={50}
    //                             />
    //                         </Box>
    //                     </Box>
    //                 ))}
    //             </Grid>
    //         </React.Fragment>
    //     );
    // }

    // if (error) {
    //     console.dir(error);
    //     return <h1> error </h1>;
    // }

    return (
        <Container maxWidth={false}>
            <Grid container spacing={1}>
                {data ? (
                    data.map((prod) => (
                        <Grid item xs={6} sm={6} md={3} lg={2} key={prod.id}>
                            <Product {...prod} />
                        </Grid>
                    ))
                ) : (
                    <h1>Ups! No hay productos</h1>
                )}
            </Grid>
        </Container>
    );
};

export default ProductsList;
