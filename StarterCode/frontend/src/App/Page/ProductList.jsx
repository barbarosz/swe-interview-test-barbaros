import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // get products from the backend when the page loads
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/products');
      console.log('Fetched products:', response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // delete a product from the backend and update the UI
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          {products.map((product) => (
            <Card key={product.id} sx={{ width: 280, position: 'relative' }}>
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(product.id)}
                sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
              >
                <DeleteIcon />
              </IconButton>

              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.name}
              />

              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {product.description}
                </Typography>

                <Typography variant="subtitle1" fontWeight="bold">
                  ${product.price}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default ProductList;