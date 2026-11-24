/* Maquette Pizza Capri Angers, par P&N agency */

/* ---------- Carte (prix « à partir de », boutique d'Angers) : [nom, entière, part] ---------- */
var CARTE=[
  {id:'classiques',nom:'Classiques',lignes:[
    ['Anchois','10,00','2,50'],['Fromage','11,20','2,80'],['Champignons','12,00','3,20'],['Poivrons','12,00','3,20'],
    ['Jambon','12,00','3,20'],['Mozzarella','12,80','3,40'],['Royale','12,80','3,40'],['Légumes Mozza','14,40','3,80'],
    ['Trois Fromages','13,60','3,60'],['Bolognaise','13,60','3,60'],['Chorizo','13,60','3,60'],['Royale Crème','14,40','3,80'],
    ['Bari','15,20','3,90'],['Capri','16,00','4,20'],['Saumon','17,20','4,40']]},
  {id:'speciales',nom:'Spéciales',lignes:[
    ['Pompei','11,90',null],['Savone','13,70',null],['Amalfi','14,50',null],['Pescara','14,70',null],['Sorrento','14,70',null],
    ['Quatre Fromages','15,00',null],['Thon','15,20','3,90'],['Corsica','15,20',null],['Portofino','15,70',null],
    ['Savoyarde','16,20',null],['Parma','16,80',null],['Tartufata',null,null],['Spianata',null,null]]},
  {id:'sucrees',nom:'Sucrées',lignes:[
    ['Nutella®','10,80','2,70'],['Nutella® Coco','12,80','3,20'],['Nutella® Oreo®','12,80','3,20'],['Nutella® Daims®','12,80','3,20'],
    ['Nutella® Smarties®','12,80','3,20'],['Nutella® Chocolat blanc','12,80','3,20'],['Nutella® Amandes effilées','12,80','3,20'],
    ['Nutella® Spéculoos®','12,80','3,20'],['Nutella® Cookies',null,null]]},
  {id:'focaccias',nom:'Focaccias sucrées',lignes:[['Nutella® Banane',null,null],['Nutella®',null,null]]}
];
(function(){
  var onglets=document.getElementById('onglets'),panneaux=document.getElementById('panneaux');
  if(!onglets||!panneaux)return;
  CARTE.forEach(function(c,i){
    var b=document.createElement('button');
    b.type='button';b.id='onglet-'+c.id;b.setAttribute('role','tab');b.setAttribute('aria-controls','panneau-'+c.id);
    b.setAttribute('aria-selected',i===0?'true':'false');b.tabIndex=i===0?0:-1;b.textContent=c.nom+' ('+c.lignes.length+')';
    onglets.appendChild(b);
    var p=document.createElement('div');
    p.id='panneau-'+c.id;p.setAttribute('role','tabpanel');p.setAttribute('aria-labelledby',b.id);p.hidden=i!==0;
    var h='<div class="entete"><span></span><span>La part</span><span>Entière</span></div>';
    c.lignes.forEach(function(l){
      h+='<div class="ligne"><h3>'+l[0]+'</h3>';
      if(!l[1]&&!l[2])h+='<span class="boutique">Prix en boutique</span>';
      else h+='<span class="p part'+(l[2]?'':' vide')+'">'+(l[2]?l[2]+' €':'—')+'</span><span class="p">'+l[1]+' €</span>';
      h+='</div>';
    });
    p.innerHTML=h;panneaux.appendChild(p);
  });
  function choisir(b,focus){
    onglets.querySelectorAll('button').forEach(function(x){
      var actif=x===b;x.setAttribute('aria-selected',actif?'true':'false');x.tabIndex=actif?0:-1;
      document.getElementById(x.getAttribute('aria-controls')).hidden=!actif;
    });
    if(focus)b.focus();
  }
  onglets.addEventListener('click',function(e){var b=e.target.closest('button');if(b)choisir(b)});
  onglets.addEventListener('keydown',function(e){
    if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return;
    var bs=[].slice.call(onglets.querySelectorAll('button')),i=bs.indexOf(document.activeElement);
    if(i<0)return;e.preventDefault();choisir(bs[(i+(e.key==='ArrowRight'?1:bs.length-1))%bs.length],true);
  });
})();

/* ---------- Formulaire de démonstration : rien n'est envoyé ---------- */
(function(){
  var f=document.getElementById('formulaire');
  if(!f)return;
  var sujet=document.getElementById('sujet'),etat=document.getElementById('etat');
  function partenaire(){if(location.hash==='#partenaire'&&sujet)sujet.value='partenaire'}
  partenaire();window.addEventListener('hashchange',partenaire);
  document.querySelectorAll('[data-sujet]').forEach(function(a){
    a.addEventListener('click',function(){if(sujet)sujet.value=a.getAttribute('data-sujet')});
  });
  f.addEventListener('submit',function(e){
    e.preventDefault();
    etat.hidden=false;
    etat.textContent='Maquette : ce formulaire de démonstration n\'envoie aucun message.';
  });
})();
