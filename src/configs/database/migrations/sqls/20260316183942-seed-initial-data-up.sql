-- 1. SEED ROLES (Tạo nhiều role để làm bài tập phân quyền)
INSERT INTO roles (role_name, description) VALUES 
('SuperAdmin', 'Toàn quyền hệ thống'),
('Manager', 'Quản lý chi nhánh'),
('Accountant', 'Kế toán tổng hợp'),
('Warehouse_Manager', 'Trưởng kho'),
('Warehouse_Staff', 'Nhân viên kho'),
('Sales_Leader', 'Trưởng nhóm kinh doanh'),
('Sales_Staff', 'Nhân viên bán hàng'),
('Shipper', 'Nhân viên giao hàng'),
('Customer_Service', 'Chăm sóc khách hàng'),
('Technical_Support', 'Hỗ trợ kỹ thuật');

-- 2. SEED FEATURES (Các chức năng chính của App)
INSERT INTO features (feature_name, feature_key) VALUES 
('Dashboard', 'dash.view'),
('User Management', 'user.all'),
('Role & Permission', 'rbac.all'),
('Product Catalog', 'prod.all'),
('Inventory Tracking', 'inv.all'),
('Customer Directory', 'cust.all'),
('Order Processing', 'sale.order'),
('Debt Management', 'sale.debt'),
('Revenue Report', 'report.rev'),
('System Settings', 'sys.config');

-- 3. SEED CATEGORIES (Danh mục sản phẩm đa dạng)
INSERT INTO categories (name, description) VALUES 
('Linh kiện PC', 'CPU, RAM, Mainboard, VGA'),
('Laptop & Workstation', 'Laptop gaming, văn phòng'),
('Màn hình máy tính', 'Monitor 2K, 4K, Cong'),
('Gaming Gear', 'Chuột, Bàn phím, Tai nghe gaming'),
('Thiết bị mạng', 'Router WiFi, Switch, Modem'),
('Thiết bị lưu trữ', 'SSD, HDD, USB, Thẻ nhớ'),
('Phần mềm bản quyền', 'Windows, Office, Diệt virus'),
('Máy in & Thiết bị VP', 'Máy in, Máy scan, Máy chiếu'),
('Phụ kiện & Cáp', 'Cáp HDMI, DisplayPort, Hub chuyển'),
('Âm thanh', 'Loa vi tính, Tai nghe kiểm âm');

-- 1. SEED PRODUCTS (50 sản phẩm trải dài trên 10 danh mục của Phase 1)
-- Sử dụng mẹo INSERT từ SELECT để tạo nhanh dữ liệu có cấu trúc
INSERT INTO products (category_id, sku, name, price_selling, price_import, stock_quantity)
SELECT 
  (ABS(RANDOM()) % 10) + 1, 
  'SKU-' || substr('000' || id, -3), 
  'Sản phẩm mẫu số ' || id,
  (ABS(RANDOM()) % 50 + 10) * 10000, -- Giá bán từ 100k - 600k
  (ABS(RANDOM()) % 40 + 5) * 10000,   -- Giá nhập từ 50k - 450k
  (ABS(RANDOM()) % 200)               -- Tồn kho từ 0 - 200
FROM (
  SELECT 1 as id UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION
  SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION
  SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION
  SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20 UNION
  SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24 UNION SELECT 25 UNION
  SELECT 26 UNION SELECT 27 UNION SELECT 28 UNION SELECT 29 UNION SELECT 30 UNION
  SELECT 31 UNION SELECT 32 UNION SELECT 33 UNION SELECT 34 UNION SELECT 35 UNION
  SELECT 36 UNION SELECT 37 UNION SELECT 38 UNION SELECT 39 UNION SELECT 40 UNION
  SELECT 41 UNION SELECT 42 UNION SELECT 43 UNION SELECT 44 UNION SELECT 45 UNION
  SELECT 46 UNION SELECT 47 UNION SELECT 48 UNION SELECT 49 UNION SELECT 50
);

