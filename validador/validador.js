exports.esUser = (data) => {
    validadorUser = {
        name: ['Es un campo requerido'],
        username: ['Es un campo requerido'],
        email: ['Es un campo requerido',],
        phone: ['Es un campo requerido'],
        website: ['Es un campo requerido'],
    };
    if (data.hasOwnProperty('name')) {
        if (data.name.length < 10 || data.name.length > 50) {
            validadorUser.name.push('El campo name debe tener entre 10 y 50 caracteres');
        } else {
            delete validadorUser.name;
        }
    }
    if (data.hasOwnProperty('username')) {
        if (data.username.length < 10 || data.username.length > 50) {
            validadorUser.username.push('El campo name debe tener entre 10 y 50 caracteres');
        } else {
            delete validadorUser.username;
        }
    }
    if (data.hasOwnProperty('email')) {
        const re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        if (!re.test(data.email)) {
            validadorUser.email.push('El email debe tener un formato valido');
        } else {
            const emailPart = data.email.split('@');
            const emailLastPart = emailPart[emailPart.length - 1].split('.');
            if (emailLastPart[emailLastPart.length - 1] != 'cl' &&
                emailLastPart[emailLastPart.length - 1] != 'com') {
                validadorUser.email.push('El email debe terminar con ".com" o ".cl"');
            } else {
                delete validadorUser.email;
            }
        }
    }
    if (data.hasOwnProperty('phone')) {
        const re = /[0-9+-]/igm;
        if (!re.test(data.phone)) {
            validadorUser.phone.push('No se admiten letras, solo digitos y "-"');
        } else {
            if (data.phone.length < 10 || data.phone.length > 30) {
                validadorUser.phone.push('Debe tener un largo entre 10 y 30 caracteres');
            } else {
                delete validadorUser.phone;
            }
        }
    }
    if (data.hasOwnProperty('website')) {
        delete validadorUser.website;
    }
    return validadorUser;
}