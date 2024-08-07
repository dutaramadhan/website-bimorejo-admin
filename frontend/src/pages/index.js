import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Container,
  Typography,
  Card,
  CardMedia
} from '@mui/material';
import AddButton from '../components/AddButton'; // Pastikan jalur impor ini benar

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, [page, rowsPerPage]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:3001/articles', {
        params: {
          page: page + 1,
          limit: rowsPerPage,
        },
      });
      setArticles(response.data.articles);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <main className="relative min-h-screen">
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Articles
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Paragraphs</TableCell>
                <TableCell>Penulis</TableCell>
                <TableCell>Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article._id}>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>{article.content}</TableCell>
                  <TableCell>{article.writer}</TableCell>
                  <TableCell>
                    {article.image && (
                      <Card>
                        <CardMedia
                          component="img"
                          height="140"
                          image={`data:${article.image.contentType};base64,${article.image.data}`}
                          alt={article.title}
                        />
                      </Card>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={totalPages * rowsPerPage}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
      <AddButton onClick={() => setOpenModal(true)} />
    </main>
  );
}
