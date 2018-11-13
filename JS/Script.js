function Test() {   
}




window.onload = function Generation() {
    
    var xt = 10,  yt = 10; //largeur et hauteur labyrinthe
    
    var xe = 5, ye = 0 //case d'entrée labyrinthe
    
    var xs = 5, ys = 9; //case de sortie labyrinthe
    
    var r = 1; //demi-tour
    
    //direction N,S,E,O
    var N = true, S = true, E = true, O = true;
    
    var i = 0; //position dans le labyrinthe
    var j = 0; //compteur
    var k = 0; //selecteur
    
    var xtab = new Array(); //création tableau x
    var ytab = new Array(); //création tableau y
        
    var Vx = false, Vy = false, Victory = false; //condition de victoire
    
    
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
            
            Generation();*/
        }
        
        //demi-tour si aucun chemin possible
        if (!N && !S && !E && !O) {
            
            ytab[i+1] = ytab[(i-r)];
            xtab[i+1] = xtab[(i-r)]; 
            r=r+2;
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
        
        } //fin else
        i++;
        
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
    
    for (y = 1; y < yt; y++) { //balayage de tous les y
        for (x = 1; x < xt; x++) { //balayage de tous les x
            for (j = 1; j <= i; j++) { //balayage de toutes les positions (i)
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
            document.write("<img src='images/cases 2/" + dtab[j] + ".jpg' alt='" + dtab[j] + "' /></a>");
            
            N = false;
            S = false;
            E = false;
            O = false;
        } //fin balayage x
        document.write("<br/>");
    } //fin balayage y*/
        
        
    
    
} //fin fonction Generation