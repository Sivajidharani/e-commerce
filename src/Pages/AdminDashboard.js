import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function EcommerceApp() {
  const [items, setItems] = useState([
    { id: 1, name: "Tshirt", qty: 5 },
    { id: 2, name: "Saree", qty: 3 },
  ]);

  const [formData, setFormData] = useState({ id: null, name: "", qty: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.qty) return;

    if (formData.id) {
      setItems(
        items.map((item) =>
          item.id === formData.id
            ? { ...item, name: formData.name, qty: Number(formData.qty) }
            : item
        )
      );
    } else {
      setItems([
        ...items,
        { id: Date.now(), name: formData.name, qty: Number(formData.qty) },
      ]);
    }
    setFormData({ id: null, name: "", qty: "" });
  };

  const handleEdit = (item) => {
    setFormData(item);
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Ecommerce App
      </Typography>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          sx={{ mr: 2, mb: 2 }}
        />
        <TextField
          label="Quantity"
          name="qty"
          type="number"
          value={formData.qty}
          onChange={handleChange}
          sx={{ mr: 2, mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          {formData.id ? "Update" : "Add"}
        </Button>
      </form>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.qty}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ mr: 1 }}
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No items found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
