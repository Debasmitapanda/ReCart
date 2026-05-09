import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const orderSchema = new mongoose.Schema({ deliveryAgent: mongoose.Schema.Types.ObjectId }, { strict: false });
  const Order = mongoose.model('OrderTest', orderSchema, 'orders');

  const userSchema = new mongoose.Schema({ role: String }, { strict: false });
  const User = mongoose.model('UserTest', userSchema, 'users');

  const agent = await User.findOne({ role: 'agent' });
  if (!agent) {
    console.log("No agent found");
    process.exit(1);
  }
  
  const result = await Order.updateMany(
    { deliveryAgent: { $exists: false } },
    { $set: { deliveryAgent: agent._id, status: 'Delivery Agent Assigned' } }
  );
  
  const result2 = await Order.updateMany(
    { deliveryAgent: null },
    { $set: { deliveryAgent: agent._id, status: 'Delivery Agent Assigned' } }
  );

  console.log(`Assigned ${result.modifiedCount + result2.modifiedCount} orders to agent ${agent._id}`);
  process.exit(0);
}).catch(console.error);
