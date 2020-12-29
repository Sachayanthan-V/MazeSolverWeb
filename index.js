const TOT_ROWS = 9;
const TOT_COLS = 9;
const VISITED  = 1;
const NOT_VISITED = 0;
const SAFE  = 1;
const NOT_SAFE = 0;
const logicSelector = $('#logicSelector');

let solutionCounter = 0;
let minimumLength = 81;
let maximumLength = 0;
let averageLenght = 0;
let posible_to_see_other_solutions = false;
let TotalLengthTraversedByMazeRobot = 0;
var username = "";

let maze =  [
    [0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0] 
];


let minlenArray =  [
    [0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0] 
];

let EstartingPoint = startingPoint.innerHTML;
let EendingPoint = endingPoint.innerHTML;
let EwaySelector = waySelector.innerHTML;
let EwayPriority = prioritySelector.innerHTML;


startingPoint.innerHTML = EstartingPoint + "NOT SELECTED YET..."  ;
endingPoint.innerHTML = EendingPoint + "NOT SELECTED YET..."  ;
waySelector.innerHTML = EwaySelector + "NOT SELECTED YET..."  ;
prioritySelector.innerHTML = EwayPriority + "NOT SELECTED YET..."  ;


let EtotalPathFound = totalPathFound.innerHTML;
let EminimumPathLength = minimumPathLength.innerHTML;
let EmaximumPathLength = maximumPathLength.innerHTML;
let EaveragePathLength = averagePathLength.innerHTML;

totalPathFound.innerHTML = EtotalPathFound + "No path found yet";
minimumPathLength.innerHTML = EminimumPathLength + "Not yet calculated"; 
maximumPathLength.innerHTML = EmaximumPathLength + "Not yet calculated"; 
averagePathLength.innerHTML = EaveragePathLength + "Not yet calculated"; 



