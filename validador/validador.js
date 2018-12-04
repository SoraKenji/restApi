const isEmail = (emailText) => {
    const re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    if (!re.test(emailText)) {
        return false;
    } else {
        return true;
    }
}

const isURL = (URLText) => {
    const re = /^((https):\/\/)/;
    if (!re.test(URLText)) {
        return false;
    } else {
        return true;
    }
}


exports.isEmail = isEmail;

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
        if (!isEmail(data.email)) {
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

exports.esPost = (data) => {
    validadorPost = {
        userid: ['Es un campo requerido'],
        title: ['Es un campo requerido'],
        body: ['Es un campo requerido',],
    };
    if (data.hasOwnProperty('userid')) {
        /*if (data.userid) {
            
        } else {
            delete validadorUser.name;
        }*/
        delete validadorPost.userid;
    }

    if (data.hasOwnProperty('title')) {
        if (data.title.length < 10 || data.title.length > 55) {

            validadorPost.title.push('El campo name debe tener entre 10 y 55 caracteres');
        } else {
            delete validadorPost.title;
        }
    }
    if (data.hasOwnProperty('body')) {
        if (data.body.length < 50 || data.body.length > 100) {
            validadorPost.body.push('El campo name debe tener entre 50 y 100 caracteres');
        } else {
            delete validadorPost.body;
        }
    }
    return validadorPost;
}

exports.esComment = (data) => {
    validadorComment = {
        postid: ['Es un campo requerido'],
        name: ['Es un campo requerido'],
        email: ['Es un campo requerido'],
        body: ['Es un campo requerido'],
    };
    if (data.hasOwnProperty('postid')) {
        delete validadorComment.postid;
    }
    if (data.hasOwnProperty('name')) {
        if (data.name.length < 10 || data.name.length > 55) {

            validadorComment.name.push('El campo name debe tener entre 10 y 55 caracteres');
        } else {
            delete validadorComment.name;
        }
    }
    if (data.hasOwnProperty('email')) {
        if (!isEmail(data.email)) {
            validadorComment.email.push('El email debe tener un formato valido');
        } else {
            const emailPart = data.email.split('@');
            const emailLastPart = emailPart[emailPart.length - 1].split('.');
            if (emailLastPart[emailLastPart.length - 1] != 'cl' &&
                emailLastPart[emailLastPart.length - 1] != 'com') {
                validadorComment.email.push('El email debe terminar con ".com" o ".cl"');
            } else {
                delete validadorComment.email;
            }
        }
    }
    if (data.hasOwnProperty('body')) {
        if (data.body.length < 50 || data.body.length > 100) {
            validadorComment.body.push('El campo name debe tener entre 50 y 100 caracteres');
        } else {
            delete validadorComment.body;
        }
    }
    return validadorComment;
}

exports.esAlbum = (data) => {
    validadorAlbum = {
        userid: ['Es un campo requerido'],
        title: ['Es un campo requerido']
    };
    if (data.hasOwnProperty('userid')) {
        delete validadorAlbum.userid;
    }
    if (data.hasOwnProperty('title')) {
        if (data.title.length < 10 || data.title.length > 50) {
            validadorAlbum.title.push('El campo title debe tener entre 10 y 50 caracteres');
        } else {
            delete validadorAlbum.title;
        }
    }
    return validadorAlbum;
}

exports.esAddress = (data) => {
    validatorAddress = {
        street: ['Es un campo requerido'],
        suite: ['Es un campo requerido'],
        city: ['Es un campo requerido'],
        zipcode: ['Es un campo requerido'],
        lat: ['Es un campo requerido'],
        lng: ['Es un campo requerido'],
    };
    if (data.hasOwnProperty('street')) {
        if (data.street.length < 10 || data.street.length > 50) {
            validatorAddress.street.push('El campo title debe tener entre 10 y 50 caracteres');
        } else {
            delete validatorAddress.street;
        }
    }
    if (data.hasOwnProperty('suite')) {
        if (data.title.length < 10 || data.title.length > 50) {
            validatorAddress.suite.push('El campo title debe tener entre 10 y 50 caracteres');
        } else {
            delete validatorAddress.suite;
        }
    }
    if (data.hasOwnProperty('city')) {
        if (data.city.length < 10 || data.city.length > 50) {
            validatorAddress.suite.push('El campo city debe tener entre 10 y 50 caracteres');
        } else {
            delete validatorAddress.suite;
        }
    }
    if (data.hasOwnProperty('zipcode')) {
        if (data.zipcode.length < 10 || data.zipcode.length > 50) {
            validatorAddress.zipcode.push('El campo zipcode debe tener entre 10 y 50 caracteres');
        } else {
            delete validatorAddress.zipcode;
        }
    }
    if (data.hasOwnProperty('lat')) {
        if (data.lat.length < 10 || data.lat.length > 50) {
            validatorAddress.lat.push('El campo lat debe tener entre 10 y 50 caracteres');
        } else {
            delete validatorAddress.lat;
        }
    }
    if (data.hasOwnProperty('lng')) {
        if (data.lng.length < 10 || data.lng.length > 50) {
            validatorAddress.lng.push('El campo lng debe tener entre 10 y 50 caracteres');
        } else {
            delete validatorAddress.lng;
        }
    }
    return validatorAddress;
}

exports.esPhoto = (data) => {
    validadorPhoto = {
        albumid: ['Es un campo requerido'],
        title: ['Es un campo requerido'],
        url: ['Es un campo requerido'],
        thumbnailurl: ['Es un campo requerido']
    };
    if (data.hasOwnProperty('albumid')) {
        delete validadorPhoto.albumid;
    }
    if (data.hasOwnProperty('title')) {
        if (data.title.length < 10 || data.title.length > 50) {
            validadorPhoto.title.push('El campo title debe tener entre 10 y 50 caracteres');
        } else {
            delete validadorPhoto.title;
        }
    }
    if (data.hasOwnProperty('url')) {
        if (!isURL(data.url)) {
            validadorPhoto.url.push('Las URL’s deben empezar con https://');
        } else {
            delete validadorPhoto.url;
        }
    }
    if (data.hasOwnProperty('thumbnailurl')) {
        if (data.thumbnailurl.length < 10 || data.thumbnailurl.length > 50) {
            validadorPhoto.thumbnailurl.push('El campo thumbnailurl debe tener entre 10 y 50 caracteres');
        } else {
            delete validadorPhoto.thumbnailurl;
        }
    }
    return validadorPhoto;
}

exports.esTODO = (data) => {
    validadorTODO = {
        userid: ['Es un campo requerido'],
        title: ['Es un campo requerido'],
        completed: ['Es un campo requerido']
    };
    if (data.hasOwnProperty('userid')) {
        delete validadorTODO.userid;
    }
    if (data.hasOwnProperty('title')) {
        if (data.title.length < 10 || data.title.length > 50) {
            validadorTODO.title.push('El campo title debe tener entre 10 y 50 caracteres');
        } else {
            delete validadorTODO.title;
        }
    }
    if (data.hasOwnProperty('completed')) {
        if (data.completed == 'true' || data.completed == 'false' || String(data.completed) == 'true' || String(data.completed) == 'false') {
            delete validadorTODO.completed;
        } else {
            validadorTODO.completed.push('Debe tener un valor true o false');
        }
    }
    return validadorTODO;
}
