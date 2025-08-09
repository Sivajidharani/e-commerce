import React from "react";
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { Search as SearchIcon, AccountCircle } from "@mui/icons-material";

const products = [
  { id: 1, name: "Product 1", price: "250", image: "https://via.placeholder.com/200" },
  { id: 2, name: "Product 2", price: "350", image: "https://via.placeholder.com/200" },
  { id: 3, name: "Product 3", price: "450", image: "https://via.placeholder.com/200" },
  { id: 4, name: "Product 4", price: "550", image: "https://via.placeholder.com/200" },
];

function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1 }}>
        
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyShop
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "white", borderRadius: 1, px: 1, width: "50%" }}>
            <SearchIcon sx={{ color: "gray" }} />
            <InputBase
              placeholder="Search products..."
              sx={{ ml: 1, flex: 1 }}
              inputProps={{ "aria-label": "search products" }}
            />
          </Box>

          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Dashboard;
