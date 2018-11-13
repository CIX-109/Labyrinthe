function Test() { 
    kill = 2000;
    if (kill > 1000) { Generation(); }
}




window.onload = function Generation() {
    
    var xt = 20,  yt = 20; //largeur et hauteur labyrinthe
    
    var xe = 1, ye = 1 //case d'entrée labyrinthe
    
    var xs = 10, ys = 10; //case de sortie labyrinthe
    
    var r = 1; //demi-tour
    
    //direction N,S,E,O
    var N = true, S = true, E = true, O = true;
    
    var i = 0; //position dans le labyrinthe
    var j = 0; //compteur
    var k = 0; //selecteur
    
    var xtab = new Array(); //création tableau x
    var ytab = new Array(); //création tableau y
        
    var Vx = false, Vy = false, Victory = false; //condition de victoire
    
    var killMain = 0; //détecter les boucles infinies
    var killNoWay = 0;
    var killRandom = 0;
    
    //remplissage première ligne (0) tableaux
    xtab = [xe];
    ytab = [ye];
    
    do { //répéter boucle tant que case actuelle != sortie
        
        //réinitialisation directions
        N = false;
        S = false;
        E = false;
        O = false;
                
        //éviter de sortir des limites du labyrinthe
        if (ytab[i] == 0) { N = true; }
        else if (ytab[i] == yt) { S = true; }
        else if (xtab[i] == 0) { E = true; }
        else if (xtab[i] == xt) { O = true; }
        else {
        N = true;
        S = true;
        E = true;
        O = true;    
        if (ytab[i] >= (yt-1)) { N = false; }
        if (ytab[i] <= 1) { S = false; }
        if (xtab[i] >= (xt-1)) { E = false; }
        if (xtab[i] <= 1) { O = false; }
        }
    
        for (j = 0; j <= i; j++) {
            
            //éviter le chemin de retourner à une ancienne position  
            if ((xtab[i] === xtab[j]) && ((ytab[i]+1) === ytab[j])) { N = false; }
            if ((xtab[i] === xtab[j]) && ((ytab[i]-1) === ytab[j])) { S = false; }
            if (((xtab[i]+1) === xtab[j]) && (ytab[i] === ytab[j])) { E = false; }
            if (((xtab[i]-1) === xtab[j]) && (ytab[i] === ytab[j])) { O = false; }
        }
        
        //réinitialisation si aucun chemin possible
        /*if (!N && !S && !E && !O) {
            
            Generation();
        }*/
        
        j = Math.floor((Math.random() * 5) + 1);
        k = Math.floor((Math.random() * 3) + 1);
        
        //demi-tour si aucun chemin possible
        if (!N && !S && !E && !O) {
            
            ytab[i+1] = ytab[(i-r)];
            xtab[i+1] = xtab[(i-r)]; 
            r=r+2;
            i++;
        }
        
        //demi-tour sur quelques cases pour randomiser le chemin
        else if (j == 1) {
            if (i > k) {
                for (j = 1; j <= k; j++) {
                ytab[i+1] = ytab[(i-r)];
                xtab[i+1] = xtab[(i-r)]; 
                r=r+2;
                i++;
                }
            }
        }
    
        
        else  {//si un chemin possible ...
            
            r=1;//réinitialisation compteur "demi-tour"
            
            do { //randomise une direction jusqu'à ce qu'elle soit possible
            k = Math.floor((Math.random() * 4) + 1);
            
                switch (k) {
                    case 1:
                    if (N === true) {  
                    ytab[i+1] = ytab[i]+1;
                    xtab[i+1] = xtab[i]; }
                    else { k = 5; }
                    break;

                    case 2:
                    if (S === true) {
                    ytab[i+1] = ytab[i]-1;
                    xtab[i+1] = xtab[i]; }
                    else { k = 5; }
                    break;

                    case 3:
                    if (E === true) {
                    ytab[i+1] = ytab[i];
                    xtab[i+1] = xtab[i]+1; }
                    else { k = 5; }
                    break;

                    case 4:
                    if (O === true) {
                    ytab[i+1] = ytab[i];
                    xtab[i+1] = xtab[i]-1; }
                    else { k = 5; }
                    break;

                    default:
                    k = 5;    
                }
            } while (k==5);
        i++;
        } //fin else
        
        //vérification des conditions de victoire
                if ((xtab[i]) == xs) { Vx = true; }
        else { Vx = false; }
        if ((ytab[i]) == ys) { Vy = true; }
        else { Vy = false; }
        if ((Vx) && (Vy)) { Victory = true; }        
    
    
    } while (!Victory);
    
    
    //écriture liste des positions
    /*for (j = 0; j <= i; j++) {
        document.write("Position " + j + " : ");
        document.write(xtab[j] + " | ");
        document.write(ytab[j] + "<br/>");
    }*/
    
    //réinitialisation direction
    N = false;
    S = false;
    E = false;
    O = false;
    
    var x, y; //compteurs
    var dtab = new Array(); //création tableau D
    
    //affichage des bordures Nord
    document.write("<img src='images/cases 2/bNO.jpg' alt='bord' /></a>");
    for (x = 1; x < xt; x++) {
        document.write("<img src='images/cases 2/bN.jpg' alt='bord' /></a>");
    }
    document.write("<img src='images/cases 2/bNE.jpg' alt='bord' /></a><br/>");
    
    
    for (y = 1; y < (yt); y++) { //balayage de tous les y
        document.write("<img src='images/cases 2/bO.jpg' alt='bord' /></a>");
        for (x = 1; x < xt; x++) { //balayage de tous les x
            
            for (j = 0; j <= i; j++) { //balayage de toutes les positions (i)
                if (((xtab[j]) == x) && ((ytab[j]) == y)) {
                
                    if ((ytab[j-1]) == (ytab[j]-1)) { N = true; }
                    if ((ytab[j-1]) == (ytab[j]+1)) { S = true; }
                    if ((xtab[j-1]) == (xtab[j]+1)) { E = true; }
                    if ((xtab[j-1]) == (xtab[j]-1)) { O = true; }
                    if ((ytab[j+1]) == (ytab[j]-1)) { N = true; }
                    if ((ytab[j+1]) == (ytab[j]+1)) { S = true; }
                    if ((xtab[j+1]) == (xtab[j]+1)) { E = true; }
                    if ((xtab[j+1]) == (xtab[j]-1)) { O = true; }            
                    
                } //fin if 
            } //fin balayage i
            
            dtab[j]="";
            if (N) { dtab[j]="N"; }
            if (S) { dtab[j]=dtab[j].concat("S"); }
            if (E) { dtab[j]=dtab[j].concat("E"); }
            if (O) { dtab[j]=dtab[j].concat("O"); }
            if (dtab[j] =="") { dtab[j]="v"; }
            
            //document.write("(" + x + ";" + y + "): " + dtab[j] + "<br/>");
            if ((x == xe) && (y == ye)) {
            document.write("<img src='images/casesE 2/" + dtab[j] + ".jpg' alt='" + dtab[j] + "' /></a>"); }
        
            else if ((x == xs) && (y == ys)) {
            document.write("<img src='images/casesS 2/" + dtab[j] + ".jpg' alt='" + dtab[j] + "' /></a>"); }
        
            else {
            document.write("<img src='images/cases 2/" + dtab[j] + ".jpg' alt='" + dtab[j] + "' /></a>"); }
            
            N = false;
            S = false;
            E = false;
            O = false;
        } //fin balayage x
        document.write("<img src='images/cases 2/bE.jpg' alt='bord' /></a><br/>");
    } //fin balayage y
    
    //affichage des bordures Sud
    document.write("<img src='images/cases 2/bSO.jpg' alt='bord' /></a>");
    for (x = 1; x < xt; x++) {
        document.write("<img src='images/cases 2/bS.jpg' alt='bord' /></a>");
    }
    document.write("<img src='images/cases 2/bSE.jpg' alt='bord' /></a><br/>");
        
        
    
    
} //fin fonction Generation