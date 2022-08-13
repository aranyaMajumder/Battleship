createButtons(13,25)
createSidenav("Menu")



let place = false
let your_chance = false

let ship = 0
let ship1 = 0   //0 = false, 1 = in progress of setting, 2 = true(set the ship)   
let ship2 = 0   //0 = false, 1 = in progress of setting, 2 = true(set the ship)
let ship3 = 0   //0 = false, 1 = in progress of setting, 2 = true(set the ship)
let filled_blocks = []
let enemy_ships = []
let possible_blocks = []


function createButtons(rows,columns){
    const div = document.createElement("div")
    div.className = "grid"
    div.id="grid"
    for(let i=1;i<=rows*columns;i++)
    {
        const button = document.createElement('button');
        button.textContent = i
        button.id = i
        
        div.appendChild(button);
        if((i+12)%25==0){
            button.className = "grid-border"
        }
        else if((i%columns>13)){
            button.className = "grid-buttons"
            button.addEventListener('mousedown',select.bind(null,button))
            button.addEventListener('mouseover', hover.bind(null, 1, button))
        }
        else{
            button.className = "opp-grid-buttons"
            button.addEventListener("mousedown", select.bind(null, button))
            button.addEventListener('mouseover',hoverYourChance.bind(null,button))
        }
        if (i%columns==0){
            button.className = "grid-buttons"
            div.appendChild(document.createElement('br'))
        }
    }
    document.body.appendChild(div)
}

function createNewMaze(isPlace){
    const grid = document.querySelector("div[class=grid]")
    const child_nodes = grid.childNodes
    for (child in child_nodes){
        grid.remove(child)
    }
    if (isPlace==true){
        createSidenav("Place-ships")
        filled_blocks = []
        ship1=0
        ship2=0
        ship3=0
    }
    createButtons(13,25)
}





function select(cell){
    if((your_chance==true)&&(cell.className=="opp-grid-buttons")){ //our chance to guess
        if (enemy_ships.includes(parseInt(cell.id))){

            cell.style.backgroundColor = "green"
            
        }
        else{

            cell.style.backgroundColor = "black"
            console.log(cell.id)
        }
            
        your_chance = false
        mainGame()
    }
    else if((place==true)&&(ship1==2)&&(ship2==2)&&(ship3==2)){
        place = false
        
    }
    else if((ship1==1)&&(!checkIfRed())){
        ship1=2
        document.getElementById('three-square').disabled = true
        place = false
        addPlacedShips()
    }
    else if((ship2==1)&&(!checkIfRed())){
        ship2=2
        document.getElementById('five-square').disabled = true
        place = false
        addPlacedShips()
    }
    else if((ship3==1)&&(!checkIfRed())){
        ship3=2
        document.getElementById('seven-square').disabled = true
        place = false
        addPlacedShips()
    }

}

function startPlacing(){
    place = true
    createSidenav("Place-ships")
}

function hover(rotate,b){
    if ((place==true)){
        
        size_on_either_side = ship
        for (let c=1;c<=25*13;c++){
            const each_button = document.getElementById(c)
            if ((each_button.className!="grid-border")){
                each_button.style.backgroundColor="white"
            }
        
        }
        for (let c=0;c<filled_blocks.length;c++){
            document.getElementById(filled_blocks[c]).style.backgroundColor="blue"
        }
        if (rotate==1){
            let current_number = parseInt(b.id)
            
            if (current_number%25-size_on_either_side<14){ //if shape passes the border
                console.log("crossing")
                current_number = (current_number-(current_number%25)+14)+size_on_either_side
            }
            else if((current_number+size_on_either_side)%25<14){
                console.log("yes")
                current_number = current_number-(current_number%25)+(25-size_on_either_side)
            }
            
            //console.log(size_on_either_side)
            //console.log(size_on_left_side)
            
            let alreadyOccupied = false

            for(let c=0;c<=size_on_either_side;c++){
                if(document.getElementById((current_number+c)).style.backgroundColor=="blue"){
                    alreadyOccupied=true
                }
            }
            for(let c=0;c<=size_on_either_side;c++){
                if(document.getElementById((current_number-c)).style.backgroundColor=="blue"){
                    alreadyOccupied=true
                }
            }

            
            for(let c=0;c<=size_on_either_side;c++){
                if (alreadyOccupied==false){
                document.getElementById((current_number+c)).style.backgroundColor="blue"
                }
                else if (document.getElementById((current_number+c)).style.backgroundColor!="blue"){
                    document.getElementById((current_number+c)).style.backgroundColor="red"
                }
            }
            for(let c=0;c<=size_on_either_side;c++){
                if (alreadyOccupied==false){
                    document.getElementById((current_number-c)).style.backgroundColor="blue"
                    }
                    else if (document.getElementById((current_number-c)).style.backgroundColor!="blue"){
                        document.getElementById((current_number-c)).style.backgroundColor="red"
                    }
            }



        }
    }
    else{
        
    }
}

