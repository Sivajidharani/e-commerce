import React, { useState, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Badge,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Menu,
  MenuItem,
  Avatar
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../redux/searchSlice";
import debounce from "lodash.debounce";

export default function Header() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const userMenuOpen = Boolean(anchorEl);

  const user = {
    name: "Asma Zuvaireya",
    email: "asmaajmal34@gmail.com"
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      dispatch(setSearchTerm(value));
    }, 500),
    [dispatch]
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            App
          </Typography>

          <div style={{ position: "relative", marginRight: "16px" }}>
            <SearchIcon
              style={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)"
              }}
            />
            <InputBase
              placeholder="Search…"
              onChange={handleSearchChange}
              sx={{
                color: "inherit",
                paddingLeft: "32px",
                backgroundColor: "rgba(255,255,255,0.15)",
                borderRadius: "4px"
              }}
            />
          </div>

          {/* Cart Icon */}
          <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* User Profile Initial */}
          <IconButton
            color="inherit"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Your Cart
          </Typography>
          {cartItems.length === 0 ? (
            <Typography variant="body1">Cart is empty</Typography>
          ) : (
            <List>
              {cartItems.map((item) => (
                <ListItem
                  key={item.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start"
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                  <ListItemText
                    primary={
                      <Typography fontWeight="bold">
                        {item.name} ({item.quantity})
                      </Typography>
                    }
                    secondary={`₹${item.price * item.quantity}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
          {cartItems.length > 0 && (
            <Button variant="contained" color="primary" fullWidth>
              Checkout
            </Button>
          )}
        </Box>
      </Drawer>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={userMenuOpen}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem>
          <Avatar sx={{ bgcolor: "secondary.main", marginRight: 1 }}>
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
          {user.name}
        </MenuItem>
        <MenuItem>{user.email}</MenuItem>
        <MenuItem onClick={() => alert("Logging out...")}>Logout</MenuItem>
      </Menu>
    </>
  );
}
