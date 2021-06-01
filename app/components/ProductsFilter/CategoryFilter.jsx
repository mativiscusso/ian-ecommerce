import { useState } from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Divider from '@material-ui/core/Divider'

const categories = [
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
const CategoryFilter = () => {
    const [state, setState] = useState({})
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked })
    }
    return (
        <article>
            <Accordion elevation={0}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Categorias</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        {categories.map((category) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state[category.title]}
                                        onChange={handleChange}
                                        name={category.title}
                                        color="primary"
                                    />
                                }
                                label={category.title}
                            />
                        ))}
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            <Divider variant="middle" />
        </article>
    )
}

export default CategoryFilter