function mazeSolver(){
    
    TotalLengthTraversedByMazeRobot = 0;
    solutionCounter = 0;
    $('#appendable').empty();

    for(let i=0;i<TOT_ROWS;i++) {
        for(let j=0;j<TOT_COLS;j++) {
            let value = document.getElementById('a'+i+j).value;
            if(value.length==0 || value==0){
                document.getElementById('a'+i+j).value = 0;
                maze[i][j] = 0;
            }else{
                document.getElementById('a'+i+j).value = 1;
                maze[i][j] = 1;
            }
        }
    }

    let startingPointVal = document.getElementById("startingPT").value; 
    let endingPointVal = document.getElementById("endingPT").value;
    let waySelectorVal = document.getElementById("choose4or8").value;
    let wayPriorityVal = document.getElementById("logicSelector").value;

    
    startingPoint.innerHTML = EstartingPoint + " " + startingPointVal  ;
    endingPoint.innerHTML = EendingPoint + " " +endingPointVal   ;
    waySelector.innerHTML = EwaySelector + " " + waySelectorVal  ;

    let RegWayPriorityVal = "";
    if(wayPriorityVal.length==8){
        for(let c=0;c<8;c++){
            if(wayPriorityVal[c]=='1'){
                RegWayPriorityVal += 'T';
            }else if(wayPriorityVal[c]=='2'){
                    RegWayPriorityVal += 'TR';
                }else if(wayPriorityVal[c]=='3'){
                    RegWayPriorityVal += 'R';
                }else if(wayPriorityVal[c]=='4'){
                    RegWayPriorityVal += 'BR';
                }else if(wayPriorityVal[c]=='5'){
                    RegWayPriorityVal += 'B';
                }else if(wayPriorityVal[c]=='6'){
                    RegWayPriorityVal += 'BL';
                }else if(wayPriorityVal[c]=='7'){
                    RegWayPriorityVal += 'L';
                }else{
                    RegWayPriorityVal += 'TL';
                }
            if(c<7){
                RegWayPriorityVal += '-';
            }
        }
    }else{
        for(let c=0;c<4;c++){
            if(wayPriorityVal[c]=='1'){
                RegWayPriorityVal += 'T';
            }else if(wayPriorityVal[c]=='2'){
                RegWayPriorityVal += 'R';
            }else if(wayPriorityVal[c]=='3'){
                RegWayPriorityVal += 'B';
            }else{
                RegWayPriorityVal += 'L';
            }
            if(c<3){
                RegWayPriorityVal += '-';
            }
        }
    }

    prioritySelector.innerHTML = EwayPriority + " " + RegWayPriorityVal  ;

    totalPathFound.innerHTML = EtotalPathFound + "No path found yet";
    minimumPathLength.innerHTML = EminimumPathLength + "Not yet calculated"; 
    maximumPathLength.innerHTML = EmaximumPathLength + "Not yet calculated"; 
    averagePathLength.innerHTML = EaveragePathLength + "Not yet calculated"; 


    let startingPT = document.getElementById("startingPT").value;
    let endingPT = document.getElementById("endingPT").value;

    let st_row = Number(startingPT[1]) ;
    let st_col = Number(startingPT[2]) ;
    let dest_row = Number(endingPT[1]) ;
    let dest_col = Number(endingPT[2]) ;   

    let visited =  [
                    [0,0,0,0,0,0,0,0,0], 
                    [0,0,0,0,0,0,0,0,0], 
                    [0,0,0,0,0,0,0,0,0], 
                    [0,0,0,0,0,0,0,0,0], 
                    [0,0,0,0,0,0,0,0,0], 
                    [0,0,0,0,0,0,0,0,0], 
                    [0,0,0,0,0,0,0,0,0], 
                    [0,0,0,0,0,0,0,0,0], 
                    [0,0,0,0,0,0,0,0,0] 
                ];
    
    let visitedCounter =  [
                    [0,0,0,0,0,0,0,0,0], 
                    [0,0,0,0,0,0,0,0,0], 
                    [0,0,0,0,0,0,0,0,0], 
                    [0,0,0,0,0,0,0,0,0], 
                    [0,0,0,0,0,0,0,0,0], 
                    [0,0,0,0,0,0,0,0,0], 
                    [0,0,0,0,0,0,0,0,0], 
                    [0,0,0,0,0,0,0,0,0], 
                    [0,0,0,0,0,0,0,0,0] 
                ];
    

    let WaySelector = document.getElementById("choose4or8").value;

    if(WaySelector==="FourWay"){
        mazeSolverUtility(st_row,st_col,dest_row,dest_col,visited,visitedCounter,0,0);
    }else if(WaySelector==="EightWay"){
        mazeSolverUtility_8(st_row,st_col,dest_row,dest_col,visited,visitedCounter,0,0);
    }else {
        alert("select 4way or 8way...");
    }

    posible_to_see_other_solutions = true;

    for(let i=0;i<TOT_ROWS;i++){
        for(let j=0;j<TOT_COLS;j++){

            if(minlenArray[i][j]==1){
                document.getElementById('b'+i+j).value = 1;
                document.getElementById('b'+i+j).style.backgroundColor = "green";
            }else {
                document.getElementById('b'+i+j).value = 0;
                document.getElementById('b'+i+j).style.backgroundColor = "white";
            }
            document.getElementById('b'+st_row+st_col).value = 1;
            document.getElementById('b'+st_row+st_col).style.backgroundColor = "orange";
            document.getElementById('b'+dest_row+dest_col).value = 1;
            document.getElementById('b'+dest_row+dest_col).style.backgroundColor = "yellow";
            
        }
    }
    
    if(solutionCounter==0){
        totalPathFound.innerHTML = EtotalPathFound +" 0 ";
        minimumPathLength.innerHTML = EminimumPathLength + "Not possible";
        maximumPathLength.innerHTML = EmaximumPathLength + "Not possible";
        averagePathLength.innerHTML = EaveragePathLength + "Not possible";
        
    }else{
        totalPathFound.innerHTML = EtotalPathFound +" "+solutionCounter;
        minimumPathLength.innerHTML = EminimumPathLength +" " + minimumLength;
        maximumPathLength.innerHTML = EmaximumPathLength +" " + maximumLength;
        averagePathLength.innerHTML = EaveragePathLength +" " + Math.ceil( TotalLengthTraversedByMazeRobot / solutionCounter );
    }

    minimumLength = 81;

}

