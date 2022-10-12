export let temas = [
    {
        id: 1,
        tipo: "Iniciar una idea de negocio"
    }, {
        id: 2,
        tipo: "Tomar Decisiones estratégicas"
    },
    {
        id: 3,
        tipo: "Mejorar mi método de trabajo"
    },
    {
        id: 4,
        tipo: "Encontrar otras fuentes de ingreso"
    },
    {
        id: 5,
        tipo: "Desarrollar mi estrategia de marca"
    },
    {
        id: 6,
        tipo: "Desarrollar mis habilidades personales"
    },
    {
        id: 7,
        tipo: "Potenciar mi presencia en internet"
    },
    {
        id: 8,
        tipo: "Validar productos o servicios nuevos"
    },
    {
        id: 9,
        tipo: "Implementar indicadores de gestión"
    },
    {
        id: 10,
        tipo: "Mejorar la productividad de mi equipo de trabajo"
    },
    {
        id: 11,
        tipo: "Adoptar nuevas prácticas de gobierno corporativo"
    },
    {
        id: 12,
        tipo: "Escalar mi empresa/producto"
    },
    {
        id: 13,
        tipo: "Internacionalizar mi empresa"
    },
    {
        id: 14,
        tipo: "Desarrollar mis habilidades financieras"
    },
    {
        id: 15,
        tipo: "Encontrar nuevos canales de distribución"
    },
    {
        id: 16,
        tipo: "Alistarme para enontrar inversionistas"
    },
    {
        id: 17,
        tipo: "Proteger mi propiedad intelectual"
    },
    {
        id: 18,
        tipo: "Implementar nuevas tecnologías"
    },
    {
        id: 19,
        tipo: "Ampliar mis redes de contacto o crear alianzas estratégicas"
    },
    {
        id: 20,
        tipo: "Reducir mis costos operativos"
    },
    {
        id: 21,
        tipo: "Mejorar o automatizar mis procesos"
    },
    {
        id: 22,
        tipo: "Mejorar mi estrategia de clientes"
    },
    {
        id: 23,
        tipo: "Incrementar mis ventas"
    },
    {
        id: 24,
        tipo: "Ventas rápidas"
    },
    {
        id: 25,
        tipo: "Eficiencia del gasto"
    },
    {
        id: 26,
        tipo: "Tendencias Post-Covid"
    },
    {
        id: 27,
        tipo: "Mentoría grupal"
    },
    {
        id: 28,
        tipo: "Mentoría individual"
    },
    {
        id: 29,
        tipo: "Fase - Diagnóstico"
    },
    {
        id: 30,
        tipo: "Fase - Alistamiento"
    },
    {
        id: 31,
        tipo: "Fase - Fortalecimiento "
    },
    {
        id: 32,
        tipo: "Fase - Desarrollo Comercial"
    },
    {
        id: 33,
        tipo: "Fase - Seguimiento "
    },
    {
        id: 34,
        tipo: "Fase - Asesorías de cumplimiento de requisitos"
    },
    {
        id: 35,
        tipo: "Fase - Misión Internacional"
    },
    {
        id: 36,
        tipo: "Alineación con empresas"
    },
    {
        id: 37,
        tipo: "Estrategia y Propósito Superior"
    },
    {
        id: 38,
        tipo: "Desarrollo e Inteligencia de Mercados"
    },
    {
        id: 39,
        tipo: "Marketing y Clientes"
    },
    {
        id: 40,
        tipo: "Estrategia de Crecimiento y Métricas"
    },
    {
        id: 41,
        tipo: "Estrategia de Innovación"
    },
    {
        id: 42,
        tipo: "Compromiso y Liderazgo"
    },
    {
        id: 43,
        tipo: "Gestión de Portafolio de Innovación"
    },
    {
        id: 44,
        tipo: "Ecosistema de Innovación"
    },
    {
        id: 45,
        tipo: "Valor Agregado"
    },
    {
        id: 46,
        tipo: "Consultoría"
    },
    {
        id: 47,
        tipo: "Consultoría 1:1"
    },
];

function compare(a, b) {
    if (a.tipo < b.tipo) {
        return -1;
    }
    if (a.tipo > b.tipo) {
        return 1;
    }
    return 0;
}

temas  = temas.sort(compare);