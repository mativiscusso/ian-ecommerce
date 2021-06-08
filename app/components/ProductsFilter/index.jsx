import Typography from '@material-ui/core/Typography'
import ColorFilter from './ColorFilter'
import CategoryFilter from './CategoryFilter'
import PriceFilter from './PriceFilter'
import FilterListIcon from '@material-ui/icons/FilterList'

export default function ProductFilters() {
    return (
        <aside>
            <div style={{ display: 'flex', alignContent: 'top' }}>
                <FilterListIcon />
                <Typography variant="h6" gutterBottom>
                    Filtrar por
                </Typography>
            </div>
            <CategoryFilter />
            <ColorFilter />
            <PriceFilter />
        </aside>
    )
}
