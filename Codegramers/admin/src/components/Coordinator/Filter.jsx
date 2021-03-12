import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';

import CreatePaper from './CreatePaper';
import Success from './SuccessToast';
import Alert from '@material-ui/lab/Alert';
// import { PinDropSharp } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  textFieldContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    padding: "0px 0px",
    width: "100%"
  },
  label: {
    fontWeight: "700",
    paddingRight: "18px"
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();
  // const [questions, setQuestions] = React.useState([])
  const [ques, setQues] = React.useState({ question: "", optionA: "", optionB: "", optionC: "", optionD: "", Achecked: false, Bchecked: false, Cchecked: false, Dchecked: false, marks: "" })
  const [finalObj, setFinalObj] = React.useState({ subject: "", maxMarks: "", questions: [], examDate: "", teachers: [], name: "" })
  const [yes, setYes] = React.useState(false)
  const [success, setSuccess] = React.useState(false)


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setQues((prevState) => ({ ...prevState, [name]: value }))
  }


  const handleCheckboxChange = (event) => {

    const name = event.target.name;
    const value = event.target.checked;
    setQues((prevState) => ({ ...prevState, [name]: value }))

  };



  const handleSubmit = () => {
    axios.post(`http://localhost:5000/v1/exams`, { name: finalObj.name, subject: finalObj.subject, maxMarks: finalObj.maxMarks, questions: finalObj.questions, examDate: finalObj.examDate, teachers: ["603fb77882dff011e88f3a6b"] }, { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        console.log(res);
        console.log(res.data);
        setYes(false);
        setSuccess(true);
      }).catch((eror) => { console.log(eror); alert("Invalid Inputs, Enter valid inputs and try again") })

    setFinalObj({ subject: "", maxMarks: "", questions: [], examDate: "", teachers: [], name: "" })
  }

  const handleYes = (a) => {
    setYes(a)
    setSuccess(false)
  }



  const handleAddQuestion = (e) => {
    e.preventDefault();
    console.log("add question")
    var correctAns = []
    var incorrectAns = []

    ques.Achecked ? correctAns.push(ques.optionA) : incorrectAns.push(ques.optionA)
    ques.Bchecked ? correctAns.push(ques.optionB) : incorrectAns.push(ques.optionB)
    ques.Cchecked ? correctAns.push(ques.optionC) : incorrectAns.push(ques.optionC)
    ques.Dchecked ? correctAns.push(ques.optionD) : incorrectAns.push(ques.optionD)


    var obj = { question: ques.question, correctAnswers: correctAns, incorrectAnswers: incorrectAns, mark: ques.marks }
    console.log("before : ", obj)

    var quest = finalObj.questions;

    quest.push(obj);

    console.log("after : ", obj)

    setFinalObj((p) => ({ ...p, questions: quest }));

    setQues({ question: "", optionA: "", optionB: "", optionC: "", optionD: "", Achecked: false, Bchecked: false, Cchecked: false, Dchecked: false, marks: "" })



  }

  const handleCreatePaperChanges = (event) => {

    const name = event.target.name;
    const value = event.target.value;

    setFinalObj((prevState) => ({ ...prevState, [name]: value }))
  }


  React.useEffect(() => { console.log(ques) }, [ques])
  // React.useEffect(() => { console.log("questions : ", questions) }, [questions])
  React.useEffect(() => { console.log("final : ", finalObj) }, [finalObj])

  const renderQuestions = () => {
    console.log("hello questions")
    finalObj.questions.map((q) => (
      <>
        <Alert severity="success" color="info">
          q.question
        </Alert>
      </>
    ))
  }

  return (

    <div>
      <Grid container

      >
        <Grid item xs={12} >
          <CreatePaper values={finalObj} handleChange={handleCreatePaperChanges} setYes={handleYes} />
        </Grid>
      </Grid>

      <div style={{ width: "100%", display: yes ? 'block' : 'none' }}>
        <form className={classes.root} autoComplete="off" onSubmit={handleAddQuestion} >

          <Grid container direction="row" justify="center">
            <Grid
              item
              xs={12}
              sm={9}
              lg={9}
              style={{ padding: "0px 80px 0px 0px" }}
            >
              <TextField required required id="standard-basic" label="Enter Question" name="question" value={ques.question} onChange={handleChange} fullWidth={true} />

            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              lg={3}

            >
              <TextField required id="standard-basic" label="Marks For Correct Ans" name="marks" value={ques.marks} onChange={handleChange} />

            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              lg={3}
            // style={{ minWidth: "100%" }}

            >
              <TextField required id="standard-basic" label="Option (a)" name="optionA" value={ques.optionA} onChange={handleChange} />

            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              lg={3}
            // style={{ minWidth: "100%" }}

            >
              <TextField id="standard-basic" label="Option (b)" name="optionB" value={ques.optionB} onChange={handleChange} />

            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              lg={3}
            // style={{ minWidth: "100%" }}

            >
              <TextField id="standard-basic" label="Option (c)" name="optionC" value={ques.optionC} onChange={handleChange} />

            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              lg={3}
            // style={{ minWidth: "100%" }}

            >
              <TextField id="standard-basic" label="Option (d)" name="optionD" value={ques.optionD} onChange={handleChange} />

            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              lg={3}
              style={{ minWidth: "100%", marginTop: "15px" }}

            >
              <FormGroup row>
                <p className={classes.label}>Choose Correct Answers</p>
                <Grid container>
                  <Grid item className={classes.textFieldContainer} xs={3}>
                    <FormControlLabel
                      control={<Checkbox checked={ques.Achecked} onChange={handleCheckboxChange} name="Achecked" color="primary" />}
                      label="Option (a)"
                    />
                  </Grid>
                  <Grid item className={classes.textFieldContainer} xs={3}>
                    <FormControlLabel
                      control={<Checkbox checked={ques.Bchecked} onChange={handleCheckboxChange} name="Bchecked" color="primary" />}
                      label="Option (b)"
                    />
                  </Grid>
                  <Grid item className={classes.textFieldContainer} xs={3}>
                    <FormControlLabel
                      control={<Checkbox checked={ques.Cchecked} onChange={handleCheckboxChange} name="Cchecked" color="primary" />}
                      label="Option (c)"
                    />
                  </Grid>
                  <Grid item className={classes.textFieldContainer} xs={3}>

                    <FormControlLabel
                      control={<Checkbox checked={ques.Dchecked} onChange={handleCheckboxChange} name="Dchecked" color="primary" />}
                      label="Option (d)"
                    />
                  </Grid>
                </Grid>
              </FormGroup>

            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              lg={12}
              style={{ marginTop: "30px", display: "flex", justifyContent: "center", }}
            >

              <Button variant="contained" color="primary" type="submit" >
                Add Question
            </Button>

            </Grid>

          </Grid>



        </form>

        <Grid container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ marginTop: "100px" }}
        >

          <Grid item className={classes.textFieldContainer} xs={6} >
            <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth  >
              SUBMIT PAPER
          </Button>

          </Grid>
        </Grid>
      </div>

      <div style={{ display: success ? "block" : "none" }}>

        <Grid container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ marginTop: "100px" }}
        >

          <Grid item className={classes.textFieldContainer} xs={8} >
            <Success />

          </Grid>
        </Grid>
      </div>

      <div>
        {renderQuestions()}
      </div>


    </div>
  );
}


// {name:"MSE1", subject: "a", maxMarks: "b", questions: [{ question: "a", correctAnswers: ["a", "b"], incorrectAnswers: ["c", "d"], marks: "450" }], examDate: new Date(), teachers: ["603fb77882dff011e88f3a6b"] }