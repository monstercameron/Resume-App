CREATE TABLE IF NOT EXISTS user_admin_info (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,        -- Admin status
    admin_role VARCHAR(255),               -- Admin role or title
    permissions TEXT,                      -- Admin-specific permissions
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);