function hoverYourChance(bi){
    if((your_chance==true)&&(bi.id%25!=0)){
        for (let c=1;c<=25*13;c++){
            const each_button = document.getElementById(c)
            if ((each_button.style.backgroundColor=="grey")){
                each_button.style.backgroundColor="white"
            }
                  
    }
}
}

function createSidenav(contentType){
    const sidenav = document.getElementsByClassName('sidenav')//delete existing sidenav
    console.log(sidenav)
    if (sidenav.length!=0)
        document.body.removeChild(sidenav[0])
    
    if (contentType == "Menu"){
        const heading = document.createElement("h1")
        heading.textContent = contentType
        const sidenavDiv = document.createElement("div")
        sidenavDiv.className = "sidenav"
        
        const createNewButton = document.createElement("button")
        createNewButton.className = "tool-buttons"
        createNewButton.id = "create-new"
        createNewButton.textContent = "Clear"
        createNewButton.addEventListener('click',createNewMaze.bind(null,false))
        const placeShipsButton = document.createElement("button")
        placeShipsButton.className = "tool-buttons"
        placeShipsButton.id = "place-ships"
        placeShipsButton.textContent="Start Placing Ships"
        placeShipsButton.addEventListener('click',startPlacing)
        sidenavDiv.appendChild(heading)
        sidenavDiv.appendChild(document.createElement("br"))
        sidenavDiv.appendChild(createNewButton)
        sidenavDiv.appendChild(document.createElement("br"))
        sidenavDiv.appendChild(document.createElement("br"))
        sidenavDiv.appendChild(placeShipsButton)
        document.body.appendChild(sidenavDiv)
    }
    else if (contentType == "Place-ships"){
        const heading = document.createElement("h1")
        heading.textContent = "Place Ships"

        const doneButton = document.createElement("button")
        doneButton.className = "tool-buttons"
        doneButton.id = "done-placing"
        doneButton.textContent = "Start Playing!"
        doneButton.addEventListener('click', donePlacing)

        const instructions = document.createElement("p")
        instructions.textContent = "Select a ship from below and place it on the grid. Once all ships are placed, press 'Start Playing!'"


        const createNewButton = document.createElement("button")
        createNewButton.className = "tool-buttons"
        createNewButton.id = "create-new"
        createNewButton.textContent = "Clear"
        createNewButton.addEventListener('click',createNewMaze.bind(null,true))

        const sidenavDiv = document.createElement("div")
        sidenavDiv.className = "sidenav"
        const threeSquare = document.createElement("button")
        threeSquare.className = "tool-buttons"
        threeSquare.id = "three-square"
        threeSquare.textContent = "3-Squared Ship"

        const fiveSquare = document.createElement("button")
        fiveSquare.className = "tool-buttons"
        fiveSquare.id = "five-square"
        fiveSquare.textContent = "5-Squared Ship"

        const sevenSquared = document.createElement("button")
        sevenSquared.className = "tool-buttons"
        sevenSquared.id = "seven-square"
        sevenSquared.textContent = "7-Squared Ship"

        threeSquare.addEventListener('click', setShipValue.bind(null,1))
        fiveSquare.addEventListener('click', setShipValue.bind(null,2))
        sevenSquared.addEventListener('click', setShipValue.bind(null,3))

        sidenavDiv.appendChild(heading)
        sidenavDiv.appendChild(document.createElement("br"))
        sidenavDiv.appendChild(document.createElement("br"))
        sidenavDiv.appendChild(instructions)
        sidenavDiv.appendChild(document.createElement("br"))
        sidenavDiv.appendChild(document.createElement("br"))       
        


        sidenavDiv.appendChild(threeSquare)
        sidenavDiv.appendChild(document.createElement("br"))
        sidenavDiv.appendChild(document.createElement("br"))

        sidenavDiv.appendChild(fiveSquare)
        sidenavDiv.appendChild(document.createElement("br"))
        sidenavDiv.appendChild(document.createElement("br"))

        sidenavDiv.appendChild(sevenSquared)
        sidenavDiv.appendChild(document.createElement("br"))
        sidenavDiv.appendChild(document.createElement("br"))
    
        sidenavDiv.appendChild(createNewButton)  
        sidenavDiv.appendChild(document.createElement("br"))
        sidenavDiv.appendChild(document.createElement("br"))

        sidenavDiv.appendChild(doneButton)

        document.body.appendChild(sidenavDiv)
    }
}

