function Generation() {
    
    var xt = 10,  yt = 10; //largeur et hauteur labyrinthe
    
    var xe = 5, ye = 1 //case d'entrée labyrinthe
    
    var xs = 5, ys = 9; //case de sortie labyrinthe
    
    var r = 1; //nombre de chemin
    
    //direction N,S,E,O
    var N = true, S = true, E = true, O = true;
    
    var i = 0; //position dans le labyrinthe
    var j = 0; //compteur
    var k = 0; //selecteur
    
    var xtab = new Array(); //création tableau x
    var ytab = new Array(); //création tableau y
    
    var Vx = false, Vy = false, Victory = false; //condition de victoire
    
    
    //remplissage première ligne (0) tableaux
    xtab = [xe]; //,'5','5','5','4','4','3'];
    ytab = [ye]; //,'1','2','3','3','2','2'];
    
    do { //répéter boucle tant que case actuelle != sortie
        
        //réinitialisation directions
        N = true;
        S = true;
        E = true;
        O = true;
                
        //eviter limites labyrinthe
        if (ytab[i] === (yt-1)) { N = false; }
        if (ytab[i] === 1) { S = false; }
        if (xtab[i] === (xt-1)) { E = false; }
        if (xtab[i] === 1) { O = false; }
    
        for (j = 0; j <= i; j++) {
            
            //eviter doublon    
            if ((xtab[i] === xtab[j]) && ((ytab[i]+1) === ytab[j])) { N = false; }
            if ((xtab[i] === xtab[j]) && ((ytab[i]-1) === ytab[j])) { S = false; }
            if (((xtab[i]+1) === xtab[j]) && (ytab[i] === ytab[j])) { E = false; }
            if (((xtab[i]-1) === xtab[j]) && (ytab[i] === ytab[j])) { O = false; }
            
 
        }
        
        //réinitialisation si aucun chemin possible
        if ((N === false) && (S === false) && (E === false) && (O === false)) {
            xtab = [xe], ytab = [ye];
            i = 0;
            r++;
        }
        
        else  {
        
            do {
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
        
        i++; } //fin else
        
        //i = xtab.length;
        
        Vx = true;
        Vy = true;
        
        if ((xtab[i]) == xs) { Vx = true; }
        else { Vx = false; }
        if ((ytab[i]) == ys) { Vy = true; }
        else { Vy = false; }
     
        if ((Vx) && (Vy)) { Victory = true; }        
        
    } while (!Victory);
    
    document.write("Nombre de chemins crées: " + r + "<br/><br/>");
    document.write("Nombre de positions créées: " + i + "<br/><br/>");
    for (j = 0; j <= i; j++) {
        document.write("Position " + j + " : ");
        document.write(xtab[j] + " | ");
        document.write(ytab[j] + "<br/>");
    }
  
}