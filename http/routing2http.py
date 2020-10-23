import http.server
import socketserver
from urllib.parse import urlparse
from urllib.parse import parse_qs

def getFormPost():
    print("serving FormPost")
    with open('formpost.html', 'r') as file:
        data = file.read()
    return data

def getFormGet():
    print("serving FormGet")
    with open('formget.html', 'r') as file:
        data = file.read()
    return data

def getMainPage(query):
    print("serving MainPage, query: ", query)
    name = 'World'
    query_parts = parse_qs(query)
    if 'name' in query_parts:
        name = query_parts["name"][0]

    # Some custom HTML code, possibly generated by another function
    html = f"<html><head></head><body><h1>Hello {name}!</h1></body></html>"
    return html

class HttpRoutingRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Sending an '200 OK' response
        self.send_response(200)

        # Setting the header
        self.send_header("Content-type", "text/html")

        # Whenever using 'send_header', you also have to call 'end_headers'
        self.end_headers()

        # Extract page path
        url_parts = urlparse(self.path)
        query = url_parts.query
        print("url_parts: ", url_parts)

        # if "/" in url_parts :
        #     html = getMainPage(query)
        # elif "/formpost.html" in url_parts :
        if "/formpost.html" in url_parts :
            html = getFormPost()
        elif "/formget.html" in url_parts :
            html = getFormGet()
        elif "/favicon.ico" in url_parts :
            html = ""
        else :
            html = getMainPage(query)

        # Writing the HTML contents with UTF-8
        self.wfile.write(bytes(html, "utf8"))

        return

PORT = 8001
IP = "127.0.0.1"

# routes = [('/', getMainPage), ('/formget.html', getFormGet)]

# Create an object of the above class
Handler = HttpRoutingRequestHandler

with socketserver.TCPServer((IP, PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