function setShipValue(size){
    ship = size
    place = true
    if(size==1){
        ship1 = 1

    }
    else if(size==2){
        ship2 = 1


    }
    else if(size==3){
        ship3 = 1

    }
}

function addPlacedShips(){
    for (let c=1;c<=13*25;c++){
        let b = document.getElementById(c)
        if (b.style.backgroundColor=="blue"){
            filled_blocks.push(c)
        }
    }
    console.log(filled_blocks)
}

function checkIfRed(){
    for (let c=1;c<=13*25;c++){
        let b = document.getElementById(c)
        if (b.style.backgroundColor=="red"){
            return true
        }
    }
    return false
}

function donePlacing(){
    if ((ship1==2)&&(ship2==2)&&(ship3==2)){
        
        generateEnemyShips()
    }
    else{
        alert("Place all the ships!")
    }
}

function generateEnemyShips(){
    size_on_either_side = 1
    for (let c=1;c<=3;c++){
    //enemyRotate = Math.floor(Math.random() * 5)
    enemyRotate = 1
    if (enemyRotate==1){
        nonOverlapEnemy()
        for (let j=0;j<=size_on_either_side;j++){
            enemy_ships.push(position+j)

        }
        for (let j=0;j<=size_on_either_side;j++){
            enemy_ships.push(position-j)
        }
    }
    size_on_either_side +=1
    }
    //tempHighlight()
    mainGame()
}

function tempHighlight(){
    for (let c=0;c<enemy_ships.length;c++){
        document.getElementById(enemy_ships[c]).style.backgroundColor = "orange"
    }
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function nonOverlapEnemy(){
    while(true){    
        overlap = false
        position = randomIntFromInterval(size_on_either_side+1,12-size_on_either_side)+(25*(Math.floor(Math.random()*13)))
        for (let j=0;j<=size_on_either_side+1;j++){
            if(enemy_ships.includes(position+j)){
                overlap = true
            }

        }
        for (let j=0;j<=size_on_either_side+1;j++){
            if(enemy_ships.includes(position-j)){
                overlap = true
            }
        }
        if (!overlap){
            return position
        }
    }
}
let p = true
let firstTime = true
let loop = true
let rand = false
function mainGame(){
    createSidenav("main-game")
    
        if (your_chance==false){

            if (possible_blocks.length>0){
                console.log("Trying")
                if (firstTime==true){
                    position=possible_blocks[0]
                    firstTime=false
                    console.log(position)   
                }
                else if(loop==true){
                    position=possible_blocks[1]
                    possible_blocks[1]+=1
                }
                else if((p==true)&&(loop==false)){
                    position=possible_blocks[0]
                    possible_blocks[0]-=1
                }

                
            }
            else{
                position = randomIntFromInterval(14, 25)+(25*(Math.floor(Math.random()*13)))
            }
            if (document.getElementById(position).className!="grid-buttons"){
                firstTime=true
                position = randomIntFromInterval(14, 25)+(25*(Math.floor(Math.random()*13)))
                p = true
                rand = true
                possible_blocks=[]
                loop = true
                //rand = false
            }


            if (filled_blocks.includes(position))
            {
                document.getElementById(position).style.backgroundColor="red"
                if((firstTime==true))
                {possible_blocks.push(position-1)
                possible_blocks.push(position+1)

                }
            }
            else{

                document.getElementById(position).style.backgroundColor="black" //if there is nothing behind in first try
                if ((possible_blocks.length>0)&&(firstTime==true)){
                    if((rand==true)||(p==true)){
                        p=false
                        firstTime=false}
                }
                else if(firstTime==false){ //nothing in front
                    if((rand==true)||(loop==true)){loop=false}
                }
            }
            your_chance = true


    }
}