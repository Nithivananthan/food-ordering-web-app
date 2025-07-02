const express = require('express');
const mongoose = require('mongoose');
const route = express.Router();

const orderSchema = new mongoose.Schema({
  foodimage: {
    type: String,
    required: true
  },
  foodname: {
    type: String,
    required: true
  },
  foodprice: {
    type: String,
    required: true
  },
  foodquantity: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  totalprice: {
    type: Number,
    required: true
  },
 id:{type:String,require:true}
});
const Order = mongoose.model('Order', orderSchema);

route.post('/', async (req, res) => {
  try {
    const { foodimage, foodname, foodprice, foodquantity, name, number, address, totalprice,id} = req.body;

    const orderData = new Order({
      foodimage,
      foodname,
      foodprice,
      foodquantity,
      name,
      number,
      address,
      totalprice,
      id
    });
    await orderData.save();
    res.status(201).json({
      message: 'Order placed successfully',
      order: orderData
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({
      message: 'Failed to place order',
      error: error.message
    });
  }
});

route.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const orderData = await Order.find({ id: userId }); // Notice: { id: userId }

    res.status(200).json(orderData);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      message: 'Failed to fetch orders',
      error: error.message,
    });
  }
});
route.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({
      message: 'Failed to cancel order',
      error: error.message,
    });
  }
});
module.exports = route;