const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./database/db');
const router = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoute'); 
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');
const commentRoutes = require('./routes/commentRoutes');
const wishlistRoutes = require('./routes/wishlistRoute');
const addressRoutes = require('./routes/addressRoutes');
const returnRoute = require('./routes/returnRoute');
const paymentRoute = require('./routes/paymentRoute');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static image files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', router);
app.use('/api', productRoutes); 

app.use('/api',cartRoutes);

app.use('/api',orderRoutes);

app.use('/api',adminOrderRoutes);

app.use('/api',commentRoutes);

app.use('/api',wishlistRoutes);

app.use('/api',addressRoutes);

app.use('/api',returnRoute);

app.use('/api',paymentRoute);

app.listen(3000, () => {
  console.log(`Server is running on the Port 3000`);
});
