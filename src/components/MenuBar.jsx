import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { PokemonContext } from "../provider/PokemonProvider";
import { useContext, useState } from "react";
import { GiPunchBlast } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const pages = ["My Pokemons", "Battle Stats", "About"];
const settings = ["Profile", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, setUser, userIsLoggedIn, setUserIsLoggedIn } =
    useContext(PokemonContext);
  const navigate = useNavigate();
  const location = useLocation();

  const artworkUrl =
  user?.team?.[0]?.sprites?.other?.["official-artwork"]?.front_default;

  const handleLogOut = () => {
    setUserIsLoggedIn(false);
    setUser({});
    navigate("/");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (page === "My Pokemons") {
      navigate("/my-pokemons");
    } else if (page === "Battle Stats") {
      navigate("/battle-stats");
    } else if (page === "About") {
      navigate("/about");
    }
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    setting === "Logout" ? handleLogOut() : navigate("/");
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#333" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <GiPunchBlast
            onClick={() => navigate("/")}
            style={{ fontSize: 40, cursor: "pointer" }}
            sx={{ display: { xs: "flex", md: "none" }, mr: 3 }}
          />
          <Typography
            onClick={() => navigate("/")}
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            POKE-FIGHT!
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              const pagePath = `/${page.toLowerCase().replace(" ", "-")}`;
              return (
                <Button
                  key={page}
                  onClick={(e) => handleCloseNavMenu(page)}
                  sx={{
                    my: 2,
                    color: location.pathname === pagePath ? "#b5e9f7" : "white",
                    display: "block",
                  }}
                >
                  {page}
                </Button>
              );
            })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.username} src={artworkUrl} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={(e) => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
