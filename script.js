let place = false
let your_chance = false
let ship = 0
let ship1 = 0   //0 = false, 1 = in progress of setting, 2 = true(set the ship)   
let ship2 = 0   //0 = false, 1 = in progress of setting, 2 = true(set the ship)
let ship3 = 0   //0 = false, 1 = in progress of setting, 2 = true(set the ship)
let filled_blocks = []


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
        else if(i%columns>13){
            button.className = "grid-buttons"
            button.addEventListener('mousedown',select.bind(null,button))
            button.addEventListener('mouseover', hover.bind(null, 1, button))
        }
        else{
            button.className = "opp-grid-buttons"
            button.addEventListener("mousedown", select.bind(null, button))
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
    }
    createButtons(13,25)
}



createButtons(13,25)

function select(cell){
    if((your_chance==true)&&(cell.className=="opp-grid-buttons")){ //our chance to guess
        cell.style.backgroundColor = "black"
        your_chance = false
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

        const instructions = document.createElement("h1")
        instructions.textContent = ""

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

        document.body.appendChild(sidenavDiv)
    }
}

function setShipValue(size){
    ship = size
    place = true
    if(size==1){
        ship1 = 1
        ship2=0
        ship3=0
    }
    else if(size==2){
        ship2 = 1
        ship1 = 0
        ship3 = 0

    }
    else if(size==3){
        ship3 = 1
        ship1 = 0
        ship2 = 0
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

createSidenav("Menu")