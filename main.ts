let echoTime = 0
let distance2 = 0
let distance = 0
function moveForward () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 100)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 100)
}
function stopMotors () {
    maqueen.motorStop(maqueen.Motors.M1)
    maqueen.motorStop(maqueen.Motors.M2)
}
// Fonction pour mesurer la distance avec le capteur
function measureDistance () {
    // Envoi du signal de déclenchement
    pins.digitalWritePin(DigitalPin.P1, 0)
    basic.pause(2)
    pins.digitalWritePin(DigitalPin.P1, 1)
    basic.pause(10)
    pins.digitalWritePin(DigitalPin.P1, 0)
    // Lecture du temps d'écho
    echoTime = pins.pulseIn(DigitalPin.P2, PulseValue.High)
    // Calcul de la distance
    return echoTime / 58
}
// Méthode qui retourne true si un obstacle est détecté
function isObstacleDetected () {
    distance2 = measureDistance()
    // Si la distance est inférieure à 10 cm, l'obstacle est détecté
    return distance2 < 10
}
basic.forever(function () {
    distance = measureDistance()
    // Afficher la distance mesurée sur l'écran LED
    basic.showNumber(distance)
    if (distance < 10) {
        basic.showIcon(IconNames.Sad)
        stopMotors()
    } else {
        basic.showIcon(IconNames.Happy)
        moveForward()
    }
})
// Vérification de l'obstacle
basic.forever(function () {
    distance = measureDistance()
    if (distance < 10) {
        // Si l'obstacle est à moins de 10 cm
        // Afficher l'icône "triste"
        basic.showIcon(IconNames.Sad)
        stopMotors()
    } else {
        // Afficher l'icône "heureuse"
        basic.showIcon(IconNames.Happy)
        moveForward()
    }
})
