import http.server
import socketserver

PORT = 8001
IP = "127.0.0.1"
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer((IP, PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
