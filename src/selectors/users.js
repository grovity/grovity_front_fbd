export const getUsers = state => {
    if (state.auth.user !== null) {
        return state.auth.user[0].entidad_entidad[0].emprendedor
    }

    return null
};

export const selectMentorsEntidad = state => {
   if(state.mentors_entidad){
       return state.mentors_entidad
   }


    return []
};

export const selectUser = state => {
    if (state.user !== null && state.user !== undefined ) {
        return state.user[0]
    }

    return null
};

export const getIdUser = state => {
    if (state.user !== null && state.user !== undefined && state.user[0] !== undefined ) {
        return state.user[0].id
    }

    return null
};

export const selectIdEmpresa = state => {
    if (state.auth.user !== null && state.auth.user !== undefined && state.auth.user[0] !== undefined ) {
        return state.auth.user[0].empresa
    }

    return null
};

export const selectIdEmpresaEquipo = state => {
    if (state.auth.user !== null && state.auth.user !== undefined && state.auth.user[0] !== undefined ) {
        return state.auth.user[0].equipo
    }

    return null
};

export const selectIdEmpresa_desdeOtroPerfil = state => {
    if (state.user !== null && state.user[0] !== undefined ) {
        return state.user[0].empresa
    }

    return null
};


export const getIdCompany= state => {
    if (state.user !== null && state.user[0] !== undefined ) {
        return state.user[0].empresa
    }

    return null
};


export const getStatusUser = state => {
    if (state.auth.user !== null) {
        return state.auth.user[0].entidad_entidad
    }

    return []
};




export const getStatusMentor = state => {
    if (state.auth.user !== null && state.auth.user !== undefined) {
        return state.auth.user[0].mentor
    }

    return []
};

export const getStatusBot = state => {
    if (state.auth.user !== null && state.auth.user !== undefined) {
        if(state.auth.user[0].mentor) {
            return true
        }

    }

    return false
};

export const getStatusEmpresa = state => {
    if (state.auth.user !== null && state.auth.user !== undefined) {
        return state.auth.user[0].empresa
    }

    return false
};

export const getStatusEmpresaEquipo = state => {
    if (state.auth.user !== null && state.auth.user !== undefined) {
        return state.auth.user[0].equipo
    }

    return false
};

export const getStatusEmpresa_desdeOtroPerfil = state => {
    if (state.user !== null && state.user[0] !== undefined && state.user[0].empresa) {
        return state.user[0].empresa
    }

    return null
};

export const getEquipo = state => {
    if (state.auth.user !== null && state.auth.user !== undefined) {
        return state.auth.user[0].equipo
    }

    return false
};

export const getStatusEmpresa_desdementor = state => {
    if (state.empresa_emprendedor !== null && state.empresa_emprendedor !== undefined && state.empresa_emprendedor.length !== 0) {
        return true
    }

    return false
};

export const getIndicadoresEmpresa = state => {
    if (state.empresa_emprendedor_desde_mentor !== null && state.empresa_emprendedor_desde_mentor !== undefined) {
        return state.empresa_emprendedor_desde_mentor
    }

    return []
};


export const getUserId = state => {
    if (state.auth.user !== null) {
        return state.auth.user[0].id
    }

    return []
};


export const getCurrentUser = state => state.users;
export const selectCurrentUser = state => {
    if(state.auth && state.auth.user && state.auth.user[0]) {
        return state.auth.user[0]
    }
}

export const getEmprendedores = json => {

    if (json !== null && json !== undefined && json.emprendedor != undefined) {

        const res =
            json.emprendedor.map(c => (
                    {
                        value: c.id,
                        text: `1${c.email} + ${c.first_name} + ${c.last_name}`
                    }
                )
            )
        return res
    }
    return json
}

export const getFuncionarios = json => {
    if (json !== null && json !== undefined && json.funcionario !== undefined) {
        const res =
            json.funcionario.map(c => (
                    {
                        value: c.id,
                        text: `1${c.email} + ${c.first_name} + ${c.last_name}`
                    }
                )
            )
        return res
    }
    return json
}

export const selectEmpresa = state => {
    if (state.empresa_emprendedor !== null && state.empresa_emprendedor.detail !== "No encontrado.") {
        return state.empresa_emprendedor
    }

    return null
};

export const selectEmpresaInfo = state => {
    if (state.empresa_emprendedor_info !== null && state.empresa_emprendedor_info !== "No encontrado.") {
        return state.empresa_emprendedor_info
    }

    return null
};

export const selectEmpresa_indicadores = state => {
    if (state.empresa_emprendedor !== null && state.empresa_emprendedor.indicadores !== undefined) {
        return state.empresa_emprendedor.indicadores
    }

    return null
};