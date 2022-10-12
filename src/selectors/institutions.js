export const getInstitutions = state => {
    if (state.auth.user !== null && state.auth.user[0] !== undefined) {
        return state.auth.user[0].entidad_entidad[0];
    }

    return state.auth.user
};

export const getmt = state => {
    if (state.auth.user !== null && state.auth.user[0] !== undefined && state.auth.user[0].entidad_entidad && state.auth.user[0].entidad_entidad[0] !== undefined) {
        return state.auth.user[0].entidad_entidad[0].mt;
    } else if (state.auth.user !== null && state.auth.user[0] !== undefined && state.auth.user[0].mt) {
        return state.auth.user[0].mt;
    }

    return 'Mentor-es'
};

export const getet = state => {
    if (state.auth.user !== null && state.auth.user[0] !== undefined && state.auth.user[0].entidad_entidad && state.auth.user[0].entidad_entidad[0] !== undefined) {
        return state.auth.user[0].entidad_entidad[0].et;
    } else if (state.auth.user !== null && state.auth.user[0] !== undefined && state.auth.user[0].et) {
        return state.auth.user[0].et;
    }

    return 'Emprendedor-es'
};

export const getUserData = state => {
    if (state.auth.user !== null) {
        return state.auth.user[0];
    }

    return state.auth.user
};

export const getId = state => {
    if (state.auth.user !== null && state.auth.user[0] !== undefined) {
        return state.auth.user[0].id;
    }

    return state.auth.user
};

export const gitIdInstitution = state => {
    if (state.auth.user !== null && state.auth.user[0] !== undefined
        && state.auth.user[0].entidad_entidad !== undefined && state.auth.user[0].entidad_entidad[0] !== undefined) {
        return state.auth.user[0].entidad_entidad[0].id;
    }

    return state.auth.user
};

export const getUsername = state => {
    if (state.auth.user !== null && state.auth.user[0] !== undefined) {
        return state.auth.user[0].username;
    }

    return state.auth.user
};


export const getIdInstitution = state => {
    if (state.auth.user !== null && state.auth.user[0].entidad_entidad && state.auth.user[0].entidad_entidad[0] !== undefined) {
        return state.auth.user[0].entidad_entidad[0].id;
    }

    return state.auth.user
};


export const getStatusEntidad = state => {
    if (state.auth.user !== null && state.auth.user[0] !== null && state.auth.user[0] !== undefined && state.auth.user[0].entidad_entidad && state.auth.user[0].entidad_entidad.length !== 0) {
        return 1;
    } else {
        return 0
    }

    return state.auth.user
};
