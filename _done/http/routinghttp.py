import http.server
import socketserver

class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/formget.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

PORT = 8001
IP = "127.0.0.1"

# Create an object of the above class
Handler = MyHttpRequestHandler

with socketserver.TCPServer((IP, PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
