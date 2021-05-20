import Typography from '@material-ui/core/Typography'
import ColorFilter from './ColorFilter'
import CategoryFilter from './CategoryFilter'
import PriceFilter from './PriceFilter'

export default function ProductFilters() {
    return (
        <section>
            <Typography variant="h6" gutterBottom>
                Filtrar por
            </Typography>
            <ColorFilter />
            <CategoryFilter />
            <PriceFilter />
        </section>
    )
}
