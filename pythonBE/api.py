import requests
import json


class Api:
    def __init__(self, *args):
        super(Api, self).__init__(*args)

    @staticmethod
    def get_geo_location(ip_address):
        # URL to send the request to
        request_url = 'https://geolocation-db.com/jsonp/' + ip_address
        # Send request and decode the result
        response = requests.get(request_url)
        result = response.content.decode()
        # Clean the returned string so it just contains the dictionary data for the IP address
        result = result.split("(")[1].strip(")")
        # Convert this data into a dictionary
        result = json.loads(result)
        print(result)
        return result

    def get_data():
        url = 'https://api.exchangerate.host/latest'
        response = requests.get(url)
        data = response.json()
        return data
