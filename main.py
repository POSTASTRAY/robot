def Stand():
    pass
def Walk_in_Place():
    pass
def Croutch():
    pass
def Turn_R():
    pass
def Walk_F():
    pass
def Punch_R():
    pass
def Strafe_L():
    pass
def Walk_B():
    pass
def kick():
    pass

def on_received_string(receivedString):
    if receivedString == "Red":
        kick()
    elif receivedString == "Green":
        Croutch()
    elif receivedString == "Blue":
        Punch_L()
    elif receivedString == "Yellow":
        Punch_R()
    elif receivedString == "F":
        Walk_F()
    elif receivedString == "B":
        Walk_B()
    elif receivedString == "L":
        Strafe_L()
    elif receivedString == "R":
        Strafe_R()
    elif input.button_is_pressed(Button.A):
        Turn_L()
    elif input.button_is_pressed(Button.B):
        Turn_R()
    else:
        Stand()
radio.on_received_string(on_received_string)

def Punch_L():
    pass
def Strafe_R():
    pass
def Turn_L():
    pass
radio.set_group(1)
for index in range(17):
    Servo.servo(index, 0)