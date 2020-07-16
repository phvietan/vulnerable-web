This folder contains deserialize bug that can leads to RCE in Python.

List of affected libraries:

## Pickle

Explanation: the pickle-attacker form a malicious object byte (which is a class with __reduce__ function) then pass it to the server. The pickle-server only loads the object, but got shell code running "ls -la".