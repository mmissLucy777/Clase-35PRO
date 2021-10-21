var ball, database;
var position;

function setup(){
    database = firebase.database(); //Accede a la propiedad de la DB de firebase
    console.log(database);
    createCanvas(500,500);
    
    ball = createSprite(250,250,20,20);
    ball.shapeColor = rgb(255,255,0); //Color amarillo en rgb

    var ballPosition = database.ref('Pelota/posicion'); //Se refiere a la ubicación del valor de la DB
    ballPosition.on("value", readPosition, showError); //Crea un oyente que sigue escuchando los cambios de la DB
    //readPosition se llama cuando ocurre un cambio en los valores de la DB en la posición, lee la posición del valor en la DB
    //showError se llama cuando ocurre un erroral leer los valores en la DB
}//Fin setup


function draw(){
    background(255,0,255); //Color naranja en rgb 255,0,1

    if(position !== undefined){
    if(keyDown(LEFT_ARROW)){
       writePosition(-1,0);  // Antes changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,1);
    }
    drawSprites();
}//Fin if(!==)
}//Fin draw

/*function changePosition(x,y){ //La función recibe dos parámetros de draw()
    ball.x = ball.x + 10*x; //Probar con 10*x para notar cambio
    ball.y = ball.y + 10*y; //Probar con 10*y para notar cambio
}*/

function writePosition(x,y){
    database.ref('Pelota/posicion').set({'x': position.x + x, 'y': position.y + y});
}

function readPosition(data){ //Función para leer la posición de la DB
    position = data.val();
    console.log("Posicion X:", position.x);
    console.log("Posicion Y:", position.y);
    ball.x = position.x;
    ball.y = position.y;
}



function showError(){
    console.log("Error de escritura en la DB")
}


