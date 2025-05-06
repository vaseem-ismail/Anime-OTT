from flask import Flask
from flask_jwt_extended import JWTManager, create_access_token
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from services.service import login, register, store_watch_later, change_password

app = Flask(__name__)
CORS(app)

bcrypt = Bcrypt(app)


# User registration
@app.route('/register', methods=['POST'])
def Reg():
    return register()


@app.route('/login', methods=['POST'])
def Log():
    return login()


# Change password
@app.route('/change-password', methods=['POST'])
def ChangePassword():
    return change_password()


@app.route('/storeWatchLater', methods=['POST'])
def StoreWatchLater():
    return store_watch_later()




if __name__ == '__main__':
    app.run(debug=True)
