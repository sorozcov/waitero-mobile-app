import clamp from 'lodash/clamp'

export const PickRandom = array => {
    return array[Math.floor(Math.random() * array.length)];
} 

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
}

export const getColorByValue = (value) => {
    const colors = [
        '#ff65a3',
        '#7afcff',
        '#fff740'
    ]
    return colors[clamp(value, 0, colors.length-1)]
}