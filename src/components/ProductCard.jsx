import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, incrementQty, decrementQty } from "../redux/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.items.find((i) => i.id === product.id));

  return (
    <Card sx={{ maxWidth: 300, m: 1 }}>
      <CardMedia component="img" height="200" image={product.image} alt={product.name} />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography color="text.secondary">₹{product.price}</Typography>

        {!cartItem ? (
          <Button variant="contained" sx={{ mt: 1 }} onClick={() => dispatch(addToCart(product))}>
            Add to Cart
          </Button>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <IconButton onClick={() => dispatch(decrementQty(product.id))}>
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ mx: 1 }}>{cartItem.quantity}</Typography>
            <IconButton onClick={() => dispatch(incrementQty(product.id))}>
              <AddIcon />
            </IconButton>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
