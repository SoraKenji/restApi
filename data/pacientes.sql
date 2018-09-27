CREATE TABLE public.pacientes (
    id serial,
    nombre character varying(64) NOT NULL,
    apellidos character varying(64) NOT NULL,
    edad integer NOT NULL,
    PRIMARY KEY(id)
);

