export default (context, inject) => {
    const capitalize = function (string) {
        if (!string)
            return 'caricamento...'
        else
            return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1)
    }
    inject('capitalize', capitalize)
}
