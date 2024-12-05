from flask import Flask, jsonify
import socket

app = Flask(__name__)

@app.route('/discover-backend')
def discover_backend():
    server_ip = socket.gethostbyname(socket.gethostname())  # Get the current server IP
    return jsonify({"ip": server_ip, "port": 5000})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
