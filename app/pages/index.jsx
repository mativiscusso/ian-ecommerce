import React from 'react'
import Container from '@material-ui/core/Container'
import Header from 'components/Header'
import MainFeatured from 'components/MainFeatured'
import ProductList from 'components/ProductList'

const mainFeaturedPost = {
    title: 'SUPER OFERTAS',
    description:
        'Tienda online base para poder implementar facilmente un storefront de vendure.',
    image: 'https://c4.wallpaperflare.com/wallpaper/87/999/705/apple-music-gradient-wallpaper-preview.jpg',
    imgText: 'main image description',
    linkText: 'Seguir leyendo',
}
const sections = [
    { title: 'Technology', url: '#' },
    { title: 'Design', url: '#' },
    { title: 'Culture', url: '#' },
    { title: 'Business', url: '#' },
    { title: 'Politics', url: '#' },
    { title: 'Opinion', url: '#' },
    { title: 'Science', url: '#' },
    { title: 'Health', url: '#' },
    { title: 'Style', url: '#' },
    { title: 'Travel', url: '#' },
]

export default function Blog() {
    return (
        <>
            <Container maxWidth={false} disableGutters>
                <Header title="E-Commerce" sections={sections} />
                <main>
                    <MainFeatured post={mainFeaturedPost} />
                    <ProductList />
                </main>
            </Container>
        </>
    )
}
