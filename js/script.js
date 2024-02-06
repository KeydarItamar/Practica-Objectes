import { Cicle } from './Cicles.js';
function calculHores(i){
    let cicle = llistatCicles[i]
    let calcul = 0;
    if(cicle.moduls.length > 0){
        cicle.moduls.forEach(function (mod){
            calcul+= parseInt(mod.hores, 10);
        });
        return alert(`El total de hores es: ${calcul}h`);
    }else{
        return alert(`El total de hores es: ${calcul}h`);
    }
}

class Modul{
    constructor(cicle, nom, num, hores){
        this.cicle = cicle;
        this.nom = nom;
        this.num = num;
        this.hores = hores;
    }


    toString(){
        return `Num: ${this.num}, Nom: ${this.nom}, Hores: ${this.hores}h ` + '\n';
    }
}

function editarCicle(i){
    let cicle = llistatCicles[i];
    cicle.nom = document.getElementById("cicle_nom").value;
    cicle.categoria = document.getElementById("cicle_categoria").value;
    cicle.numAlumnes = document.getElementById("cicle_alumnes").value;
    cicle.abreviatura = document.getElementById("cicle_abr").value;

    cicle.setNumEdicions();
    console.log(`Numero de vegades editat: ${cicle.numEdicions}`)
    console.log(`Hora de l'edició: ${cicle.dataEdit}`)
}


let llistatCicles = [];

function afegirCicle(){
    let nom = document.getElementById("cicle_nom").value;
    let categoria = document.getElementById("cicle_categoria").value;
    let numAlumnes = document.getElementById("cicle_alumnes").value;
    let abreviatura = document.getElementById("cicle_abr").value;
    let idx = document.getElementById("editCicle").value;

    let cicleCreat = new Cicle (nom, categoria, numAlumnes,abreviatura)
    console.log(cicleCreat);

    if( idx === "-1"){
        //Afegim el cicle al llistat
        llistatCicles.push(cicleCreat);
    }else{
        //Editar cicle
        editarCicle(idx);
        }
    
    //Actualitzem el selector
    actualitzarSelector();

    //Printem la llista
    printLlistat(llistatCicles);

    //Netegem els formularis
    netejarFormularis();

    document.getElementById("editCicle").value=-1;
}

document.getElementById("btnAfegirCicle").addEventListener("click", afegirCicle);


function afegirModul(){
    let cicle = document.getElementById("modul_cicle").value;
    let modul_nom = document.getElementById("modul_nom").value;
    let modul_num = document.getElementById("modul_num").value;
    let modul_hores = document.getElementById("modul_hores").value;

    let modul = new Modul (cicle, modul_nom, modul_num, modul_hores)
    console.log(modul);
    let nomCicle =cicle;
    const cicleGuardado = llistatCicles[cicle];
    cicleGuardado.añadirModul(modul);

    //Printem la llista
    printLlistat(llistatCicles);

    //Netegem els formularis
    netejarFormularis();
}

document.getElementById("btnAfegirModul").addEventListener("click", afegirModul);

//Funció per llistar els cicles
function printLlistat (llistat){
    let str="";
    llistat.forEach(function(element, index){
        str += `<div class="block p-6 mb-3 w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${element.abreviatura.toUpperCase()}. ${element.nom}</h5>
                    <h6 class="text-gray-700">${element.categoria}</h6>
                    <p class="font-normal text-gray-700">Num d'alumnes: ${element.numAlumnes}</p>
                    <p class="font-normal text-gray-700">Moduls: ${element.moduls}</p>
                    
            
                    <button type="button"  id="${index}_removeCicle" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Eliminar</button>
                    <button type="button"  id="${index}_editCicle"   class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Editar</button>
                    <button type="button"  id="${index}_calculHores" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Càlcul hores</button>
                </div>`;
            
    });
   
    document.getElementById("llistat").innerHTML=str;

    llistat.forEach(function (element,index){
    document.getElementById(`${index}_removeCicle`).addEventListener("click",function(){
        removeCicle(index);
    });
    document.getElementById(`${index}_editCicle`).addEventListener("click",function (){
        editCicle(index);
    });
    document.getElementById(`${index}_calculHores`).addEventListener("click", function (){
        calculHores(index);
    });
    }); 
}


function actualitzarSelector(){
    let select = document.getElementById('modul_cicle');
    select.innerHTML = "";
    llistatCicles.forEach(function(element, index){
        let opt = document.createElement('option');
        opt.value = index;
        opt.text = element.nom;
        select.appendChild(opt);
    });
}

//Funció per eliminar un cicle
function removeCicle(i){
    llistatCicles.splice(i, 1);
    printLlistat(llistatCicles);
}

//Funció per editar un cicle
function editCicle(i){
    console.log(llistatCicles[i])
    document.getElementById("cicle_nom").value = llistatCicles[i].nom;
    document.getElementById("cicle_categoria").value = llistatCicles[i].categoria;
    document.getElementById("cicle_alumnes").value = llistatCicles[i].numAlumnes;
    document.getElementById("cicle_abr").value = llistatCicles[i].abreviatura;
    document.getElementById("editCicle").value=i;
}

//Funció per netejar els formularis
function netejarFormularis(){
    var inputs = document.getElementsByTagName("input");
    for (let i=0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    document.getElementById("editCicle").value="-1";

    var selects = document.getElementsByTagName("select");
    for (let i=0; i < selects.length; i++) {
        selects[i].value = 0;
    }
}