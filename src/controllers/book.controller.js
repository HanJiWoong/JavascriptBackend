const bookService = require("../services/book.service");

exports.createBook = async (req, res, next) => {
  try {
    console.log("✅ 업로드된 파일 정보:", req.file);

    const { title, author } = req.body;
    const file = req.file;
    const coverUrl = file ? `/uploads/${file.filename}` : null;

    const book = await bookService.createBook(
      title,
      author,
      req.user.id,
      coverUrl
    );
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

exports.getBooks = async (req, res, next) => {
  try {
    const books = await bookService.getMyBooks(req.user.id);
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const book = await bookService.updateBook(
      req.params.id,
      req.body,
      req.user.id
    );
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    await bookService.deleteBook(req.params.id, req.user.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
