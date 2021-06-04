import Carousel from 'react-material-ui-carousel'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { makeStyles } from '@material-ui/core/styles'
import { formatURLImage } from 'utils/helpers'

const useStyles = makeStyles({
    imageFluid: {
        width: '100%',
    },
})
export default function CarouselCustom({ images }) {
    return (
        <Carousel
            NextIcon={<ArrowForwardIosIcon />}
            PrevIcon={<ArrowBackIosIcon />}
        >
            {images &&
                images.map((item, i) => (
                    <Item key={i} item={formatURLImage(item.source)} />
                ))}
        </Carousel>
    )
}

function Item({ item }) {
    const { imageFluid } = useStyles()
    console.log(item)
    return (
        <figure>
            <img src={item} alt="Product image" className={imageFluid} />
        </figure>
    )
}
