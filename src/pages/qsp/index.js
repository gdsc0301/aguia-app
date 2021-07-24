import { Container, Box } from "@material-ui/core";
import { TestGenerator } from "./test-generator/TestGenerator";

function Index() {

    return (
        <Container className="qsp">
            <h1>Quem Sabe Prova</h1>
            <small>Criação de prova</small>
            <br />
            <Box className="testBox">
                <TestGenerator />
            </Box>
        </Container>
    );
}

export default Index;