function mazeSolverUtility(curr_row, curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal, minlen){
    
    if( curr_row==dest_row && curr_col==dest_col ){
        TotalLengthTraversedByMazeRobot += minlen;
        solutionCounter ++;

        if(minimumLength > minlen){
            minimumLength = minlen;
            for(let i=0;i<TOT_ROWS;i++){
                for(let j=0;j<TOT_COLS;j++){
                    minlenArray[i][j] = visited[i][j];
                }
            }
        }

        if(maximumLength < minlen){
            maximumLength = minlen;
        }

        // To appending the results into html ->  
        // let divCounter = 0;        
        let solutionCounterContent = "<h1> " + solutionCounter + "<h1>";
        $('#appendable').append(solutionCounterContent);
        for(let ap=0;ap<9;ap++){
            let AppvalHeader = '<div style=" display:flex;  "> ' ;
            for(let iap=0;iap<9;iap++){
                if([ap]==dest_row && [iap]==dest_col){
                    let Appval = '<div style="width:25px; height:25px; background-color:yellow; margin:5px; text-align:center; font-size:23px; color:green ">' + (minlen+1) + ' </div>' ;
                    AppvalHeader += Appval;
                }
                else if(visited[ap][iap]==1){
                    let Appval = '<div style="width:25px; height:25px; background-color:green; margin:5px; text-align:center; font-size:23px; color:white ">' + (visitedCounter[ap][iap]) + ' </div>' ;
                    AppvalHeader += Appval;
                }else{
                    let Appval = '<div style="width:25px; height:25px; background-color:whitesmoke; margin:5px "> </div>' ;
                    AppvalHeader += Appval;
                }
            }
            AppvalHeader += '</div>';
            $('#appendable').append(AppvalHeader);
        }
        $('#appendable').append('<br>');
        $('#appendable').append('<h2> Takes ' + minlen + ' to reach the destination. </h2><br><br><br>');
        // appending content into results is finished here...

        return ;
    }

    let flowPath = logicSelector.val();
    for(let traverse=0; traverse < 4;traverse++){
        if(flowPath[traverse]=='1'){
            Top(curr_row, curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal, minlen);
        }
        else if(flowPath[traverse]=='2'){
            Right(curr_row, curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal, minlen);
        }
        else if(flowPath[traverse]=='3'){
            Bottom(curr_row, curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal, minlen);
        }
        else /*(flowPath[traverse]=='4')*/{
            Left(curr_row, curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal, minlen);
        }
    }

}

function mazeSolverUtility_8(curr_row, curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal, minlen){
    
    if( curr_row==dest_row && curr_col==dest_col ){
        TotalLengthTraversedByMazeRobot += minlen;
        solutionCounter ++;

        if(minimumLength > minlen){
            minimumLength = minlen;
            for(let i=0;i<TOT_ROWS;i++){
                for(let j=0;j<TOT_COLS;j++){
                    minlenArray[i][j] = visited[i][j];
                }
            }
        }

        if(maximumLength < minlen){
            maximumLength = minlen;
        }

        // To appending the results into html ->  
        // let divCounter = 0;        
        let solutionCounterContent = "<h1> " + solutionCounter + "<h1>";
        $('#appendable').append(solutionCounterContent);
        for(let ap=0;ap<9;ap++){
            let AppvalHeader = '<div style=" display:flex;  "> ' ;
            for(let iap=0;iap<9;iap++){
                if([ap]==dest_row && [iap]==dest_col){
                    let Appval = '<div style="width:25px; height:25px; background-color:yellow; margin:5px; text-align:center; font-size:23px; color:green ">' + (minlen+1) + ' </div>' ;
                    AppvalHeader += Appval;
                }
                else if(visited[ap][iap]==1){
                    let Appval = '<div style="width:25px; height:25px; background-color:green; margin:5px; text-align:center; font-size:23px; color:white ">' + (visitedCounter[ap][iap]) + ' </div>' ;
                    AppvalHeader += Appval;
                }else{
                    let Appval = '<div style="width:25px; height:25px; background-color:whitesmoke; margin:5px "> </div>' ;
                    AppvalHeader += Appval;
                }
            }
            AppvalHeader += '</div>';
            $('#appendable').append(AppvalHeader);
        }
        $('#appendable').append('<br>');
        $('#appendable').append('<h2> Takes ' + minlen + ' to reach the destination. </h2><br><br><br>');
        // appending content into results is finished here...

        return ;
    }

    let flowPath = logicSelector.val();
    for(let traverse=0; traverse < 8;traverse++)
    {
        if      (flowPath[traverse]=='1'){
            Top         (curr_row, curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal, minlen);
        }
        else if (flowPath[traverse]=='2'){
            TopRight    (curr_row, curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal, minlen);
        }
        else if (flowPath[traverse]=='3'){
            Right       (curr_row, curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal, minlen);
        }
        else if (flowPath[traverse]=='4'){
            BottomRight (curr_row, curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal, minlen);
        }
        else if (flowPath[traverse]=='5'){
            Bottom      (curr_row, curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal, minlen);
        }
        else if (flowPath[traverse]=='6'){
            BottomLeft  (curr_row, curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal, minlen);
        }
        else if (flowPath[traverse]=='7'){
            Left        (curr_row, curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal, minlen);
        }
        else /* (flowPath[traverse]=='8')*/{
            TopLeft     (curr_row, curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal, minlen);
        }
    }

}

