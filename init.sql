CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password TEXT,
    rol VARCHAR(20), -- admin, operador, cliente
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conductores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    licencia VARCHAR(50),
    historial TEXT
);

CREATE TABLE vehiculos (
    id SERIAL PRIMARY KEY,
    placa VARCHAR(20) UNIQUE,
    capacidad INTEGER,
    mantenimiento BOOLEAN,
    disponible BOOLEAN DEFAULT true
);

CREATE TABLE rutas (
    id SERIAL PRIMARY KEY,
    origen VARCHAR(100),
    destino VARCHAR(100),
    distancia_km INTEGER
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER REFERENCES usuarios(id),
    id_conductor INTEGER REFERENCES conductores(id),
    id_vehiculo INTEGER REFERENCES vehiculos(id),
    id_ruta INTEGER REFERENCES rutas(id),
    estado VARCHAR(20), -- pendiente, en_transito, entregado, cancelado
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
