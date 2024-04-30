document.addEventListener('DOMContentLoaded', () => {

    const $ = selector => document.querySelector(selector);
    const $rEqModulares = $('#rEqSistemForm')
    const $resolveZone = $('#res')
    let numEcuaciones = 3;

    $rEqModulares.addEventListener('submit', (event) => {

        
        $resolveZone.innerHTML = '';
        event.returnValue = false
            let nums = [];
            for (let i = 1; i <= numEcuaciones * 3; i++) {
                nums.push(parseInt(document.getElementById(`numero${i}`).value));
            }
            console.log(nums);
            if (nums.every(num => Number.isInteger(num) && num > 0) ) {
                let coeficientes = [nums[0], nums[3], nums[6]];
                console.log(coeficientes);
                let numeros = [nums[1], nums[4], nums[7]];
                console.log(numeros);
                let modulos = [nums[2], nums[5], nums[8]];
                console.log(modulos);

                // Calcular el rEqModulares y mostrar el resultado
                let EqModulares = calcREqModulares(coeficientes, numeros, modulos);
                //console.log(EqModulares);
                //$resolveZone.innerHTML = `El rEqModulares de ${numero1}, ${numero2} y ${numero3} es ${3}.`;
            } else {
                $resolveZone.innerHTML = 'Ingresa números enteros positivos válidos.';
            }

    });


    function calcREqModulares(coeficientes, numeros, modulos) {
        let cof = coeficientes;
        let num = numeros;
        let mod = modulos;

        if (isPrimo(modulos[0]) && isPrimo(modulos[1]) && isPrimo(modulos[2])) {
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
            console.log("Numeros:" + num);
            console.log("Modulos:" + mod);
            $resolveZone.innerHTML += `Ecuaciones Simplificadas:<br/>`;
            for (let i = 0; i < cof.length; i++) {
                $resolveZone.innerHTML += `${cof[i]}X ≡ ${num[i]} (MOD ${mod[i]})<br/>`;
            }

            let n;
            let q = [];
            let r = [];
            n = mod[0] * mod[1] * mod[2];
            q[0] = n / mod[0];
            q[1] = n / mod[1];
            q[2] = n / mod[2];

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
                
                /* este for no sirve, por que?, no se, pero no sirve 
                Este for aunque su estructura es correcta, pero se buguea al no encontrar el valor de m
                en la primera iteracion no hace la segunda iteracion y si intento corregir manualmente la variable de iteracion z
                entra en un bucle infinito 

                for (let z = 0; z < 2; z++) {
                    console.log(`inicial ${z}`);
                    if (temp[z] < mod[z]) {
                        let m = temp[z] % mod[z];
                        console.log(`m = ${temp[z]} % ${mod[z]} = ${m}`);
                        if (m < 0) {
                            m += mod[index];
                        }
                        if((m * q[index]) % mod[index] == 1) {
                            console.log(`estado definitivo m = ${m}`);
                            r[index] = m;
                            break;
                        }
                        console.log(`estado transitivo m = ${m}`);
                        console.log(`iteracion ${z}`);
                    }
                } */
            }
            console.log("Ya llegue aqui");
            $resolveZone.innerHTML += `Datos para el teorema chino del residuo:<br/>`;
            $resolveZone.innerHTML += `N = ${n}<br/> Q1 = ${q[0]}, Q2 = ${q[1]}, Q3 = ${q[2]}<br/> r1 = ${r[0]}, r2 = ${r[1]}, r3 = ${r[2]}<br/>`;

            let x = num[0] * q[0] * r[0] + num[1] * q[1] * r[1] + num[2] * q[2] * r[2];
            let resto = x % n;
            
            $resolveZone.innerHTML += `Solucion particular: X ≡ ${resto}(MOD ${n})<br/>`;
            $resolveZone.innerHTML += `Solucion general: X = K·${n} + ${resto}<br/>`;
            
            
        } else {
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
            
            console.log(cof);
            for (let i = 0; i < cof.length; i++) {
                $resolveZone.innerHTML += `${cof[i]}X ≡ ${num[i]} (MOD ${mod[i]})<br/>`;
            }
            $resolveZone.innerHTML += `N = ${n}<br/> Q1 = ${q[0]}, Q2 = ${q[1]}, Q3 = ${q[2]}<br/> r1 = ${r[0]}, r2 = ${r[1]}, r3 = ${r[2]}<br/>`;
    
            let x = num[0] * q[0] * r[0] + num[1] * q[1] * r[1] + num[2] * q[2] * r[2];
            let resto = x % n;
            $resolveZone.innerHTML += `Solucion particular: X ≡ ${resto}(MOD ${n})<br/>`;
            $resolveZone.innerHTML += `Solucion general: X = K·${n} + ${resto}<br/>`;
        }
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



});