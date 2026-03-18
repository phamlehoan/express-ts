CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT
);

CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER,
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price_selling DECIMAL NOT NULL,
  price_import DECIMAL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
