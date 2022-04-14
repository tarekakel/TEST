
from flask import Flask, session
from flask import jsonify
from flask import request
from api import Api
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from threading import Lock
import requests


async_mode = None

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, async_mode=async_mode, cors_allowed_origins="*")


@app.route('/get-geo-location', methods=['GET'])
def get_geo_loc():
    ip = request.args.get('ip', default='', type=str)
    return Api.get_geo_location(ip)


thread = None
thread_lock = Lock()


def background_thread():
    """Example of how to send server generated events to clients."""
    count = 0
    while True:
        socketio.sleep(3)
        socketio. emit('my_response',
                       {'data': Api.get_data()['rates']})


@app.route('/get-data', methods=['GET'])
def get_data():
    return Api.get_data()


@socketio.event
def my_event(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': Api.get_data()})


@ socketio.event
def connect():
    global thread
    with thread_lock:
        # if thread is None:
        thread = socketio.start_background_task(background_thread)
       # emit('my_response', {'data': 'Connected', 'count': 0})
    print('socketIO Work!!!')


print('socketIO Work')

if __name__ == "__main__":
    # app.run(debug=True)
    socketio.run(app)
