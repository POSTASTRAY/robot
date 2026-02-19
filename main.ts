// ================= 7. RECOVERY & BALANCE =================
function GetUp_Front () {
    recovering = true
    Servo.Servo(8, 0 + t8)
    Servo.Servo(11, 180 + t11)
    Servo.Servo(2, 150 + t2)
    Servo.Servo(6, 30 + t6)
    basic.pause(400)
    Servo.Servo(1, 40 + t1)
    Servo.Servo(5, 140 + t5)
    basic.pause(300)
    Stand()
    recovering = false
}
// ================= 4. CORE POSES =================
function Stand () {
    walkingF = false
    walkingB = false
    isCrouched = false
    basic.showIcon(IconNames.Square)
    // Left Leg
    Servo.Servo(0, 90 + t0)
    Servo.Servo(1, 88 + t1)
    Servo.Servo(2, 105 + t2)
    Servo.Servo(3, 105 + t3)
    // Right Leg
    Servo.Servo(4, 90 + t4)
    Servo.Servo(5, 90 + t5)
    Servo.Servo(6, 90 + t6)
    Servo.Servo(7, 90 + t7)
    // Arms
    Servo.Servo(8, 90 + t8)
    Servo.Servo(9, 90 + t9)
    Servo.Servo(10, 90 + t10)
    Servo.Servo(11, 90 + t11)
    Servo.Servo(12, 90 + t12)
    Servo.Servo(13, 90 + t13)
}
function Walk_B () {
    SUPPORT = 1
    Servo.Servo(4, 104 + t4)
    Servo.Servo(2, 118 + t2)
    Servo.Servo(0, 110 + t0)
    basic.pause(STEP)
    Servo.Servo(2, 105 + t2)
    Servo.Servo(0, 92 + t0)
    SUPPORT = 0
    Servo.Servo(4, 76 + t4)
    Servo.Servo(3, 118 + t3)
    Servo.Servo(1, 70 + t1)
    basic.pause(STEP)
    Servo.Servo(3, 105 + t3)
    Servo.Servo(1, 88 + t1)
}
function ReadIMU () {
    roll = input.acceleration(Dimension.X)
    pitch = input.acceleration(Dimension.Y)
}
// ================= 5. ADVANCED LOCOMOTION =================
function Walk_F () {
    SUPPORT = 1
    Servo.Servo(4, 104 + t4)
    Servo.Servo(5, 102 + t5)
    basic.pause(SHIFT)
    Servo.Servo(2, 118 + t2)
    Servo.Servo(0, 70 + t0)
    basic.pause(STEP)
    Servo.Servo(2, 105 + t2)
    Servo.Servo(0, 92 + t0)
    SUPPORT = 0
    Servo.Servo(4, 76 + t4)
    Servo.Servo(5, 78 + t5)
    basic.pause(SHIFT)
    Servo.Servo(3, 118 + t3)
    Servo.Servo(1, 110 + t1)
    basic.pause(STEP)
    Servo.Servo(3, 105 + t3)
    Servo.Servo(1, 88 + t1)
}
// ================= 6. COMBAT =================
function Punch_L () {
    basic.showIcon(IconNames.Angry)
    Servo.Servo(4, 110 + t4)
    Servo.Servo(1, 110 + t1)
    Servo.Servo(5, 70 + t5)
    Servo.Servo(8, 160 + t8)
    Servo.Servo(10, 150 + t10)
    basic.pause(100)
    Servo.Servo(10, 30 + t10)
    Servo.Servo(0, 100 + t0)
    basic.pause(180)
    Stand()
}
function Turn_R () {
    walkingF = false
    walkingB = false
    Servo.Servo(0, 70 + t0)
    basic.pause(80)
    Servo.Servo(1, 70 + t1)
    basic.pause(100)
    Stand()
}
function ComputeBalance () {
    if (Math.abs(roll) < DEAD) {
        rollCorr = 0
    } else {
        rollCorr = Math.max(-8, Math.min(8, roll * KpRoll))
    }
    if (Math.abs(pitch) < DEAD) {
        pitchCorr = 0
    } else {
        pitchCorr = Math.max(-6, Math.min(6, pitch * KpPitch))
    }
}
function Strafe_R () {
    // 1. Shift weight Left (Tilt torso left using both rolls)
    Servo.Servo(0, 105 + t0)
    Servo.Servo(4, 105 + t4)
    basic.pause(SHIFT)
    // 2. Lift Right leg and kick outward
    Servo.Servo(6, 50 + t6)
    Servo.Servo(7, 100 + t7)
    basic.pause(STEP)
    // 3. Plant and pull back to center
    Servo.Servo(6, 90 + t6)
    Servo.Servo(0, 90 + t0)
    Servo.Servo(4, 90 + t4)
    basic.pause(STEP)
    Stand()
}
function Kick_R () {
    // 1. Hard shift to Left foot
    Servo.Servo(0, 120 + t0)
    Servo.Servo(4, 120 + t4)
    basic.pause(250)
    // 2. Lift knee and snap Hip
    Servo.Servo(6, 140 + t6)
    Servo.Servo(7, 60 + t7)
    Servo.Servo(5, 40 + t5)
    basic.pause(300)
    Stand()
}
// ================= 8. RADIO CONTROL =================
radio.onReceivedString(function (cmd) {
    if (cmd == "F") {
        walkingF = true
        walkingB = false
    } else if (cmd == "B") {
        walkingB = true
        walkingF = false
    } else if (cmd == "S") {
        Stand()
    } else if (cmd == "L") {
        Turn_L()
    } else if (cmd == "R") {
        Turn_R()
    } else if (cmd == "SL") {
        Strafe_L()
    } else if (cmd == "SR") {
        Strafe_R()
    } else if (cmd == "Green") {
        Crouch()
    } else if (cmd == "Blue") {
        Punch_L()
    } else if (cmd == "Yellow") {
        Punch_R()
    } else if (cmd == "Red") {
        Kick_R()
    }
})
function GetUp_Back () {
    recovering = true
    Servo.Servo(8, 180 + t8)
    Servo.Servo(11, 0 + t11)
    Servo.Servo(1, 150 + t1)
    Servo.Servo(5, 30 + t5)
    basic.pause(400)
    Servo.Servo(2, 40 + t2)
    Servo.Servo(6, 140 + t6)
    basic.pause(300)
    Stand()
    recovering = false
}
function Turn_L () {
    walkingF = false
    walkingB = false
    Servo.Servo(4, 110 + t4)
    basic.pause(80)
    Servo.Servo(5, 110 + t5)
    basic.pause(100)
    Stand()
}
function ApplyBalance () {
    if (SUPPORT == 0) {
        Servo.Servo(4, Math.max(0, Math.min(180, 90 + t4 + rollCorr)))
        Servo.Servo(0, Math.max(0, Math.min(180, 92 + t0 - pitchCorr)))
    } else {
        Servo.Servo(5, Math.max(0, Math.min(180, 90 + t5 - rollCorr)))
        Servo.Servo(1, Math.max(0, Math.min(180, 88 + t1 - pitchCorr)))
    }
}
function Strafe_L () {
    // 1. Shift weight Right (Tilt torso right using both rolls)
    Servo.Servo(0, 75 + t0)
    Servo.Servo(4, 75 + t4)
    basic.pause(SHIFT)
    // 2. Lift Left leg and kick outward
    Servo.Servo(2, 130 + t2)
    Servo.Servo(3, 80 + t3)
    basic.pause(STEP)
    // 3. Plant and pull back to center
    Servo.Servo(2, 105 + t2)
    Servo.Servo(0, 90 + t0)
    Servo.Servo(4, 90 + t4)
    basic.pause(STEP)
    Stand()
}
function Punch_R () {
    basic.showIcon(IconNames.Angry)
    Servo.Servo(0, 70 + t0)
    Servo.Servo(1, 110 + t1)
    Servo.Servo(5, 70 + t5)
    Servo.Servo(11, 20 + t11)
    Servo.Servo(13, 30 + t13)
    basic.pause(100)
    Servo.Servo(13, 150 + t13)
    Servo.Servo(4, 80 + t4)
    basic.pause(180)
    Stand()
}
function CheckFall () {
    ReadIMU()
    if (Math.abs(pitch) > 750 && !(recovering)) {
        basic.showIcon(IconNames.No)
        recovering = true
        basic.pause(800)
        if (pitch > 0) {
            GetUp_Front()
        } else {
            GetUp_Back()
        }
    }
}
function Crouch () {
    isCrouched = true
    basic.showIcon(IconNames.Target)
    Servo.Servo(1, 130 + t1)
    Servo.Servo(2, 60 + t2)
    Servo.Servo(3, 140 + t3)
    Servo.Servo(5, 50 + t5)
    Servo.Servo(6, 120 + t6)
    Servo.Servo(7, 40 + t7)
}
let pitchCorr = 0
let rollCorr = 0
let pitch = 0
let roll = 0
let SUPPORT = 0
let isCrouched = false
let walkingB = false
let walkingF = false
let recovering = false
let t13 = 0
let t12 = 0
let t11 = 0
let t10 = 0
let t9 = 0
let t8 = 0
let t7 = 0
let t6 = 0
let t5 = 0
let t4 = 0
let t3 = 0
let t2 = 0
let t1 = 0
let t0 = 0
let KpPitch = 0
let KpRoll = 0
let DEAD = 0
let SHIFT = 0
let STEP = 0
// ================= 2. ON START (EDIT VALUES HERE) =================
radio.setGroup(61)
STEP = 130
SHIFT = 80
DEAD = 40
KpRoll = 0.018
KpPitch = 0.012
// TRIMS: Use these to straighten legs
t0 = 0
t1 = 0
t2 = 0
t3 = 0
t4 = 0
t5 = 0
t6 = 0
t7 = 0
t8 = 0
t9 = 0
t10 = 0
t11 = 0
t12 = 0
t13 = 0
Stand()
// ================= 3. THE MAIN LOOP =================
basic.forever(function () {
    if (!(recovering)) {
        if (walkingF) {
            Walk_F()
        } else if (walkingB) {
            Walk_B()
        }
        if (!(isCrouched) && (!(walkingF) && !(walkingB))) {
            ReadIMU()
            ComputeBalance()
            ApplyBalance()
        }
    }
    CheckFall()
    basic.pause(20)
})
