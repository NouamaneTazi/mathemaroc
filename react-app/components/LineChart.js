import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    LineSeries,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Animation } from '@devexpress/dx-react-chart';
import moment from 'moment'

const format = () => tick => tick;
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
const demoStyles = () => ({
    chart: {
        paddingRight: '20px',
    },
    title: {
        whiteSpace: 'pre',
    },
});

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
    startDate.setDate(new Date(dates[0]).getDate() - 2)
    const endDate = new Date(dates.slice(-1)    )
    console.log(dates.slice(-1))
    let date = startDate
    while (date <= endDate){
        console.log(moment(date).format('L'))
        !moment(date).format('L') in seances ? seances[moment(date).format('L')] = [] : null
        date.setDate(date.getDate() + 1)
    }

    Object.keys(seances).sort().forEach(date => {
        let arr = seances[date]
        data.push({
            "day": date,
            "seances": arr.length
        })
    })

    console.log("data",data)
    return data

}

class Demo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data,
        };
    }

    render() {
        const { data: chartData } = this.state;
        const { classes, tutors } = this.props;

        return (
            <Paper>
                {console.log("tutors", tutors)}
                <Chart
                    data={getData(tutors)}
                    className={classes.chart}
                >
                    <ArgumentAxis tickFormat={format} />
                    <ValueAxis
                        labelComponent={ValueLabel}
                    />

                    <LineSeries
                        name="Nombre de séances"
                        valueField="seances"
                        argumentField="day"
                    />
                    <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
                    <Title
                        text={`Confidence in Institutions in American society ${'\n'}(Great deal)`}
                        textComponent={TitleText}
                    />
                    {/* <Animation /> */}
                </Chart>
            </Paper>
        );
    }
}

export default withStyles(demoStyles, { name: 'Demo' })(Demo);