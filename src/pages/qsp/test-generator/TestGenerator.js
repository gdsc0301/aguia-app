import { Box, TextField, MenuItem, Grid, Paper, Button, Fab } from "@material-ui/core";
import { Add, Remove, Print } from "@material-ui/icons";

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
        padding: "1cm 2cm",
        transformOrigin: "top left",
        transform: "scale(.75)",
        chapter: {
            marginTop: 0,
        },
        printButton: {
            position: "absolute",
            top: 0,
            right: 0,
            transform: "translate(50%, -50%)"
        },
        questions: {
            display: "block",
            marginTop: "32px",
            columnCount: 3,
            question: {
                display: "inline-block",
                width: "100%",
                breakInside: "avoid",
                breakBefore: "column",
                text: {
                    margin: 0,
                    marginTop: 4
                },
                alternatives: {
                    listStyle: "lower-alpha"
                }
            }
        }
    },
    testOptions: {
        question: {
            input: {
                width: "100%",
            },
            alternative: {
                width: "100%",
                margin: "12px 0"
            }
        }
    }
};

export class TestGenerator extends React.Component {
    constructor(props) {
        super(props);
        let prevState = localStorage.getItem("state");
        if(prevState){
            this.state = JSON.parse(prevState);
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
        this.removeQuestion = this.removeQuestion.bind(this);
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

    removeQuestion(chapter, question) {
        this.setState((curr)=>{
            console.log(curr);
            delete curr.bookChapters[chapter][question];
            return curr;
        });
    }

    render(){
        let questionNumber = 0;

        return (
            <Box className="testContainer" style={{marginTop: 32}}>
                <Grid container spacing={4} style={styles.testOptions}>
                    <Grid item lg={6}>
                        <h3>Adicionar pergunta</h3>
                        <Grid container spacing={4}>
                            <Grid item md={8}>
                                <TextField onInput={this.bindInput} style={{...styles.testOptions.question.input, marginBottom: 16}} variant="outlined" name="question" label="Insira a pergunta" multiline required />
                            </Grid>
                            <Grid item md={3}>
                                <TextField onInput={this.bindInput} style={{...styles.testOptions.question.input, marginBottom: 16}} variant="outlined" name="questionChapter" label="Capítulo" type="number" required />
                            </Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item lg={12}>
                                <TextField style={styles.testOptions.question.alternative} onInput={this.bindInput} name="A" placeholder='Resposta "A"' required/>
                                <TextField style={styles.testOptions.question.alternative} onInput={this.bindInput} name="B" placeholder='Resposta "B"' required/>
                                <TextField style={styles.testOptions.question.alternative} onInput={this.bindInput} name="C" placeholder='Resposta "C"' required/>
                                <TextField style={styles.testOptions.question.alternative} onInput={this.bindInput} name="D" placeholder='Resposta "D"' required/>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center">
                            <Grid item>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    endIcon={<Add />}
                                    onClick={this.addQuestion}>Inserir nova Pergunta</Button>
                            </Grid>
                        </Grid>
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
                <span className="noPrint" style={styles.preview}>Pré visualização</span>
                <Paper className="test" elevation={5} style={styles.testPage}>
                    <Fab className="noPrint" style={styles.testPage.printButton} color="primary" onClick={()=>{window.print()}} aria-label="print">
                        <Print />
                    </Fab>
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
                    <Box className="questions" style={styles.testPage.questions}>
                        {
                            this.state.bookChapters.map((chapterQuestions, chapterNumber) => {
                                let chapter = undefined;
                                if(chapterQuestions){
                                    chapter = (
                                        <>
                                            <h4 style={styles.testPage.chapter}>Capítulo {chapterNumber}</h4>
                                            {
                                                chapterQuestions.map(
                                                    (question, questionIndex) => {
                                                        questionNumber++;

                                                        return (
                                                            <Box style={styles.testPage.questions.question}>
                                                                <Fab className="noPrint" chapter={chapterNumber} question={questionIndex} style={styles.testPage.questions.removeButton} color="primary" onClick={this.removeQuestion} aria-label="print">
                                                                    <Remove />
                                                                </Fab>
                                                                <h5 style={styles.testPage.questions.question.text}>{questionNumber}) {question.question}</h5>
                                                                <ol style={styles.testPage.questions.question.alternatives}>
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