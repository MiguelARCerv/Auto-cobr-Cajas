-- 1. Crear BD (esto se ejecuta en postgres, no dentro de la BD)
-- CREATE DATABASE cajas_autopago;

-- Luego conectarse:
-- \c cajas_autopago

-- 2. Esquema de catálogos
CREATE SCHEMA IF NOT EXISTS cat;

-- ============================
-- C A T Á L O G O S
-- ============================

-- Categorías
CREATE TABLE IF NOT EXISTS cat.categorias (
    categoria_id SERIAL PRIMARY KEY,
    nombre       VARCHAR(70)  NOT NULL,
    descripcion  VARCHAR(100) NOT NULL
);

-- Proveedores
CREATE TABLE IF NOT EXISTS cat.proveedores (
    proveedor_id SERIAL PRIMARY KEY,
    nombre       VARCHAR(50)  NOT NULL,
    director     VARCHAR(150) NOT NULL,
    telefono     VARCHAR(10)  NOT NULL,
    correo       VARCHAR(50)  NOT NULL
);

-- Tipos de descuento
CREATE TABLE IF NOT EXISTS cat.tipos_descuento (
    tipo_descuento_id SERIAL PRIMARY KEY,
    nombre            VARCHAR(70)  NOT NULL,
    descripcion       VARCHAR(150) NOT NULL,
    tipo_valor        VARCHAR(20)  NOT NULL  -- 'PORCENTAJE' o 'MONTO_FIJO', etc.
);

-- Tipos de cupón
CREATE TABLE IF NOT EXISTS cat.tipos_cupon (
    tipo_cupon_id SERIAL PRIMARY KEY,
    nombre        VARCHAR(70)  NOT NULL,
    descripcion   VARCHAR(150) NOT NULL,
    tipo_valor    VARCHAR(20)  NOT NULL
);

-- Tipos de alerta
CREATE TABLE IF NOT EXISTS cat.tipos_alerta (
    tipo_alerta_id SERIAL PRIMARY KEY,
    nombre         VARCHAR(70)  NOT NULL,
    descripcion    VARCHAR(250) NOT NULL
);

-- ============================
-- T A B L A S   P R I N C I P A L E S
-- ============================

-- Descuentos
CREATE TABLE IF NOT EXISTS descuentos (
    descuento_id      SERIAL PRIMARY KEY,
    tipo_descuento_id INT           NOT NULL,
    monto             NUMERIC(10,2) NOT NULL,
    fecha_inicio      TIMESTAMP     NOT NULL,
    fecha_fin         TIMESTAMP     NOT NULL,
    CONSTRAINT fk_descuentos_tipo_descuento
        FOREIGN KEY (tipo_descuento_id)
        REFERENCES cat.tipos_descuento (tipo_descuento_id)
);

-- Productos
CREATE TABLE IF NOT EXISTS productos (
    producto_id    SERIAL PRIMARY KEY,
    categoria_id   INT           NOT NULL,
    proveedor_id   INT           NOT NULL,
    descuento_id   INT,  -- puede no tener descuento
    nombre         VARCHAR(50)   NOT NULL,
    cantidad       VARCHAR(15)   NOT NULL,
    codigo         VARCHAR(20)   NOT NULL,
    precio         NUMERIC(10,2) NOT NULL,
    fecha_caducidad DATE,
    stock          INT           NOT NULL,
    activo         BOOLEAN       NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_productos_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES cat.categorias (categoria_id),
    CONSTRAINT fk_productos_proveedor
        FOREIGN KEY (proveedor_id)
        REFERENCES cat.proveedores (proveedor_id),
    CONSTRAINT fk_productos_descuento
        FOREIGN KEY (descuento_id)
        REFERENCES descuentos (descuento_id)
);

-- Cupones
CREATE TABLE IF NOT EXISTS cupones (
    cupon_id       SERIAL PRIMARY KEY,
    tipo_cupon_id  INT           NOT NULL,
    monto          NUMERIC(10,2) NOT NULL,
    fecha_inicio   TIMESTAMP     NOT NULL,
    fecha_fin      TIMESTAMP     NOT NULL,
    CONSTRAINT fk_cupones_tipo_cupon
        FOREIGN KEY (tipo_cupon_id)
        REFERENCES cat.tipos_cupon (tipo_cupon_id)
);

