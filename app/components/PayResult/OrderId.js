import React, { useEffect } from 'react'
import { TableCell } from '@material-ui/core'
import { TableHead, TableRow } from '@material-ui/core'
// import { useMutation } from '@apollo/client/react';
// import { updateStockProductVariant } from '../../graphql/query';

export default function OrderId({ id }) {
    // const [updateStockMutation] = useMutation(updateStockProductVariant);

    useEffect(() => {
        const localCart = JSON.parse(localStorage.getItem("cart"))
        updateStock(localCart)
        return 
    }, []);

    function updateStock(cartLocalStorage) {
        
        const _cart = cartLocalStorage;       
        const objectVariantSelected = formatVariantsSelected(_cart);
        const refactorCart = discountStock(_cart, objectVariantSelected);
        executeUpdateStock(refactorCart);
        localStorage.setItem("cart", JSON.stringify([]))
    }
    function formatVariantsSelected(_cart) {
        const objectVariantSelected = [];
        for (let i = 0; i < _cart.length; i++) {
            const variant = {};
            for (let j = 0; j < _cart[i].variantsSelected.length; j++) {
                const variants = _cart[i].variantsSelected[j];
                for (const key in variants) {
                    variant[key] = variants[key];
                }
            }
            objectVariantSelected.push(variant);
        }
        return objectVariantSelected;
    }
    function discountStock(_cart, objectVariantSelected) {
        const cart = [..._cart];

        for (let i = 0; i < _cart.length; i++) {
            const arrayVariants = [];
            const variants = _cart[i].variants;

            for (let j = 0; j < variants.length; j++) {
                delete variants[j].__typename;
                const element = JSON.parse(variants[j].propertyValues);
                arrayVariants.push({
                    propertyValues: JSON.stringify(element),
                    stock: variants[j].stock
                });

                if (objectEquals(element, objectVariantSelected[i])) {
                    arrayVariants[j].stock = arrayVariants[j].stock - Number(_cart[i].quantity);
                }
            }
            cart[i].variants = arrayVariants;
        }
        return cart;
    }
    function executeUpdateStock(_cart) {
        for (let i = 0; i < _cart.length; i++) {
            const id = _cart[i].id;
            const variants = [..._cart[i].variants];
            updateStockMutation({ variables: { id: id, data: { variants: variants } } });
        }
    }
    function objectEquals(obj1, obj2) {
        for (const i in obj1) {
            if (obj1.hasOwnProperty(i)) {
                if (!obj2.hasOwnProperty(i)) {
                    return false;
                }
                if (obj1[i] != obj2[i]) {
                    return false;
                }
            }
        }
        for (const i in obj2) {
            if (obj2.hasOwnProperty(i)) {
                if (!obj1.hasOwnProperty(i)) {
                    return false;
                }
                if (obj1[i] != obj2[i]) {
                    return false;
                }
            }
        }
        return true;
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell>Orden Nº: {id} </TableCell>
            </TableRow>
        </TableHead>
    )
}
