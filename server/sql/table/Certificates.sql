DROP TABLE IF EXISTS certifications;

CREATE TABLE certifications (
    certification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    certification_name VARCHAR(255) NOT NULL,
    issued_by VARCHAR(255),
    issue_date DATE,
    expiry_date DATE,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
