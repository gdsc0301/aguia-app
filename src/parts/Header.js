import { AppBar,Toolbar, IconButton, Typography } from "@material-ui/core";
import { MenuOpen } from "@material-ui/icons";

function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuOpen />
                </IconButton>
                <Typography variant="h6">Águia App</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;