const BaseController = require("./baseController");

class ProductsController extends BaseController {
  constructor(model) {
    super(model);
  }

  async insertOne(req, res) {
    const { name, price } = req.body;
    try {
      const newProduct = await this.model.create({
        updated_at: new Date(),
        created_at: new Date(),
        name: name,
        price: price,
      });
      return res.json(newProduct);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getOne(req, res) {
    const id = req.params.productId;

    try {
      const output = await this.model.findByPk(id);
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async editOne(req, res) {
    const id = req.params.productId;
    const { name, price } = req.body;
    try {
      const updateProduct = await this.model.findByPk(id);
      updateProduct.set({
        updated_at: new Date(),
        name: name,
        price: price,
      });
      await updateProduct.save();
      return res.json(updateProduct);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async deleteOne(req, res) {
    const id = req.params.productId;
    try {
      const output = await this.model.findByPk(id);
      console.log("deleting:", output);
      if (!output) {
        res.status(404).json({ error: true, msg: err });
      }
      const deletedItem = output.destroy();
      const allItems = await this.model.findAll();
      // const allItems = await this.getAll();
      // console.log("all:", allItems);
      // return this.getAll();
      return res.json(allItems);
      if (!deleteItem) {
        res.status(500).json({ error: true, msg: err });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = ProductsController;
