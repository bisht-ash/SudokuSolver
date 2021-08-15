
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
            if(val.length==0){
                board[i][j]=0;
            }
            else{
                board[i][j]=parseInt(val);
            }
            
        }
    }
    console.log(board);
};

btnReset=document.getElementById("reset");
btnReset.onclick =function(){
    document.getElementsByClassName("hidden")[0].style.display='none';
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
        if(board[row][i]===x){
            return true;
        }
    }
    return false;
}
function isInCol(x,row,col){
    for(let i=0;i<9;++i){
        if(board[i][col]===x){
            return true;
        }
    }
    return false;
}
function isInBlock(x,row,col){
    let rowStart=parseInt((row/3))*3;
    let colStart=parseInt((col/3))*3;
    console.log(rowStart);
    console.log(colStart);
    for(let i=rowStart;i<rowStart+3;++i){
        for(let j=colStart;j<colStart+3;++j){
            if(board[i][j]===x){
                return true;
            }
        }
    }
    return false;
}
function isInRow1(x,row,col){
    for(let i=0;i<9;++i){
        if((i!=col) && board[row][i]===x){
            return true;
        }
    }
    return false;
}
function isInCol1(x,row,col){
    for(let i=0;i<9;++i){
        if((i!=(row)) && board[i][col]===x){
            return true;
        }
    }
    return false;
}
function isInBlock1(x,row,col){
    let rowStart=parseInt((row/3))*3;
    let colStart=parseInt((col/3))*3;
    console.log(rowStart);
    console.log(colStart);
    for(let i=rowStart;i<rowStart+3;++i){
        for(let j=colStart;j<colStart+3;++j){
            if((i!=(row)) && (j!=(col)) && board[i][j]===x){
                return true;
            }
        }
    }
    return false;
}

function isValid(){
    for(let i=0;i<9;++i){
        for(let j=0;j<9;++j){
            if(board[i][j]>=0 && board[i][j]<=9){
                if(board[i][j]!=0){
                    if((!isInRow1(board[i][j],i,j))&& (!isInCol1(board[i][j],i,j)) && (!isInBlock1(board[i][j],i,j))){
                        continue;
                    }
                    else{
                        return false;
                    }
                }
            }
            else{
                return false;
            }
        }
    }
    return true;
}

function Solve(row,col){
    if(row==9 && col==0){
        return true;
    }
    else if(board[row][col]<1 || board[row][col]>9){
        for(let x=1;x<=9;++x){
            if((!isInRow(x,row,col))&& (!isInCol(x,row,col)) && (!isInBlock(x,row,col))){
                board[row][col]=x;
                if(col==8){
                    if(Solve(row+1,0)){
                        return true;
                    }
                    else{
                        board[row][col]=0;
                    }
                }
                else{
                    if(Solve(row,col+1)){
                        return true;
                    }
                    else{
                        board[row][col]=0;
                    }
                }
            }
        }
        return false;
    }
    else{
        if(col==8){
            return Solve(row+1,0);
        }
        else{
            return Solve(row,col+1);
        }
    }
    return false;
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
        console.log(board);
        Solve(0,0);
        paste();
    }
    else{
        document.getElementsByClassName("hidden")[0].style.display='block';
    }
}
