import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();
  const [questions, setQuestions] = React.useState([ ])
  const [ques, setQues] = React.useState({ question: "", optionA: "", optionB: "", optionC: "", optionD: "", Achecked: false, Bchecked: false, Cchecked: false, Dchecked: false, })

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
    console.log("Submitted")
  }


  const handleAddQuestion = () => {
    console.log("add question")
    var correctAns = []
    var incorrectAns = []
    ques.Achecked ? correctAns.push(ques.optionA) : incorrectAns.push(ques.optionA)
    ques.Bchecked ? correctAns.push(ques.optionB) : incorrectAns.push(ques.optionB)
    ques.Cchecked ? correctAns.push(ques.optionC) : incorrectAns.push(ques.optionC)
    ques.Dchecked ? correctAns.push(ques.optionD) : incorrectAns.push(ques.optionD)
    

    var obj = {question:ques.question, }

  }



  React.useEffect(() => { console.log(ques) }, [ques])

  return (

    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField id="standard-basic" label="Enter Question" name="question" value={ques.question} onChange={handleChange} />
      <TextField id="standard-basic" label="Option (a)" name="optionA" value={ques.optionA} onChange={handleChange} />
      <TextField id="standard-basic" label="Option (b)" name="optionB" value={ques.optionB} onChange={handleChange} />
      <TextField id="standard-basic" label="Option (c)" name="optionC" value={ques.optionC} onChange={handleChange} />
      <TextField id="standard-basic" label="Option (d)" name="optionD" value={ques.optionD} onChange={handleChange} />


      <FormGroup row>
      <label>Correct Answers</label>
        <FormControlLabel
          control={<Checkbox checked={ques.Achecked} onChange={handleCheckboxChange} name="Achecked" color="primary" />}
          label="Option (a)"
        />
        <FormControlLabel
          control={<Checkbox checked={ques.Bchecked} onChange={handleCheckboxChange} name="Bchecked" color="primary" />}
          label="Option (b)"
        />
        <FormControlLabel
          control={<Checkbox checked={ques.Cchecked} onChange={handleCheckboxChange} name="Cchecked" color="primary"/>}
          label="Option (c)"
        />
        <FormControlLabel
          control={<Checkbox checked={ques.Dchecked} onChange={handleCheckboxChange} name="Dchecked" color="primary" />}
          label="Option (d)"
        />
      </FormGroup>


      <Button variant="contained" color="primary" onClick={handleAddQuestion}>
        Add Question
      </Button>
      <Button variant="contained" color="primary" >Submit Paper</Button>

    </form>
  );
}
