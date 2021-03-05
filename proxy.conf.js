const PROXY_CONFIG = [
  {
    context: [
      "/api/ws",
    ],
    target: "ws://localhost:8080",
    pathRewrite: {
      '^/api/': '/api/'
    },
    ws: true,
    changeOrigin: true,
    secure: false
  },
  {
    context: [
      "/websockify",
    ],
    target: "ws://localhost:8080",
    pathRewrite: {
      '^/websockify/': '/websockify/'
    },
    ws: true,
    changeOrigin: true,
    secure: false
  },
  {
    context: [
      "/api/",
    ],
    target: "http://localhost:8080",
    pathRewrite: {
      '^/api/': '/api/'
    },
    changeOrigin: true,
    secure: false
  }
]

module.exports = PROXY_CONFIG
