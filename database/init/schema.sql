-- ============================
-- T A B L A S  B Á S I C A S
-- ============================

CREATE TABLE categorias (
    categoria_id SERIAL PRIMARY KEY,
    nombre       VARCHAR(70)  NOT NULL,
    descripcion  VARCHAR(100)
);

CREATE TABLE productos (
    producto_id    SERIAL PRIMARY KEY,
    categoria_id   INT NOT NULL REFERENCES categorias(categoria_id) ON DELETE CASCADE,
    nombre         VARCHAR(50)   NOT NULL,
    cantidad       VARCHAR(15)   NOT NULL,
    codigo         VARCHAR(20)   NOT NULL,
    precio         NUMERIC(10,2) NOT NULL,
    fecha_caducidad DATE,
    stock          INT NOT NULL,
    activo         BOOLEAN NOT NULL DEFAULT TRUE
);

-- ============================
-- D E S C U E N T O S / O F E R T A S
-- ============================

CREATE TABLE descuentos (
    descuento_id    SERIAL PRIMARY KEY,
    producto_id     INT NOT NULL REFERENCES productos(producto_id) ON DELETE CASCADE,
    tipo            VARCHAR(20) NOT NULL,    -- 'PORCENTAJE' o 'MONTO'
    valor           NUMERIC(10,2) NOT NULL,  -- % o $
    fecha_inicio    TIMESTAMP NOT NULL,
    fecha_fin       TIMESTAMP NOT NULL
);

-- ============================
-- P E D I D O S  (TICKET)
-- ============================

CREATE TABLE pedidos (
    pedido_id       SERIAL PRIMARY KEY,
    fecha           TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    subtotal        NUMERIC(10,2) NOT NULL,
    descuento_total NUMERIC(10,2) NOT NULL DEFAULT 0,
    impuesto_total  NUMERIC(10,2) NOT NULL DEFAULT 0,
    total_final     NUMERIC(10,2) NOT NULL,
    estado          VARCHAR(20) NOT NULL       -- 'PENDIENTE', 'PAGADO'
);

-- Detalle del pedido
CREATE TABLE pedido_detalle (
    detalle_id       SERIAL PRIMARY KEY,
    pedido_id        INT NOT NULL REFERENCES pedidos(pedido_id) ON DELETE CASCADE,
    producto_id      INT NOT NULL REFERENCES productos(producto_id) ON DELETE CASCADE,
    cantidad         INT NOT NULL,
    precio_unitario  NUMERIC(10,2) NOT NULL,
    subtotal         NUMERIC(10,2) NOT NULL
);

-- ============================
-- F O R M A S  D E  P A G O
-- ============================

CREATE TABLE formas_pago (
    forma_pago_id SERIAL PRIMARY KEY,
    nombre        VARCHAR(40) NOT NULL  -- efectivo, tarjeta, QR, barras, monedero
);

INSERT INTO formas_pago (nombre) VALUES
('EFECTIVO'),
('TARJETA'),
('CODIGO_QR'),
('CODIGO_BARRAS'),
('MONEDERO');

-- Registro del pago
CREATE TABLE pagos (
    pago_id       SERIAL PRIMARY KEY,
    pedido_id     INT NOT NULL REFERENCES pedidos(pedido_id) ON DELETE CASCADE,
    forma_pago_id INT NOT NULL REFERENCES formas_pago(forma_pago_id) ON DELETE CASCADE,
    monto         NUMERIC(10,2) NOT NULL,
    recibido      NUMERIC(10,2),
    cambio        NUMERIC(10,2),
    referencia    VARCHAR(80),     -- opcional: folio de tarjeta, uid del QR, etc.
    fecha         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- F A C T U R A C I Ó N
-- ============================

CREATE TABLE facturacion (
    facturacion_id SERIAL PRIMARY KEY,
    pedido_id   INT NOT NULL REFERENCES pedidos(pedido_id) ON DELETE CASCADE,
    rfc         VARCHAR(13) NOT NULL,
    email       VARCHAR(80) NOT NULL,
    razon_social VARCHAR(120)
);
CREATE TABLE carrito (
    carrito_id SERIAL PRIMARY KEY,
    session_id VARCHAR(60) NOT NULL,
    producto_id INT NOT NULL REFERENCES productos(producto_id) ON DELETE CASCADE,
    cantidad INT NOT NULL DEFAULT 1,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE cajas_autopago (
    caja_id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    ubicacion VARCHAR(100), 
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVA'  -- ACTIVA, FALLA, MANTENIMIENTO
);
CREATE TABLE logs_eventos (
    log_id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,       -- SCAN, ERROR, INFO, WARN, PAGO, FACTURA
    mensaje TEXT NOT NULL,
    pedido_id INT REFERENCES pedidos(pedido_id) ON DELETE CASCADE,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE inventario (
    inventario_id SERIAL PRIMARY KEY,
    producto_id INT NOT NULL REFERENCES productos(producto_id) ON DELETE CASCADE,
    cantidad INT NOT NULL
);

CREATE INDEX idx_inventario_producto ON inventario(producto_id);

CREATE INDEX idx_producto_codigo ON productos(codigo);
CREATE INDEX idx_producto_nombre ON productos(nombre);
CREATE INDEX idx_carrito_session ON carrito(session_id);