$('#ClickForOtherSolutionBtn').on('click', ()=>{

    if(!posible_to_see_other_solutions) {
        alert(' No operation done yet! Please Done it first... ');
    }
    else{
        let go_to_url = "/solutions.html";
        // window.open(go_to_url, '_blank');
        $('#modal_OtherSolutions').css("opacity","1").css("visibility","visible");
        $('.modal__content__OtherSolutions').css("opacity","1").css("visibility","visible");
    }

});
$('#closeOtherSolutions').on('click', ()=>{
    $('#modal_OtherSolutions').css("opacity","0").css("visibility","hidden");
    $('.modal__content__OtherSolutions').css("opacity","0").css("visibility","hidden");
});
$('#login').on('click',()=> {

    username += $('#userName').val();
    
    $('#usernameAppend').append(username);

    if( username == "" ){
        alert('Enter user name before click the login button!..');
    }else{
        $('#loginPage').css('opacity','0').css('visibility','hidden');   
        $('#loginPageContent').css('opacity','0').css('visibility','hidden');   
    }

    // .delay(2000).fadeIn()
    $('#noteHead').delay(1000).fadeIn(3000);//.css("opacity","1").css("visibility","visible").fadeIn(3000);
    // $('#nodePara').css("opacity","1").css("visibility","visible");
    $('#noteHead').delay(10000).fadeOut(10000); //.css("opacity","0").css("visibility","hidden");


});

//       Top :
function Top            (curr_row,curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal,minlen){
    if( curr_row-1>=0 && visited[curr_row-1][curr_col]==NOT_VISITED && maze[curr_row-1][curr_col]==SAFE ){
        visited[curr_row][curr_col] = VISITED;
        visitedCounter[curr_row][curr_col] = visitedCounterVal+1;
        mazeSolverUtility(curr_row-1,curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal+1,minlen+1);
        visited[curr_row][curr_col] = NOT_VISITED;
        visitedCounter[curr_row][curr_col] = visitedCounterVal-1;
    }
}
//       Right :
function Right          (curr_row,curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal,minlen){
    if( curr_col+1<TOT_COLS && visited[curr_row][curr_col+1]==NOT_VISITED && maze[curr_row][curr_col+1]==SAFE ){
        visited[curr_row][curr_col] = VISITED;
        visitedCounter[curr_row][curr_col] = visitedCounterVal+1;
        mazeSolverUtility(curr_row,curr_col+1,dest_row,dest_col,visited,visitedCounter,visitedCounterVal+1,minlen+1);
        visited[curr_row][curr_col] = NOT_VISITED;
        visitedCounter[curr_row][curr_col] = visitedCounterVal-1;
    }
}
//       Bottom :
function Bottom         (curr_row,curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal,minlen){
    if( curr_row+1<TOT_ROWS && visited[curr_row+1][curr_col]==NOT_VISITED && maze[curr_row+1][curr_col]==SAFE ){
        visited[curr_row][curr_col] = VISITED;
        visitedCounter[curr_row][curr_col] = visitedCounterVal+1;
        mazeSolverUtility(curr_row+1,curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal+1,minlen+1);
        visited[curr_row][curr_col] = NOT_VISITED;
        visitedCounter[curr_row][curr_col] = visitedCounterVal-1;
    }
}
//       Left : 
function Left           (curr_row,curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal,minlen){
    // Left :  
    if( curr_col-1>=0 && visited[curr_row][curr_col-1]==NOT_VISITED && maze[curr_row][curr_col-1]==SAFE ){
        visited[curr_row][curr_col] = VISITED;
        visitedCounter[curr_row][curr_col] = visitedCounterVal+1;
        mazeSolverUtility(curr_row,curr_col-1,dest_row,dest_col,visited,visitedCounter,visitedCounterVal+1,minlen+1);
        visited[curr_row][curr_col] = NOT_VISITED;
        visitedCounter[curr_row][curr_col] = visitedCounterVal-1;
    }

}

