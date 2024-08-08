import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddButton from '../components/AddButton';
import Navbar from '@/components/Navbar';
import Loading from '@/components/Loading';
import { toast } from 'react-toastify';
import AddArticleModal from '@/components/AddArticleModal';
import EditArticleModal from '@/components/EditArticleModal';
import { red, yellow } from '@mui/material/colors';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import Footer from '@/components/Footer.';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [addArticleModalOpen, setAddArticleModalOpen] = useState(false);
  const [editArticleModalOpen, setEditArticleModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, [page]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
        params: {
          page: page + 1,
          limit: 5,
        },
      });
      setArticles(response.data.articles);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error('Error fetching articles: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSaveArticle = async (articleData) => {
    try {
      setLoading(true);
      if (currentArticle) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/articles/${currentArticle._id}`, articleData);
        fetchArticles();
        setEditArticleModalOpen(false);
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/articles`, articleData);
        fetchArticles();
        setAddArticleModalOpen(false);
      }
      setCurrentArticle(null);
      toast.success("Artikel sukses disimpan");
    } catch (error) {
      toast.error('Error saving article: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (article) => {
    setCurrentArticle(article);
    setEditArticleModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`);
      setIsDeleteModalOpen(false);
      fetchArticles();
      toast.success('Article deleted successfully');
    } catch (error) {
      toast.error('Error deleting article: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="container mx-auto">
          <div className="overflow-x-auto">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Judul</TableCell>
                    <TableCell>Konten</TableCell>
                    <TableCell>Penulis</TableCell>
                    <TableCell>Gambar</TableCell>
                    <TableCell>Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {articles.map((article) => (
                    <TableRow key={article._id}>
                      <TableCell className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-xs">{article.title}</TableCell>
                      <TableCell className="whitespace-nowrap overflow-hidden overflow-ellipsis max-w-xs">{article.content}</TableCell>
                      <TableCell>{article.writer}</TableCell>
                      <TableCell>
                        {article.image && (
                          <img
                            src={`data:${article.image.contentType};base64,${article.image.data}`}
                            alt={article.title}
                            className="w-auto max-h-36 md:max-h-48 lg:max-h-60"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEditClick(article)}>
                          <EditIcon sx={{ color: yellow[500] }}/>
                        </IconButton>
                        <IconButton onClick={() => {setIsDeleteModalOpen(true); setCurrentArticle(article);}}>
                          <DeleteIcon sx={{ color: red[500] }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="flex justify-between mt-4 mb-20">
            <Button
              onClick={() => handleChangePage(null, page - 1)}
              disabled={page === 0}
              variant="contained"
              color="primary"
            >
              Previous
            </Button>
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <Button
              onClick={() => handleChangePage(null, page + 1)}
              disabled={page + 1 >= totalPages}
              variant="contained"
              color="primary"
            >
              Next
            </Button>
          </div>
          <AddButton onClick={() => setAddArticleModalOpen(true)} />
          <DeleteConfirmation isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} onClick={() => {handleDeleteClick(currentArticle._id)}}/>
          <AddArticleModal
            open={addArticleModalOpen}
            onClose={() => setAddArticleModalOpen(false)}
            onSave={handleSaveArticle}
          />
          <EditArticleModal
            open={editArticleModalOpen}
            onClose={() => setEditArticleModalOpen(false)}
            onSave={handleSaveArticle}
            article={currentArticle}
          />
        </div>
        <Footer />
      </main>
      <style jsx>{`
        .truncate {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px; /* Adjust as needed */
        }
      `}</style>
    </>
  );
}