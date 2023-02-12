CREATE DATABASE express_starter;

CREATE extension IF NOT EXISTS "uuid-ossp"; 

CREATE TABLE users(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  "password" VARCHAR(255) NOT NULL
);