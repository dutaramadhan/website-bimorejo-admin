const express = require('express');
const router = express.Router();
const multer = require('multer');
const articlesController = require('../controllers/articleController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a new article
router.post('/', upload.single('image'), articlesController.createArticle);

//Edit an existing article
router.put('/:id', upload.single('image'), articlesController.editArticleById);

// Retrieve all articles
// router.get('/', articlesController.getAllArticles);

// Retrieve all articles with pagination
router.get('/', articlesController.getArticlesWithPagination);

// Retrieve a single article by ID
router.get('/:id', articlesController.getArticleById);

// Delete an article by ID
router.delete('/:id', articlesController.deleteArticleById);

module.exports = router;
