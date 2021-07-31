import React from "react";
import { AppBar,Toolbar, IconButton, Typography, SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText, Link } from "@material-ui/core";
import { MenuOpen, AssignmentTurnedIn } from "@material-ui/icons";

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function Header() {
    const [state, setState] = React.useState({
        MenuOpen: false
    });

    const menuItems = [
        {
            title: "Quem Sabe Prova",
            link: "qsp",
            icon: <AssignmentTurnedIn />
        }
    ];
    
    const toggleMenu = function(){
        setState({...state, ["MenuOpen"]: !state.MenuOpen});
    }

    const openMenu = function(){
        setState({...state, ["MenuOpen"]: true});
    }

    const closeMenu = function(){
        setState({...state, ["MenuOpen"]: false});
    }

    return (
        <AppBar className="header" position="static">
            <Toolbar>
                <IconButton onClick={toggleMenu} edge="start" color="inherit" aria-label="menu">
                    <MenuOpen />
                </IconButton>
                <Typography variant="h6">Águia App</Typography>
                <SwipeableDrawer
                    anchor="left"
                    open={state.MenuOpen}
                    onOpen={openMenu}
                    onClose={closeMenu}
                >
                    <List component="nav">
                    {
                        menuItems.map(item=>(
                            <ListItemLink button key={item.title} href={item.link}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItemLink>
                        ))
                    }
                    </List>
                </SwipeableDrawer>

            </Toolbar>
        </AppBar>
    )
}

export default Header;