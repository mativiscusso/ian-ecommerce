import React, { useEffect, useState } from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { useLocation } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { updateStatusOrder } from '../../graphql/query';


export default function OrderStatus({orderId}) {
    const location = useLocation()
    const pathUrl = location.pathname
    const [orderStatus, setOrderStatus] = useState('')
    const [patchOrder] = useMutation(updateStatusOrder);     

    function matchStatus(status) {
        for (const state of status) {
            const existState = pathUrl.includes(state)
            if (existState) {
                setOrderStatus(state)
                return state
            }
        }
    }
    useEffect(() => {
        const orderId = localStorage.getItem("orderId").replace(/['"]+/g, "");
        const status = ['pending', 'success', 'failure']
        const state = matchStatus(status)
        patchOrder({ variables: { id: orderId, data: {statusPayment:state} } })
    }, []);
    

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                Estado del Pago:<strong> {orderStatus}</strong>
            </TableCell>
        </TableRow>
    )
}
