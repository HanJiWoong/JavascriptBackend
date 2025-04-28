const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 책 생성
exports.createBook = async (title, author, userId, coverUrl) => {
  return await prisma.book.create({
    data: { title, author, userId, coverUrl },
  });
};

// 내 책 목록 조회
exports.getMyBooks = async (userId) => {
  return await prisma.book.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

// 책 수정
exports.updateBook = async (id, data, userId) => {
  return await prisma.book.updateMany({
    where: { id: Number(id), userId },
    data,
  });
};

// 책 삭제
exports.deleteBook = async (id, userId) => {
  return await prisma.book.deleteMany({
    where: { id: Number(id), userId },
  });
};
