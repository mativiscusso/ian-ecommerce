import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(6),
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(8),
            paddingRight: 0,
        },
        [theme.breakpoints.up('lg')]: {
            padding: theme.spacing(12),
        },
        [theme.breakpoints.up('xl')]: {
            padding: theme.spacing(22),
        },
    },
}))

export default function MainFeaturedPost(props) {
    const classes = useStyles()
    const { post } = props

    return (
        <Paper
            className={classes.mainFeaturedPost}
            style={{ backgroundImage: `url(${post.image})` }}
        >
            {/* <img
                style={{ display: 'none' }}
                src={post.image}
                alt={post.imageText}
            /> */}
            <div className={classes.overlay} />
            <Grid container>
                <Grid item md={6}>
                    <div className={classes.mainFeaturedPostContent}>
                        <Typography
                            component="h1"
                            variant="h3"
                            color="inherit"
                            gutterBottom
                        >
                            {post.title}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {post.description}
                        </Typography>
                        <Link
                            variant="contained"
                            color="primary"
                            href="#"
                            component="button"
                        >
                            {post.linkText}
                        </Link>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
}

MainFeaturedPost.propTypes = {
    post: PropTypes.object,
}