//       TopLeft :  
function TopLeft        (curr_row,curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal,minlen){
    if( curr_row-1>=0&& curr_col-1>=0 && visited[curr_row-1][curr_col-1]==NOT_VISITED && maze[curr_row-1][curr_col-1]==SAFE ){
        visited[curr_row][curr_col] = VISITED;
        visitedCounter[curr_row][curr_col] = visitedCounterVal+1;
        mazeSolverUtility_8(curr_row-1,curr_col-1,dest_row,dest_col,visited,visitedCounter ,visitedCounterVal+1 ,minlen+1);
        visited[curr_row][curr_col] = NOT_VISITED;
        visitedCounter[curr_row][curr_col] = visitedCounterVal-1;
    }
}
//       TopRight : 
function TopRight       (curr_row,curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal,minlen){ 
    if( curr_row-1>=0&& curr_col+1<TOT_COLS && visited[curr_row-1][curr_col+1]==NOT_VISITED && maze[curr_row-1][curr_col+1]==SAFE ){
        visited[curr_row][curr_col] = VISITED;
        visitedCounter[curr_row][curr_col] = visitedCounterVal+1;
        mazeSolverUtility_8(curr_row-1,curr_col+1,dest_row,dest_col,visited,visitedCounter ,visitedCounterVal+1 ,minlen+1);
        visited[curr_row][curr_col] = NOT_VISITED;
        visitedCounter[curr_row][curr_col] = visitedCounterVal-1;
    }
}
//       BottomLeft :  
function BottomLeft     (curr_row,curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal,minlen){
    if( curr_row+1<TOT_ROWS&& curr_col-1>=0 && visited[curr_row+1][curr_col-1]==NOT_VISITED && maze[curr_row+1][curr_col-1]==SAFE ){
        visited[curr_row][curr_col] = VISITED;
        visitedCounter[curr_row][curr_col] = visitedCounterVal+1;
        mazeSolverUtility_8(curr_row+1,curr_col-1,dest_row,dest_col,visited,visitedCounter ,visitedCounterVal+1 ,minlen+1);
        visited[curr_row][curr_col] = NOT_VISITED;
        visitedCounter[curr_row][curr_col] = visitedCounterVal-1;
    }
}
//       BottomRight :  
function BottomRight    (curr_row,curr_col,dest_row,dest_col,visited,visitedCounter,visitedCounterVal,minlen){
    if( curr_row+1<TOT_ROWS && curr_col+1 <TOT_COLS && visited[curr_row+1][curr_col+1]==NOT_VISITED && maze[curr_row+1][curr_col+1]==SAFE ){
        visited[curr_row][curr_col] = VISITED;
        visitedCounter[curr_row][curr_col] = visitedCounterVal+1;
        mazeSolverUtility_8(curr_row+1,curr_col+1,dest_row,dest_col,visited,visitedCounter ,visitedCounterVal+1 ,minlen+1);
        visited[curr_row][curr_col] = NOT_VISITED;
        visitedCounter[curr_row][curr_col] = visitedCounterVal-1;
    }
}
