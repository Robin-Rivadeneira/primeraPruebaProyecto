FirmadorApk/
├── assets/                       # Carpeta de recursos (imágenes, estilos, etc.)
│   ├── css/                      # Estilos CSS
│   └── img/                      # Imágenes y SVGs
│
├── src/                          # Carpeta principal del código fuente
│   ├── services/                 # Carpeta de servicios (lógica de negocio)
│   │   ├── amigos.Service.js     # Datos de amigos
│   │   ├── beneficios.Service.js # Datos de beneficios
│   │   ├── beneficiosFiltro.Service.js # Datos de beneficios filtrados por ciudad
│   │   ├── carusel.Service.js    # Datos del carrusel
│   │   ├── miIdentidadConfig.Service.js # Lógica de verificación biométrica
│   │   ├── perfil.Service.js     # Lógica de perfil (dirección, datos iniciales)
│   │   └── registro.Service.js   # Lógica de registro (carga de imagen, captura de foto)
│   │
│   ├── screens/                  # Carpeta de vistas (componentes visuales)
│   │   ├── amigos.js             # Vista de la lista de amigos
│   │   ├── beneficiosFiltro.js   # Vista de beneficios filtrados por ciudad
│   │   ├── carusel.js            # Vista del carrusel
│   │   ├── miIdentidad.js        # Vista de verificación biométrica
│   │   ├── perfil.js             # Vista del perfil del usuario
│   │   └── registro.js           # Vista de registro biométrico
│
├── App.js                        # Archivo principal de la aplicación
├── App.json                      # Configuración de la aplicación (nombre, ícono, etc.)
├── eas.json                      # Configuración de construcción (Expo Application Services)
├── index.js                      # Archivo principal del inicio de la aplicación
├── metro.config.js               # Configuración de Metro Bundler (manejo de imágenes, etc.)
│
├── .gitignore                    # Archivo para ignorar archivos en Git
├── package.json                  # Dependencias y scripts del proyecto
└── README.md                     # Documentación del proyecto