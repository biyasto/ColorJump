export const ColorMap = new Map([
    [0, ["#ff8ac7","pink",]],
    [1, ["#30acff","blue",]],
    [2, ["#802bff","purple",]],
    [3, ["#FFEB00","yellow",]],
    [4, ["#35ff2e","green",]],
])


 export function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
}

export function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

