// backend/src/controllers/deliveryController.js
import Delivery from '../models/Delivery.js';
import Order from '../models/Order.js';

// Assign delivery agent
export const assignAgent = async (req, res) => {
  try {
    const { orderId, agentId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const delivery = await Delivery.create({
      order: order._id,
      agent: agentId,
      status: 'Assigned',
    });

    order.deliveryAgent = agentId;
    order.status = 'Delivery Agent Assigned';
    await order.save();

    res.status(201).json(delivery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update delivery status
export const updateDeliveryStatus = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) return res.status(404).json({ message: 'Delivery not found' });

    delivery.status = req.body.status || delivery.status;
    if (req.body.location) {
      delivery.locationUpdates.push({ location: req.body.location });
    }
    await delivery.save();

    const order = await Order.findById(delivery.order);
    order.status = delivery.status;
    await order.save();

    res.json(delivery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get delivery details
export const getDeliveryDetails = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id)
      .populate('order')
      .populate('agent', 'name email');
    if (!delivery) return res.status(404).json({ message: 'Delivery not found' });
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
