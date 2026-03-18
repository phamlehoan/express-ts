CREATE TABLE roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  role_name TEXT UNIQUE NOT NULL,
  description TEXT
);

CREATE TABLE features (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  feature_name TEXT NOT NULL,
  feature_key TEXT UNIQUE NOT NULL
);

CREATE TABLE permissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  feature_id INTEGER,
  permission_name TEXT NOT NULL,
  permission_key TEXT UNIQUE NOT NULL,
  FOREIGN KEY (feature_id) REFERENCES features(id)
);

CREATE TABLE role_permissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  role_id INTEGER,
  permission_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email TEXT UNIQUE,
  role_id INTEGER,
  is_active BOOLEAN DEFAULT 1,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);
