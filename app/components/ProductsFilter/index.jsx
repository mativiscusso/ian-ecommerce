import Typography from '@material-ui/core/Typography'
import CategoryFilter from './CategoryFilter'
import PriceFilter from './PriceFilter'
import FilterListIcon from '@material-ui/icons/FilterList'

export default function ProductFilters({
    products,
    setProducts,
    queryString,
    collectionSlug,
}) {
    return (
        <aside>
            <div
                style={{
                    display: 'flex',
                    alignContent: 'top',
                    margin: '10px 0',
                }}
            >
                <FilterListIcon style={{ marginRight: 20 }} />
                <Typography variant="button">Filtrar por</Typography>
            </div>
            <CategoryFilter
                products={products}
                setProducts={setProducts}
                queryString={queryString}
                collectionSlug={collectionSlug}
            />
        </aside>
    )
}
