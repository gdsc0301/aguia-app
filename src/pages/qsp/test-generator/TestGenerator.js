import { Box, TextField, MenuItem, Grid, Paper, Button, IconButton, Fab } from "@material-ui/core";
import { Add, RemoveCircle, Print } from "@material-ui/icons";

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
            display: "inline-block",
            marginTop: 0,
            pageBreakAfter: "avoid"
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
                removeButton: {
                    width: "16px",
                    height: "16px",
                    margin: "4px 0 0 0",
                    color: "#FFF",
                    fontSize: "16px",
                    fontWeight: 900,
                    textAlign: "center",
                    float: "right"
                },
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

function Questions(props){
    let chapters = [];
    var questionNumber = 0;

    for (const chapterNumber in props.bookChapters) {
        const chapterQuestions = props.bookChapters[chapterNumber];
        //console.log(chapterQuestions);

        chapters.push((
            <>
                <h4 style={styles.testPage.chapter}>Capítulo {chapterNumber}</h4>
                {
                    chapterQuestions.map(
                        // eslint-disable-next-line no-loop-func
                        (question, questionIndex) => {
                            if(!question) return;
                            questionNumber++;

                            return (
                                <Box style={styles.testPage.questions.question}>
                                    <h5 style={styles.testPage.questions.question.text}>{questionNumber}) {question.question}
                                        <IconButton
                                            size="small"
                                            className="noPrint"
                                            style={styles.testPage.questions.question.removeButton}
                                            onClick={()=>{props.removeQuestion(chapterNumber, questionIndex)}}
                                            aria-label="delete"><RemoveCircle color="secondary" /></IconButton>
                                    </h5>
                                    <ol style={styles.testPage.questions.question.alternatives}>
                                        <li key={"qA"}>{question.A}</li>
                                        <li key={"qB"}>{question.B}</li>
                                        <li key={"qC"}>{question.C}</li>
                                        <li key={"qD"}>{question.D}</li>
                                    </ol>
                                </Box>
                            );
                        }
                    )
                }
            </>
        ))
    }

    return chapters;
}

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
                    questionChapter: "",
                    A:"", B:"", C:"", D:""
                },
                bookChapters: {}
            };
        }

        this.bindInput = this.bindInput.bind(this);
        this.updateTest = this.updateTest.bind(this);
    }

    storeState() {
        //console.log("storeState", JSON.stringify(this.state));
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
        //console.log("updateTest");
        let newValue = {};
        newValue[e.target.name] = e.target.value;
        this.setState(newValue);
        this.storeState();
    }

    addQuestion(e) {
        e.preventDefault();
        let theState = {...this.state};

        //console.log("addQuestion", this);
        //console.log("Question",theState.newQuestion.question);
        
        if(theState.newQuestion.question === "") return;

        if(theState.bookChapters[theState.newQuestion.questionChapter] === undefined) {
            theState.bookChapters[theState.newQuestion.questionChapter] = [{...theState.newQuestion}];
        }else {
            theState.bookChapters[theState.newQuestion.questionChapter].push({...theState.newQuestion});
        }

        theState.newQuestion = {
            question: "",
            questionChapter: theState.newQuestion.questionChapter,
            A:"", B:"", C:"", D:""
        };

        //console.log("theState", theState);
        this.setState(theState, ()=>{this.storeState();});
    }

    removeQuestion(chapter, question) {
        //console.log("removeQuestion in chapter: ", chapter);

        this.setState((curr)=>{
            console.log(curr.bookChapters[chapter].length);
            if(!curr.bookChapters[chapter] || curr.bookChapters[chapter].length === 0){
                delete curr.bookChapters[chapter];
                return curr;
            }
                
            curr.bookChapters[chapter].splice(question, 1);

            return curr;
        }, this.storeState);
    }

    render(){
        let theChapters = this.state.bookChapters;
        return (
            <Box className="testContainer" style={{marginTop: 32}}>
                <Grid container spacing={4} style={styles.testOptions}>
                    <Grid item lg={6}>
                        <h3>Adicionar pergunta</h3>
                        <Grid container spacing={4}>
                            <Grid item md={8}>
                                <TextField value={this.state.newQuestion.question} onInput={this.bindInput} style={{...styles.testOptions.question.input, marginBottom: 16}} variant="outlined" name="question" label="Insira a pergunta" multiline required />
                            </Grid>
                            <Grid item md={3}>
                                <TextField value={this.state.newQuestion.questionChapter} onInput={this.bindInput} style={{...styles.testOptions.question.input, marginBottom: 16}} variant="outlined" name="questionChapter" label="Capítulo" required />
                            </Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item lg={12}>
                                <TextField value={this.state.newQuestion.A} style={styles.testOptions.question.alternative} onChange={this.bindInput} name="A" placeholder='Resposta "A"' required/>
                                <TextField value={this.state.newQuestion.B} style={styles.testOptions.question.alternative} onChange={this.bindInput} name="B" placeholder='Resposta "B"' required/>
                                <TextField value={this.state.newQuestion.C} style={styles.testOptions.question.alternative} onChange={this.bindInput} name="C" placeholder='Resposta "C"' required/>
                                <TextField value={this.state.newQuestion.D} style={styles.testOptions.question.alternative} onChange={this.bindInput} name="D" placeholder='Resposta "D"' required/>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center">
                            <Grid item>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    endIcon={<Add />}
                                    onClick={(e)=>{this.addQuestion(e)}}>Inserir nova Pergunta</Button>
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
                                    value={this.state.bookName}
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
                                    defaultValue={this.state.testCategory}
                                    onChange={this.updateTest}>
                                    {
                                        testCategories.map(
                                            (item,i) => (
                                                <MenuItem key={i} value={item} selected={!i}>{item}</MenuItem>
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
                        <Questions bookChapters={theChapters} removeQuestion={(cNumber, qIndex) => {this.removeQuestion(cNumber, qIndex)}} />
                    </Box>
                </Paper>
            </Box>
        );
    }
}