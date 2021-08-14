
const board=[[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],
    ];

function createMatrix(){
    for(let i =0;i<9;i++){
        for(let j=0;j<9;j++){
            let si=i.toString();
            let sj=j.toString();
            let val=document.getElementById(si+sj).value;
            board[i][j]=parseInt(val);
        }
    }
    console.log(board);
};

btnReset=document.getElementById("reset");
btnReset.onclick =function(){
    for(let i =0;i<9;i++){
        for(let j=0;j<9;j++){
            let si=i.toString();
            let sj=j.toString();
            let val=document.getElementById(si+sj).value=null;
            board[i][j]=0;
        }
    }
};

function isInRow(x,row,col){
    for(let i=0;i<9;++i){
        if(i!=col && board[row][i]==x){
            return true;
        }
    }
    return false;
}
function isInCol(x,row,col){
    for(let i=0;i<9;++i){
        if(i!=row && board[i][col]==x){
            return true;
        }
    }
    return false;
}
function isInBlock(x,row,col){
    let rowStart=parseInt((row/3)*3);
    let ColStart=parseInt((col/3)*3);
    for(let i=rowStart;i<rowStart+3;++i){
        for(let j=ColStart;j<ColStart+3;++j){
            if(i!=row && j!=col && board[i][col]==x){
                return true;
            }
        }
    }
    return false;
}

function isValid(){
    for(let i=0;i<9;++i){
        for(let j=0;j<9;++j){
            if(board[i][j]!=0){
                if(!isInRow(board[i][j],i,j)&& !isInCol(board[i][j],i,j) && !isInBlock(board[i][j],i,j)){
                    return false;
                }
            }
        }
    }
    return true;
}

function paste(){
    for(let i =0;i<9;i++){
        for(let j=0;j<9;j++){
            let si=i.toString();
            let sj=j.toString();
            document.getElementById(si+sj).value=board[i][j];
        }
    }
}

btnSolve=document.getElementById("solve");
btnSolve.onclick =function(){
    createMatrix();
    if(isValid()){
        document.getElementsByClassName("hidden")[0].style.display='none';
        Solve();
        paste();
    }
    else{
        document.getElementsByClassName("hidden")[0].style.display='block';
    }
}
