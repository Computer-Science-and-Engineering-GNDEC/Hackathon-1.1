
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import 'date-fns';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';

interface Props {
  handleChange: any;
  setYes: React.Dispatch<React.SetStateAction<boolean>>;
  values: {
    subject: string;
    maxMarks: string;
    examDate: string;
    name: string;


  };

}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));



const CreatePaper: React.FC<Props> = ({ handleChange, values, setYes }) => {

  const classes = useStyles();


  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log("yeah submitting")
    setYes(true);

  }

  return (
    <>
      <form className={classes.root} onSubmit={handleSubmit}>
        <Grid container direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} lg={3}>
            <TextField id="standard-basic" label="Enter Paper Name" name="name" value={values.name} required={true} onChange={handleChange} />

          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <TextField id="standard-basic" label="Subject Name" name="subject" value={values.subject} required={true} onChange={handleChange} />

          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <TextField id="standard-basic" label="Maximum Marks" name="maxMarks" value={values.maxMarks} required={true} onChange={handleChange} />

          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <TextField id="standard-basic" label="Exam Date" name="examDate" value={values.examDate} type="date" required={true} style={{minWidth:"220px"}} onChange={handleChange} />

          </Grid>

          <Grid item xs={12} sm={12} lg={12} style={{ marginTop: "30px", display:"flex", justifyContent:"center" }}
          >
            <Button variant="contained" color="primary" type="submit" >Create New Paper</Button>

          </Grid>
        </Grid>


      </form>
    </>
  );
}

export default CreatePaper;
