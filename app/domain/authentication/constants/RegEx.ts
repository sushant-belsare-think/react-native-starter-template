export const RegEx = {
    PASSWORD_NUMBER_SYMBOL: new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&])'),
    // PASSWORD_NUMBER_SYMBOL: /[0-9-()]*[1-9][0-9-()]*/,
    PASSWORD_LOWERCASE_UPPERCASE: new RegExp('^(?=.*[a-z])(?=.*[A-Z])'),
    PASSWORD_LENGTH: new RegExp('^(?=.{8,})'),
    // NAME: new RegExp("^[a-zA-Z]+$"),
    NAME: new RegExp("^[a-zA-Z_ ]*$"),
    // EMAIL: new RegExp('^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'),
    EMAIL: /^\w+([\.-]?\w+)([\.+]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    // EMAIL:new RegExp("[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@thepayee\.ai?"),
}
