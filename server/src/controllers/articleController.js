const articleModel = require('../models/articleModel');
const sharp = require('sharp');

exports.createArticle = async (req, res) => {
  try {
    const { title, content, writer } = req.body;

    if (!title || !content || !writer || !req.file) {
      return res.status(400).send({
        message: "All fields are required (title, content, writer, image)"
      });
    }

    if (req.file.size > 2 * 1024 * 1024) {
      return res.status(400).json({ error: 'File size is too large. Maximum limit is 2MB.' });
    }

    const base64Image = req.file.buffer.toString('base64');

    const newArticle = new articleModel({
      title,
      content,
      writer,
      image: {
        data: base64Image,
        contentType: req.file.mimetype
      }
    });

    await newArticle.save();
    res.status(201).send({message: "Article uploaded successfully"});
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the article."
    });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await articleModel.find();

    const compressedArticles = await Promise.all(articles.map(async (article) => {
      if (article.image && article.image.data) {
        const buffer = Buffer.from(article.image.data, 'base64');
        const compressedBuffer = await sharp(buffer)
          .resize({ width: 800, height: 800, fit: sharp.fit.inside })
          .jpeg({ quality: 80 })
          .toBuffer();

        article.image.data = compressedBuffer.toString('base64');
      }
      return article;
    }));

    res.status(200).send(compressedArticles);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving articles."
    });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await articleModel.findById(req.params.id);

    if (!article) {
      return res.status(404).send({
        message: "Article not found with id " + req.params.id
      });
    }

    res.status(200).send(article);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Article not found with id " + req.params.id
      });
    }
    res.status(500).send({
      message: "Error retrieving article with id " + req.params.id
    });
  }
};

exports.getArticlesWithPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const articles = await articleModel.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await articleModel.countDocuments();

    res.status(200).json({
      articles,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving articles."
    });
  }
};


exports.deleteArticleById = async (req, res) => {
  try {
    const article = await articleModel.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).send({
        message: "Article not found with id " + req.params.id
      });
    }

    res.status(200).send({ message: "Article deleted successfully!" });
  } catch (err) {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: "Article not found with id " + req.params.id
      });
    }
    res.status(500).send({
      message: "Could not delete article with id " + req.params.id + err.message
    });
  }
};
