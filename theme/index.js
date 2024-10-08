import { useColorScheme } from "react-native";

export const theme = {
    common: {
        backgroundAccent: '#eab308',
        textAccent: "#eab308"
    },
    dark: {
        bgColorTheme: 'rgba(38,38,38,1)',
        textColorTheme: 'white',
        shadowColor: 'rgb(38,38,38,1)',
    },
    light: {
        bgColorTheme: 'rgba(215,212,212,1)',
        textColorTheme: 'black',
        shadowColor: 'rgb(143,143,143)',
    }
};

// Функция для получения стилей на основе текущей темы
export const getStyles = (colorScheme) => ({
    textAccent: { color: theme.common.textAccent },  // Одинаковый для обеих тем
    backgroundAccent: { backgroundColor: theme.common.backgroundAccent },  // Одинаковый для обеих тем
    bgColorTheme: { backgroundColor: colorScheme === 'dark' ? theme.dark.bgColorTheme : theme.light.bgColorTheme },  // Меняется в зависимости от темы
    textColorTheme: { color: colorScheme === 'dark' ? theme.dark.textColorTheme : theme.light.textColorTheme },  // Меняется в зависимости от темы
    shadowColor: { color: colorScheme === 'dark' ? theme.dark.shadowColor : theme.light.shadowColor },  // Меняется в зависимости от темы
});

// export const theme = {
//
//     background: '#eab308',
//     text: "#eab308",
//     bgColor:'rgba(38,38,38,1)'
// }
//
// export const styles = {
//     text: {color: theme.text},
//     background: {backgroundColor: theme.background}
// }