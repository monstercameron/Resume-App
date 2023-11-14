DROP TABLE IF EXISTS jobs;

CREATE TABLE jobs (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    location VARCHAR(255),  -- Added field for job location
    start_date DATE,
    end_date DATE,
    job_description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
