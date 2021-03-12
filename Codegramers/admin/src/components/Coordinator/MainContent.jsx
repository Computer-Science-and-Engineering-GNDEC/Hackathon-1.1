import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Filter from './Filter'
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "100%"
    },
    heading: {
        padding: "20px 0px",
        letterSpacing: "0.6px",
        wordSpacing: "8px",
        color: theme.palette.primary.dark
    },
    tabBody: {
        marginTop: "40px"
    },
    BG: {
        paddingBottom: "15px",
        paddingTop: "15px",
    },
   notices:{
       color:"#038ed4",
       borderradius: "5px"
       
   },
   head:{
       color:"#038ed4",
   }
}));

export default function FullWidthTabs(props) {
    const classes = useStyles();

    const renderContent = () => {
        if (props.activeId === 1) {
            return (
                <>
                    <h1 className={classes.head}>Home</h1>
                </>
            );
        } else if (props.activeId === 2) {
            return (
                <>
                    <h1 className={classes.head}> Create Question Papers </h1>
                    <Filter />
                </>
            );
        }else if (props.activeId === 3) {
            return (
                <>
                    <h1 className={classes.head}> Companies </h1>
                </>
            );
        } else if (props.activeId === 4) {
            return (
                <>
                   {/* <Users/> */}
                </>
            );
        } else if (props.activeId === 5) {
            return (
                <>
                    {/* <Postmaker /> */}
                </>
            );
        }
    };

    return (
        <Container className={classes.root} maxWidth="100%">
            {renderContent()}
        </Container>
    );
}
