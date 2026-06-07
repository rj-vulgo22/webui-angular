import http.server, os, sys
from functools import partial

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        p = self.path.split('?')[0].lstrip('/')
        base = self.directory
        if p and os.path.exists(os.path.join(base, p)) and not os.path.isdir(os.path.join(base, p)):
            return super().do_GET()
        self.path = '/index.html'
        return super().do_GET()

port = int(sys.argv[1]) if len(sys.argv) > 1 else 4200
root = os.path.abspath(sys.argv[2]) if len(sys.argv) > 2 else os.getcwd()
handler = partial(SPAHandler, directory=root)
http.server.HTTPServer(('0.0.0.0', port), handler).serve_forever()
