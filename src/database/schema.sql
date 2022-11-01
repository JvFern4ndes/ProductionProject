CREATE DATABASE productionproject;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS functions (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS machines (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE,
  phone VARCHAR,
  function_id UUID,
  FOREIGN KEY (function_id) REFERENCES functions(id)
);

CREATE TABLE IF NOT EXISTS users_machines (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  id_user UUID,
  id_machine UUID
);
