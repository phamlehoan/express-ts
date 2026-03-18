CREATE TABLE customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  phone TEXT UNIQUE,
  address TEXT,
  debt_limit DECIMAL DEFAULT 0
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER,
  user_id INTEGER,
  order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL,
  discount_amount DECIMAL DEFAULT 0,
  paid_amount DECIMAL DEFAULT 0,
  is_paid BOOLEAN DEFAULT 0,
  payment_method TEXT,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER,
  product_id INTEGER,
  quantity INTEGER NOT NULL,
  price_at_purchase DECIMAL NOT NULL,
  subtotal DECIMAL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
