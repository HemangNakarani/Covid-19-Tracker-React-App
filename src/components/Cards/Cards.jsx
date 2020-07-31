import React from 'react';
import {Card,CardContent,Typography,Grid} from '@material-ui/core';
import CountUp from 'react-countup';
import styles from './Cards.module.css';
import cn from 'classnames';

const Cards= ({data:{confirmed,recovered,deaths,lastUpdate}})=>{

    if(!confirmed)
    {
            return 'Loading....';
    }
    return (

        <div className={styles.container}>
            <Grid container spacing={1} justify="center">
                <Grid item component={Card} xs={12} md={4} className={cn(styles.card ,styles.infected)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Total Infected</Typography>
                        <Typography variant="h4">
                            <CountUp
                                start={0}
                                end={confirmed.value}
                                duration={2.5}
                                separator=','
                            />
                        </Typography>
                            <Typography color="error" >{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body1">Number Of Total Cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={4} className={cn(styles.card ,styles.Active)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Currently Active</Typography>
                        <Typography variant="h4">
                            <CountUp
                                start={0}
                                end={confirmed.value - recovered.value - deaths.value}
                                duration={2.5}
                                separator=','
                            />
                        </Typography>
                            <Typography color="error" >{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body1">Number Of Active Cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={4} className={cn(styles.card ,styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h4">
                            <CountUp
                                start={0}
                                end={recovered.value}
                                duration={2.5}
                                separator=','
                            />
                        </Typography>
                        <Typography color="error" gutterBottom>{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body1">Number Of Recoveries from COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={4} className={cn(styles.card ,styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography variant="h4">
                            <CountUp
                                start={0}
                                end= {deaths.value}
                                duration={2.5}
                                separator=','
                            />
                        </Typography>
                        <Typography color="error" >{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body1">Number Of Deaths caused by COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
       
    )
}

export default Cards;