DROP TABLE IF EXISTS languages;

CREATE TABLE languages (
    language_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    language VARCHAR(255) NOT NULL,
    proficiency_level VARCHAR(100),  -- Field to store the proficiency level (e.g., Beginner, Intermediate, Fluent)
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