-- 2. SEED CUSTOMERS (50 khách hàng)
INSERT INTO customers (full_name, phone, address, debt_limit)
SELECT 
  'Khách hàng ' || id,
  '090' || substr('0000000' || id, -7),
  CASE (id % 3) 
    WHEN 0 THEN 'Đà Nẵng' 
    WHEN 1 THEN 'Quảng Nam' 
    ELSE 'Huế' 
  END,
  (id % 5) * 1000000 -- Hạn mức nợ từ 0 - 4 triệu
FROM (
  SELECT 1 as id UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION
  SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION
  SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION
  SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20 UNION
  SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24 UNION SELECT 25 UNION
  SELECT 26 UNION SELECT 27 UNION SELECT 28 UNION SELECT 29 UNION SELECT 30 UNION
  SELECT 31 UNION SELECT 32 UNION SELECT 33 UNION SELECT 34 UNION SELECT 35 UNION
  SELECT 36 UNION SELECT 37 UNION SELECT 38 UNION SELECT 39 UNION SELECT 40 UNION
  SELECT 41 UNION SELECT 42 UNION SELECT 43 UNION SELECT 44 UNION SELECT 45 UNION
  SELECT 46 UNION SELECT 47 UNION SELECT 48 UNION SELECT 49 UNION SELECT 50
);

-- 1. SEED 100 ORDERS
-- Tạo 100 đơn hàng ngẫu nhiên cho 50 khách hàng và 3 nhân viên (ID: 1, 2, 3)
INSERT INTO orders (customer_id, user_id, total_amount, discount_amount, paid_amount, payment_method, order_date)
SELECT 
  (ABS(RANDOM()) % 50) + 1,       -- Random khách hàng từ 1-50
  (ABS(RANDOM()) % 3) + 1,        -- Random nhân viên từ 1-3
  0,                              -- total_amount tạm để 0, sẽ UPDATE sau dựa trên items
  (ABS(RANDOM()) % 5) * 10000,    -- Giảm giá từ 0 - 40k
  0,                              -- paid_amount tạm để 0
  CASE (ABS(RANDOM()) % 2) WHEN 0 THEN 'Cash' ELSE 'Transfer' END,
  datetime('now', '-' || (ABS(RANDOM()) % 30) || ' days') -- Đơn hàng trong 30 ngày qua
FROM (
  SELECT a.id FROM (SELECT 1 as id UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) as a
  CROSS JOIN (SELECT 1 as id UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10) as b
);

-- 2. SEED 250 ORDER ITEMS
-- Mỗi đơn hàng sẽ có từ 1 đến 3 sản phẩm ngẫu nhiên
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, subtotal)
SELECT 
  o.id,
  p.id,
  (ABS(RANDOM()) % 3) + 1,        -- Số lượng từ 1-3
  p.price_selling,                -- Lấy giá bán hiện tại làm giá chốt
  0                               -- subtotal tạm để 0
FROM orders o
CROSS JOIN (SELECT id, price_selling FROM products ORDER BY RANDOM() LIMIT 3) p
WHERE o.id <= 100;

-- 3. CẬP NHẬT DỮ LIỆU LOGIC (Tính toán lại Subtotal và Total)
-- Tính subtotal cho từng item
UPDATE order_items SET subtotal = quantity * price_at_purchase;

-- Cập nhật tổng tiền vào đơn hàng (Sum subtotal)
UPDATE orders SET total_amount = (
  SELECT SUM(subtotal) FROM order_items WHERE order_items.order_id = orders.id
);

-- Giả lập số tiền khách đã trả (Random trả hết hoặc trả một phần)
UPDATE orders SET paid_amount = CASE (ABS(RANDOM()) % 3)
  WHEN 0 THEN total_amount - discount_amount              -- Trả đủ
  WHEN 1 THEN (total_amount - discount_amount) * 0.5      -- Trả một nửa
  ELSE 0                                                  -- Chưa trả
END;
