import React, { useEffect, useState } from "react";
// import { useQuery } from "@apollo/client";
// import { orderExternalID, getOrder } from "../../graphql/query";
import {
    Backdrop,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import OrderId from "./OrderId";
import OrderStatus from "./OrderStatus";

const useStyles = makeStyles((theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: "#fff",
        },
        table: {
            minWidth: 650,
        },
    })
);



export default function PayResult(order) {
    const classes = useStyles();
    const [orderId, setOrderId] = useState("");

    useEffect(() => {
        const orderId = localStorage.getItem("orderId").replace(/['"]+/g, "");
        setOrderId(orderId);
    }, []);

    const orderProcess = async () => {
        const queryString = useLocation();
        const parameters = queryString.search.slice(1).split("&");
        const paramsObjs = {
            preference_id: "",
            collection_status: "",
        };
        for (let i = 0; i < parameters.length; i++) {
            const parameter = parameters[i];
            const parameterSplited = parameter.split("=");
            paramsObjs[parameterSplited[0]] = parameterSplited[1];
        }
        // check for external payment (MercadoPago)
        if (paramsObjs.preference_id) {
            const idPreference = paramsObjs.preference_id;
            const status = paramsObjs.collection_status;

            const { loading, error, data } = useQuery(orderExternalID, {
                variables: { idPreference },
            });

            if (loading) {
                return (
                    <Backdrop className={classes.backdrop} open={true}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                );
            }

            if (error) {
                console.dir(error);
                return <h1> error loading order </h1>;
            }

            order = data.orders.listOrders.data[0];

            const _order = Object.assign({}, order);
            _order.status = status;
            // await updateStatus(_order);
        } else {
            const { loading, error, data } = useQuery(getOrder, {
                variables: { id: orderId },
            });

            if (loading) {
                return (
                    <Backdrop className={classes.backdrop} open={true}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                );
            }

            if (error) {
                console.dir(error);
                return <h1> error loading order </h1>;
            }

            order = data.orders.getOrder.data;

            const _order = Object.assign({}, order);
            _order.status = status;
        }
    };

    orderProcess();

    return (
        <React.Fragment>
            <h3>Mi orden:</h3> <br />
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <OrderId id={order.id} />
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Dirección: {order.address}, {order.city},{" "}
                                {order.state} ({order.zip})
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Teléfono: {order.phone}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Envío seleccionado: {order.shipping}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Método de pago: {order.pay}
                            </TableCell>
                        </TableRow>
                        {order.idPreference ? (
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Identificador de Mercado Pago:{" "}
                                    {order.idPreference}
                                </TableCell>
                            </TableRow>
                        ) : (
                            ""
                        )}
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Monto: ${order.totalOrder}
                            </TableCell>
                        </TableRow>
                        <OrderStatus orderId={orderId} />
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}
