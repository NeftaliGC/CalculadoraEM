document.addEventListener('DOMContentLoaded', () => {

    const $ = selector => document.querySelector(selector);
    const $rEqModulares = $('#rEqSistemForm')
    const $resolveZone = $('#res')
    let numEcuaciones = 3;


    
    $rEqModulares.addEventListener('submit', (event) => {
        event.returnValue = false
        
        $resolveZone.innerHTML = '';
            let nums = [];
            for (let i = 1; i <= numEcuaciones * 3; i++) {
                nums.push(parseInt(document.getElementById(`numero${i}`).value));
            }
            console.log(nums);

            if(!nums.every(num => Number.isInteger(num) && num >= 0)) {
                $resolveZone.innerHTML = 'Ingresa números enteros positivos válidos. Inténtalo de nuevo.';
                return;
            }

            let coeficientes = [];
            let numeros = [];
            let modulos = [];
            // coeficientes = [nums[0], nums[3], nums[6], nums[9], nums[12];
            for (let i = 0; i < numEcuaciones; i++) {
                coeficientes.push(nums[i * 3]);
            }
            console.log(coeficientes);
            // numeros = [nums[1], nums[4], nums[7], nums[10], nums[13]];
            for (let i = 0; i < numEcuaciones; i++) {
                numeros.push(nums[i * 3 + 1]);
            }
            console.log(numeros);
            // modulos = [nums[2], nums[5], nums[8], nums[11], nums[14]];
            for (let i = 0; i < numEcuaciones; i++) {
                modulos.push(nums[i * 3 + 2]);
            }
            console.log(modulos);
                
            // Calcular el rEqModulares y mostrar el resultado
            calcREqModulares(coeficientes, numeros, modulos);

    });


    function calcREqModulares(coeficientes, numeros, modulos) {
        let cof = coeficientes;
        let num = numeros;
        let mod = modulos;

        let allModArePrime = false;
        // Comprobar que todos los modulos sean diferentes
        let allModeAreDiff = modulos.every((val, i, arr) => arr.indexOf(val) === i);
        let thisIsNotPrime = 0;

        if (!allModeAreDiff) {
            $resolveZone.innerHTML = `<b style="color: #8f0000;">Los modulos deben ser diferentes. <br/>Inténtalo de nuevo.</b>`;
            return;
        }

        for (let i = 0; i < modulos.length; i++) {
            if (isPrimo(modulos[i]) ){
                allModArePrime = true;
                allModeAreDiff = true;
            } else {
                allModArePrime = false;
                allModeAreDiff = false;
                thisIsNotPrime = modulos[i];
                break;
            }
        }

        if(!allModArePrime) {
            $resolveZone.innerHTML = `<b style="color: #8f0000;">Todos los modulos deben ser números primos <br/> El modulo '${thisIsNotPrime}' no es primo. <br/>Inténtalo de nuevo.</b>`;
            return;
        }

        //  Teorema chino del residuo
        for(let i = 0; i < coeficientes.length; i++) {
            if (coeficientes[i] != 1) {
                for(let j = 1; j < modulos[i]; j++) {
                    if ((coeficientes[i] * j) % modulos[i] == 1) {
                        cof[i] = 1;
                        num[i] = (numeros[i] * j) % modulos[i];
                        mod[i] = modulos[i];
                        break;
                    } 
                }
            } else {
                cof[i] = 1;
                num[i] = numeros[i];
                mod[i] = modulos[i];
            }
        }
        console.log("Coeficientes:" + cof);
        console.log("Números:" + num);
        console.log("Modulos:" + mod);
        $resolveZone.innerHTML += `Ecuaciones Simplificadas:<br/>`;
        for (let i = 0; i < cof.length; i++) {
            $resolveZone.innerHTML += `${cof[i]}X ≡ ${num[i]} (MOD ${mod[i]})<br/>`;
        }

        let n;
        let q = [];
        let r = [];
            
        for (let i = 0; i < mod.length; i++) {
            if (i === 0) {
                n = mod[i];
            } else {
                n *= mod[i];
            }
        }

        for (let i = 0; i < mod.length; i++) {
            q[i] = n / mod[i];
        }

        for (let index = 0; index < q.length; index++) {
            let temp = calcCombLineal(q[index], mod[index]);

            let m1 = temp[0] % mod[index];
            let m2 = temp[1] % mod[index];

            if (m1 < 0) {
                m1 += mod[index];
            }
            if (m2 < 0) {
                m2 += mod[index];
            }

            if((m1 * q[index]) % mod[index] == 1) {
                r[index] = m1;
            } else {
                r[index] = m2;
            }

        }

        $resolveZone.innerHTML += `Datos para el teorema chino del residuo:<br/>`;
        $resolveZone.innerHTML += `N = ${n}<br/>`;
        for (let i = 0; i < q.length; i++) {
            $resolveZone.innerHTML += `Q${i + 1} = ${q[i]}, R${i + 1} = ${r[i]}<br/>`;
        }

        let x = 0;

        for (let i = 0; i < cof.length; i++) {
            console.log(num[i], q[i], r[i]);
            console.log(num[i] * q[i] * r[i]);
            x += num[i] * q[i] * r[i];
        }
        let resto = x % n;
            
        $resolveZone.innerHTML += `<strong><br/>Solución particular: X ≡ ${resto}(MOD ${n})</strong><br/>`;
        $resolveZone.innerHTML += `<strong>Solución general: X = K·${n} + ${resto}</strong><br/>`;
    }

    function isPrimo(numero) {
        if (numero <= 1) return false;
        if (numero <= 3) return true;
        
        if (numero % 2 === 0 || numero % 3 === 0) return false;
    
        let i = 5;
        while (i * i <= numero) {
            if (numero % i === 0 || numero % (i + 2) === 0) return false;
            i += 6;
        }
    
        return true;
    }

    function calcCombLineal(numero1, numero2) {
        if (numero2 === 0) {
            const result = [1, 0, numero1];
            return result;
        } else {
            const temp = calcCombLineal(numero2, numero1 % numero2);
            const x = temp[0];
            const y = temp[1];
            const gcd = temp[2];
    
            const newX = y;
            const newY = x - Math.floor(numero1 / numero2) * y;
    
            const result = [newX, newY, gcd];
            console.log(result);
            return result;
        }
    }

    function toggleRequired(element, required) {
        if (required) {
            element.setAttribute('required', 'required');
        } else {
            element.removeAttribute('required');
        }
    }

    const $addEq = $('#addEq');

    $addEq.addEventListener('click', () => {
        if (numEcuaciones < 5) {
            numEcuaciones++;
            let newEq = $('#add' + numEcuaciones);
            newEq.style.display = 'contents';
            // Habilitar el campo requerido si está visible
            toggleRequired(newEq.querySelector('input[type="number"]'), true);
            if (numEcuaciones === 5) {
                $addEq.innerHTML = 'Restablecer';
            }
        } else {
            for (let i = 5; i > 3; i--) {
                let eq = $('#add' + i);
                eq.style.display = 'none';
                // Deshabilitar el campo requerido si está oculto
                toggleRequired(eq.querySelector('input[type="number"]'), false);
            }
            numEcuaciones = 3;
            $addEq.innerHTML = 'Añadir otra ecuación';
        }
    });
});