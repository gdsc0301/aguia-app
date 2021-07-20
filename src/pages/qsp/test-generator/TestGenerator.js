import { Box, TextField, MenuItem, Grid, Paper, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import React from "react";

const testCategories = [
    "Categoria A",
    "Categoria B",
    "Categoria C",
    "Categoria D"
];
const styles = {
    preview: {
        display: "block",
        marginTop: 32,
        marginBottom: 8,
        fontSize: 12,
        opacity: .5
    },
    testPage: {
        width: "210mm",
        height: "297mm",
        padding:"1cm 2cm",
        objectFit: "contain",
        transformOrigin: "top left",
        transform: "scale(.75)",
        questions: {
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            maxHeight: "80%"
        }
    },
    testOptions: {
        question: {
            input: {
                width: "100%",
                margin: "12px 0"
            }
        }
    }
};

export class TestGenerator extends React.Component {
    constructor(props) {
        super(props);
        let prevState = JSON.parse(localStorage.getItem("state"));
        if(prevState){
            this.state = prevState;
        }else {
            this.state = {
                bookName: "",
                testCategory: testCategories[0],
                newQuestion: {
                    question: "",
                    questionChapter: 0,
                    A:"", B:"", C:"", D:""
                },
                bookChapters: []
            };
        }

        this.bindInput = this.bindInput.bind(this);
        this.updateTest = this.updateTest.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
    }

    storeState() {
        localStorage.setItem("state", JSON.stringify(this.state));
    }

    bindInput(e) {
        this.setState((curr)=>{
            let theState = curr;
            theState.newQuestion[e.target.name] = e.target.value;

            return theState;
        });
    }

    updateTest(e) {
        let newValue = {};
        newValue[e.target.name] = e.target.value;
        console.log(newValue);
        this.setState(newValue);
    }

    addQuestion(e) {
        e.preventDefault();
        console.log(e, this.state);

        this.setState((curr)=>{
            if(curr.newQuestion.question === "") return;

            let theState = curr;

            console.log("The Question: ", curr.newQuestion);
            if(Array.isArray(theState.bookChapters[curr.newQuestion.questionChapter])) {
                console.log("As Array: ", theState.bookChapters[curr.newQuestion.questionChapter]);
                theState.bookChapters[curr.newQuestion.questionChapter].push(curr.newQuestion);
                console.log("As Array after: ", theState.bookChapters[curr.newQuestion.questionChapter]);
            }else {
                console.log("Not Array: ", theState.bookChapters[curr.newQuestion.questionChapter]);
                theState.bookChapters[curr.newQuestion.questionChapter] = [curr.newQuestion];
                console.log("Not Array after: ", theState.bookChapters[curr.newQuestion.questionChapter]);
            }
            
            theState.newQuestion = {
                question: "",
                questionChapter: 0,
                A:"", B:"", C:"", D:""
            };
            //console.log(theState);
            return theState;
        },()=>{
            this.storeState();
            e.target.reset();
        });
    }

    render(){
        return (
            <Box style={{marginTop: 32}}>
                <Grid container spacing={4} style={styles.testOptions}>
                    <Grid item lg={6}>
                        <h3>Adicionar pergunta</h3>
                        <form id="newQuestion" style={styles.testOptions.question} onSubmit={this.addQuestion}>
                            <Grid container spacing={4}>
                                <Grid item lg={9}>
                                    <TextField onInput={this.bindInput} style={{...styles.testOptions.question.input, marginBottom: 16}} variant="outlined" name="question" label="Insira a pergunta" multiline required />
                                </Grid>
                                <Grid item lg={3}>
                                    <TextField onInput={this.bindInput} style={{...styles.testOptions.question.input, marginBottom: 16}} variant="outlined" name="questionChapter" label="Capítulo" type="number" required />
                                </Grid>
                            </Grid>
                            
                            <TextField style={styles.testOptions.question.input} onInput={this.bindInput} name="A" placeholder='Resposta "A"' required/>
                            <TextField style={styles.testOptions.question.input} onInput={this.bindInput} name="B" placeholder='Resposta "B"' required/>
                            <TextField style={styles.testOptions.question.input} onInput={this.bindInput} name="C" placeholder='Resposta "C"' required/>
                            <TextField style={styles.testOptions.question.input} onInput={this.bindInput} name="D" placeholder='Resposta "D"' required/>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        endIcon={<Add />}>Inserir nova Pergunta</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item>
                        <h3>Informações da Prova</h3>
                        <Grid container spacing={4}>
                            <Grid item lg={12}>
                                <TextField
                                    label="Nome do livro"
                                    variant="outlined"
                                    name="bookName"
                                    placeholder="Ex. O Libertador"
                                    onInput={this.updateTest} />
                            </Grid>
                            <Grid item lg={12}>
                                <TextField
                                    name="testCategory"
                                    select
                                    label="Categoria"
                                    helperText="Selecione a categoria da prova"
                                    variant="outlined"
                                    defaultValue={testCategories[0]}
                                    onChange={this.updateTest}>
                                    {
                                        testCategories.map((item,i) => (
                                                <MenuItem value={item} selected={!i}>{item}</MenuItem>
                                            )
                                        )
                                    }
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <span style={styles.preview}>Pré visualização</span>
                <Paper elevation={5} style={styles.testPage}>
                    <h1>
                        Quem Sabe Prova - { new Date().toLocaleString("pt-br", {year: "numeric"})} - {this.state.bookName}
                        <br/>
                        { this.state.testCategory }
                    </h1>
                    <Grid container direction="column">
                        <Grid item lg={12}>
                            <Grid container>
                                <Grid item lg={8}>
                                    <span>Nome: _______________________________________</span>
                                </Grid>
                                <Grid item lg={4}>
                                    <span>Idade: _______</span>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={12}>
                            <Grid container>
                                <Grid item lg={8}>
                                    <span>Clube: _______________________________________</span>
                                </Grid>
                                <Grid item lg={4}>
                                    <span>Região: _______</span>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box style={styles.testPage.questions}>
                        {
                            this.state.bookChapters.map((chapterQuestions, i) => {
                                let chapter = undefined;
                                if(chapterQuestions){
                                    chapter = (
                                        <>
                                            <h4 style={styles.testPage.chapter}>Capítulo {i}</h4>
                                            {
                                                chapterQuestions.map(
                                                    (question, i) => {
                                                        return (
                                                            <Box>
                                                                <h5 style={styles.testPage.questions.question}>{++i}) {question.question}</h5>
                                                                <ol style={styles.testPage.questions.alternatives}>
                                                                    <li>{question.A}</li>
                                                                    <li>{question.B}</li>
                                                                    <li>{question.C}</li>
                                                                    <li>{question.D}</li>
                                                                </ol>
                                                            </Box>
                                                        );
                                                    }
                                                )
                                            }
                                        </>
                                    )
                                }

                                return chapter;
                            })
                        }
                    </Box>
                </Paper>
            </Box>
        );
    }
}