-- Formas de pago
CREATE TABLE IF NOT EXISTS formas_pago (
    forma_pago_id SERIAL PRIMARY KEY,
    nombre        VARCHAR(50) NOT NULL,
    activo        BOOLEAN     NOT NULL DEFAULT TRUE
);

-- Encargados
CREATE TABLE IF NOT EXISTS encargados (
    encargado_id  SERIAL PRIMARY KEY,
    nombre        VARCHAR(30) NOT NULL,
    ape_pat       VARCHAR(40) NOT NULL,
    ape_mat       VARCHAR(50) NOT NULL,
    clave         VARCHAR(15) NOT NULL,
    rol           VARCHAR(50) NOT NULL,
    correo        VARCHAR(50) NOT NULL,
    contrasena    VARCHAR(100) NOT NULL  -- aquí luego guardas hash, no texto plano
);

-- Cajas de autocobro
CREATE TABLE IF NOT EXISTS cajas_autocobro (
    caja_autocobro_id SERIAL PRIMARY KEY,
    nombre            VARCHAR(30) NOT NULL,
    ubicacion         VARCHAR(50) NOT NULL,
    estado            VARCHAR(20) NOT NULL
);

-- Tickets
CREATE TABLE IF NOT EXISTS tickets (
    ticket_id        SERIAL PRIMARY KEY,
    cupon_id         INT,
    forma_pago_id    INT           NOT NULL,
    caja_autocobro_id INT          NOT NULL,
    encargado_id     INT           NOT NULL,
    fecha            TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total            NUMERIC(10,2) NOT NULL,
    impuesto_total   NUMERIC(10,2) NOT NULL,
    codigo           VARCHAR(20)   NOT NULL,
    estado           VARCHAR(20)   NOT NULL,
    CONSTRAINT fk_tickets_cupon
        FOREIGN KEY (cupon_id)
        REFERENCES cupones (cupon_id),
    CONSTRAINT fk_tickets_forma_pago
        FOREIGN KEY (forma_pago_id)
        REFERENCES formas_pago (forma_pago_id),
    CONSTRAINT fk_tickets_caja_autocobro
        FOREIGN KEY (caja_autocobro_id)
        REFERENCES cajas_autocobro (caja_autocobro_id),
    CONSTRAINT fk_tickets_encargado
        FOREIGN KEY (encargado_id)
        REFERENCES encargados (encargado_id)
);

-- Detalle / histórico de tickets
CREATE TABLE IF NOT EXISTS historico_tickets (
    historico_id  SERIAL PRIMARY KEY,
    ticket_id     INT           NOT NULL,
    producto_id   INT           NOT NULL,
    cantidad      INT           NOT NULL,
    precio_unitario NUMERIC(10,2) NOT NULL,
    subtotal      NUMERIC(10,2) NOT NULL,
    CONSTRAINT fk_historico_ticket
        FOREIGN KEY (ticket_id)
        REFERENCES tickets (ticket_id),
    CONSTRAINT fk_historico_producto
        FOREIGN KEY (producto_id)
        REFERENCES productos (producto_id)
);

-- Alertas de cajas
CREATE TABLE IF NOT EXISTS alertas_caja (
    alerta_caja_id   SERIAL PRIMARY KEY,
    caja_autocobro_id INT          NOT NULL,
    tipo_alerta_id   INT           NOT NULL,
    encargado_id     INT           NOT NULL,
    fecha_falla      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_solucion   TIMESTAMP,
    CONSTRAINT fk_alertas_caja_caja
        FOREIGN KEY (caja_autocobro_id)
        REFERENCES cajas_autocobro (caja_autocobro_id),
    CONSTRAINT fk_alertas_caja_tipo_alerta
        FOREIGN KEY (tipo_alerta_id)
        REFERENCES cat.tipos_alerta (tipo_alerta_id),
    CONSTRAINT fk_alertas_caja_encargado
        FOREIGN KEY (encargado_id)
        REFERENCES encargados (encargado_id)
);