DROP TABLE IF EXISTS user_references;

CREATE TABLE user_references (
    reference_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    relationship VARCHAR(255),          -- Relationship to the user (e.g., former supervisor, colleague)
    company VARCHAR(255),               -- Company or organization where the reference works
    position VARCHAR(255),              -- Position of the reference
    contact_info VARCHAR(255),          -- Contact information of the reference
    notes TEXT,                         -- Optional notes or additional information
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
