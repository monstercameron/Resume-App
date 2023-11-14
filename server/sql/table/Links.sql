DROP TABLE IF EXISTS links;

CREATE TABLE links (
    link_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    link_type VARCHAR(100) NOT NULL,    -- Type of link (e.g., LinkedIn, Portfolio, GitHub)
    url VARCHAR(255) NOT NULL,          -- URL of the link
    description TEXT,                   -- Optional description of the link
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
