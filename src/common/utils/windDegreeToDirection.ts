export function windDegreeToDirection(degree: number): string {
    const directions = ['Север', 'Североизток', 'Изток', 'Югоизток', 'Юг', 'Югозапад', 'Запад', 'Северозапад']
    const degrees = Math.round(degree * 8 / 360)
    const isValidDirection = (degrees + 8) % 8
    if(!isValidDirection) return 'Invalid direction'

    return directions[degrees]
}