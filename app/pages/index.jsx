import React from 'react'

import Container from '@material-ui/core/Container'

import ProductSlider from 'components/ProductSlider'
import MainFeatured from 'components/MainFeatured'
import ProductList from 'components/ProductList'

import { useQuery } from '@apollo/client'
import { SEARCH_PRODUCTS } from 'graphql/queries'

const mainFeaturedPost = {
    title: 'SUPER OFERTAS',
    description:
        'Tienda online base para poder implementar facilmente un storefront de vendure.',
    image: 'https://c4.wallpaperflare.com/wallpaper/87/999/705/apple-music-gradient-wallpaper-preview.jpg',
    imgText: 'main image description',
    linkText: 'Seguir leyendo',
}

export default function Blog() {
    const { data, loading, error } = useQuery(SEARCH_PRODUCTS, {
        variables: {
            input: { term: '', groupByProduct: true, skip: 0 },
        },
    })

    if (error) {
        console.dir(error)
        return <h1> error </h1>
    }

    return (
        <>
            <Container maxWidth={false} disableGutters>
                <main>
                    <MainFeatured post={mainFeaturedPost} />

                    <Container maxWidth={false}>
                        <ProductSlider data={data} loading={loading} />
                    </Container>
                </main>
            </Container>
        </>
    )
}
