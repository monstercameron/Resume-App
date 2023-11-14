DROP TABLE IF EXISTS awards;

CREATE TABLE awards (
    award_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    award_name VARCHAR(255) NOT NULL,
    awarded_by VARCHAR(255),
    award_date DATE,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
