import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import Typography from '@material-ui/core/Typography'

export default function OrderTimeline({ data }) {
    return (
        <Timeline align="right">
            {data.map((item) => (
                <TimelineItem key={item.type}>
                    <TimelineOppositeContent>
                        <Typography color="textPrimary" variant="caption">
                            {item.data.from} ➡ {item.data.to}
                        </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <small>{item.type}</small>
                    </TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    )
}
