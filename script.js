let place = false
let your_chance = true

function createButtons(rows,columns){
    const div = document.createElement("div")
    div.className = "grid"
    div.id="grid"
    for(let i=1;i<=rows*columns;i++)
    {
        const button = document.createElement('button');
        button.textContent = "";
        button.id = i
        
        div.appendChild(button);
        if((i+12)%25==0){
            button.className = "grid-border"
        }
        else if(i%columns>13){
            button.className = "grid-buttons"
            button.addEventListener('mousedown',select.bind(null,button))
            button.addEventListener('mouseover', hover.bind(null, 1, 1, button))
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

function createNewMaze(){
    const grid = document.querySelector("div[class=grid]")
    const child_nodes = grid.childNodes
    for (child in child_nodes){
        grid.remove(child)
    }
    createButtons(13,25)
}

document.querySelector("button[id=create-new]").addEventListener('click', createNewMaze)
document.querySelector("button[id=place-ships").addEventListener('click', startPlacing)

createButtons(13,25)

function select(cell){
    if((your_chance==true)&&(cell.className=="opp-grid-buttons")){ //our chance to guess
        cell.style.backgroundColor = "black"
        your_chance = false
    }
    else if((place==true)){
        place = false
    }

}

function startPlacing(){
    place = true

}

function hover(size_on_either_side,rotate,b){
    if (place==true){
        for (let c=1;c<=25*13;c++){
            const each_button = document.getElementById(c)
            if (each_button.className!="grid-border"){
                each_button.style.backgroundColor="white"
            }
        
        }
        if (rotate==1){
            let size_on_left_side = size_on_either_side
            if (parseInt(b.id)%25<=size_on_either_side){ //if shape passes the border
                size_on_left_side = size_on_either_side-parseInt(b.id)-2
           }
           console.log(size_on_either_side)
           console.log(size_on_left_side)
           const current_number = parseInt(b.id)
           for (let c=0;c<=size_on_either_side;c++){
                
                document.getElementById((current_number+c)).style.backgroundColor="blue"
           }
           for (let c=0;c<=size_on_left_side;c++){
                if(document.getElementById((current_number-c)).style.backgroundColor=="white"){
                document.getElementById((current_number-c)).style.backgroundColor="blue"
                }
                else{
                    document.getElementById((current_number+size_on_either_side+c)).style.backgroundColor="blue"
                }
                
           }
        }
    }
    else{
        
    }
}