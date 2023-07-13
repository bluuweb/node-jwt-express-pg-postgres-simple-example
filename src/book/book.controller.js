import { bookModel } from "./book.model.js";

const create = async (req, res) => {
  try {
    const newBook = await bookModel.create({
      ...req.body,
      user_id: req.user_id,
    });
    return res.json(newBook);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findOne(id);
    if (!book) {
      return res.status(404).send({ error: "Book not found" });
    }
    if (book.user_id !== req.user_id) {
      return res.status(401).send({ error: "Unauthorized" });
    }
    await bookModel.remove(id);
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

export const bookController = {
  create,
  remove,
};
