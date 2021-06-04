import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    colorsFlex: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    colorButton: {
        width: '25px',
        height: '25px',
        borderRadius: 15,
        border: '1px solid #262626dd',
        transition: 'all .2s ease',
        '&:hover': {
            cursor: 'pointer',
            filter: 'brightness(1.5)',
            transform: 'scale(1.1)',
        },
    },
})

const colors = [
    '#FFF911',
    '#FF5733',
    '#4FFF33',
    '#FF33FF',
    '#33A2FF',
    '#202020',
]

const ColorFilter = () => {
    const { colorsFlex, colorButton } = useStyles()
    return (
        <article>
            <Accordion elevation={0}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Colores</Typography>
                </AccordionSummary>
                <AccordionDetails className={colorsFlex}>
                    {colors &&
                        colors.map((color, i) => (
                            <button
                                key={i + 'a'}
                                className={colorButton}
                                style={{
                                    backgroundColor: color,
                                    boxShadow: `0 0 5px ${color}`,
                                }}
                            />
                        ))}
                </AccordionDetails>
            </Accordion>
            <Divider variant="middle" />
        </article>
    )
}

export default ColorFilter
