import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    LineSeries,
    Title,
    Legend, Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import {
    ArgumentScale,
    ValueScale,
    EventTracker,
    HoverState,
    Animation,
} from '@devexpress/dx-react-chart';
import moment from 'moment'

const legendStyles = () => ({
    root: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'row',
    },
});
const legendLabelStyles = theme => ({
    label: {
        paddingTop: theme.spacing(1),
        whiteSpace: 'nowrap',
    },
});
const legendItemStyles = () => ({
    item: {
        flexDirection: 'column',
    },
});

const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
    <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);


const ValueLabel = (props) => {
    const { text } = props;
    return (
        <ValueAxis.Label
            {...props}
            text={`${text}`}
        />
    );
};

const titleStyles = {
    title: {
        whiteSpace: 'pre',
        color: "#3e467f"
    },
};
const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
    <Title.Text {...props} className={classes.title} />
));

const getData = (tutors) => {
    let data = []
    let seances = []
    tutors.map(tutor => {
        tutor.seances.map(seance => {
            if ("date" in seance) {
                let date = moment(seance.date).format('L')
                date in seances ? seances[date].push(seance) : seances[date] = [seance]
            }
        })
    })

    let dates = Object.keys(seances).sort()
    let startDate = new Date()
    startDate.setDate(new Date(dates[0]).getDate() - 1)
    const endDate = new Date(dates.slice(-1)[0])
    let date = startDate
    while (date <= endDate) {
        moment(date).format('L') in seances ? null : seances[moment(date).format('L')] = []
        date.setDate(date.getDate() + 1)
    }


    Object.keys(seances).sort().forEach(date => {
        let arr = seances[date]
        data.push({
            "day": date,
            "seances": arr.length
        })
    })
    return data
}

const TooltipContent = ({ targetItem }, data) => {
    const item = data[targetItem.point];
    return item.seances
};

const demoStyles = () => ({
    chart: {
        paddingRight: '20px',
        color: "#3e467f"
    },
    title: {
        whiteSpace: 'pre',
    },
    white: {
        color: 'white'
    },
    paper: {
        // backgroundColor: "transparent",
        // width:"6u 12u(medium)",
        // margin:"auto"
        marginBottom : '1em'
    }
});

class Demo extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, tutors } = this.props;

        return (
            <Paper className={classes.paper}>
                <Chart
                    data={getData(tutors)}
                    className={classes.chart}
                    height={400}
                >
                    <ArgumentAxis showGrid className={classes.white} />
                    <ValueAxis
                        labelComponent={ValueLabel}
                    />

                    <LineSeries
                        name="Nombre de séances"
                        valueField="seances"
                        argumentField="day"
                    />
                    {/* <Legend position="right" rootComponent={Root} itemComponent={Item} labelComponent={Label} /> */}
                    <Title
                        textComponent={TitleText}
                        text={`Nombre de séances données par jour`}
                    />

                    <EventTracker />
                    <HoverState />
                    <Tooltip contentComponent={e => TooltipContent(e, getData(tutors))} />
                    {/* <Animation /> */}
                </Chart>
            </Paper>
        );
    }
}

export default withStyles(demoStyles, { name: 'Demo' })(Demo);