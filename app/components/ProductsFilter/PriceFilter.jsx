import { useState } from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Slider from '@material-ui/core/Slider'
import Divider from '@material-ui/core/Divider'

const marks = [
  {
    value: 0,
    label: '0'
  },

  {
    value: 100,
    label: '100'
  }
]
function valuetext (value) {
  return `${value}°C`
}

const PriceFilter = () => {
  const [state, setState] = useState({})
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }
  return (
    <article>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>Precio</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            defaultValue={20}
            getAriaValueText={valuetext}
            aria-labelledby='discrete-slider-custom'
            step={10}
            valueLabelDisplay='auto'
            marks={marks}
          />
        </AccordionDetails>
      </Accordion>
      <Divider variant='middle' />
    </article>
  )
}

export default PriceFilter
