import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const orderSchema = new mongoose.Schema({ deliveryAgent: mongoose.Schema.Types.ObjectId }, { strict: false });
const Order = mongoose.model('OrderTest', orderSchema, 'orders');

const userSchema = new mongoose.Schema({ role: String }, { strict: false });
const User = mongoose.model('UserTest', userSchema, 'users');

async function run() {
  const agents = await User.find({ role: 'agent' });
  console.log("Number of agents:", agents.length);
  const ordersWithAgent = await Order.find({ deliveryAgent: { $exists: true, $ne: null } });
  console.log("Orders with an agent:", ordersWithAgent.length);
  process.exit(0);
}
run();
