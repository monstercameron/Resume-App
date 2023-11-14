DROP TABLE IF EXISTS interests;

CREATE TABLE interests (
    interest_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    interest VARCHAR(255) NOT NULL,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
