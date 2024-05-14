document.addEventListener('DOMContentLoaded', () => {

    const varUri = window.location.search;
    const valor = new URLSearchParams(varUri);
    const creador = valor.get("creador").replace(/^'|'$/g, '');
    console.log(creador);

    const $ = selector => document.querySelector(selector);

    const $preguntaTitulo = $("#ph");
    const $nombreCompleto = $('#nomCompleto');
    const $emoji = $('#emoji');
    const $presentacion = $('#presentacion');
    const $ingenieria = $('#ing');

    fetch("../json/info.json")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(creador);
            let c;
            if (creador == 'd') {
                console.log("Si")
                c = data.creadores[0];
                console.log(c)
            } else if(creador == 'f'){
                console.log("Si")
                c = data.creadores[1];
                console.log(c)
            }
            console.log(JSON.stringify(c.Nombres));
            let inicio = new Date( JSON.stringify(c.info.SemestreInicio).replace(/^"|"$/g, '').split("-") );
            $preguntaTitulo.innerHTML += JSON.stringify(c.Nombres).replace(/^"|"$/g, '') + "?";
            $nombreCompleto.innerHTML += JSON.stringify(c.Nombres + " " + c.Apellidos).replace(/^"|"$/g, '');
            $emoji.innerHTML += JSON.stringify(c.info.emojis);
            $presentacion.innerHTML += JSON.stringify(c.info.Presentacion)
            $ingenieria.innerHTML += JSON.stringify(c.info.Ingenieria).replace(/^"|"$/g, '') + " en " + calcularSemestres(inicio) + "° Semestre";
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function calcularSemestres(fechaEspecifica) {
    const fechaActual = new Date();
    const mesesDiferencia = (fechaActual.getFullYear() - fechaEspecifica.getFullYear()) * 12 + fechaActual.getMonth() - fechaEspecifica.getMonth();
    console.log(mesesDiferencia / 6);
    return Math.round(mesesDiferencia / 6);
}