-- SEED DEFAULT ADMIN USER
-- This script inserts a default administrator user into the 'users' table.
-- The default credentials are:
-- Username: admin
-- Password: 123456
INSERT INTO users (username, password_hash, email, role_id, is_active)
VALUES (
  'admin',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', -- Mật khẩu là '123456' (đã được hash bằng bcrypt)
  'admin@example.com',
  (SELECT id FROM roles WHERE role_name = 'SuperAdmin'),
  1
);

-- TẠO CÁC QUYỀN CRUD CHO TỪNG FEATURE
-- This script generates CREATE, READ, UPDATE, DELETE permissions for every feature in the 'features' table.
INSERT INTO permissions (feature_id, permission_name, permission_key)
SELECT
    f.id,
    action.name || ' ' || f.feature_name AS permission_name,
    f.feature_key || '.' || LOWER(action.name) AS permission_key
FROM
    features AS f,
    (
        SELECT 'Create' AS name UNION ALL
        SELECT 'Read' AS name UNION ALL
        SELECT 'Update' AS name UNION ALL
        SELECT 'Delete' AS name
    ) AS action;

-- GÁN TẤT CẢ CÁC QUYỀN VỪA TẠO CHO ROLE 'SuperAdmin'
-- This script assigns all permissions from the 'permissions' table to the 'SuperAdmin' role.
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM roles WHERE role_name = 'SuperAdmin'),
  p.id
FROM
    permissions AS p;
