const weights = {
    200: "ExtraLight",
    300: "Light",
    400: "Regular",
    500: "Medium",
    600: "SemiBold",
    700: "Bold",
    800: "ExtraBold",
    900: "Black"
};

const useFont = (weight = 400) => {
    const w = weight in weights ? weights[weight] : weights[400];
    return `Nunito-${w}`;
};

export default useFont;