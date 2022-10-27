CREATE DATABASE productionproject;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE functions (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL
);
