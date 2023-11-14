DROP TABLE IF EXISTS projects;

CREATE TABLE projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    start_date DATE,
    end_date DATE,
    role VARCHAR(255),               -- The role or position held in the project
    description TEXT,                -- Description of the project
    url VARCHAR(255),                -- URL for the project, if applicable
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
