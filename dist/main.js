(()=>{"use strict";class e{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"generic";if(this.level=e,this.health=50,this.type=t,"Character"===new.target.name)throw new Error("Такого персонажа создать нельзя")}setAttackByLevel(e){return((80+this.health)/100)**(e-1)}}function t(e,t){const a=t-1,s=t**2-t,i=t**2-1;switch(e){case 0:return"top-left";case a:return"top-right";case s:return"bottom-left";case i:return"bottom-right";default:return e>0&&e<a?"top":e>s&&e<i?"bottom":e%t==0?"left":e%t==t-1?"right":"center"}}function a(e,t){const a=[];for(let s=0;s<t;s++)e.forEach((e=>a.push(e+t*s)));return a}function s(e,t){const a=Math.floor(Math.random()*(e.length-1));return t.some((t=>t.position===e[a]))?s(e,t):e[a]}function i(e,t){const a=Math.floor(e/t);return[a*t,(a+1)*t-1]}function r(e,t){const a=Math.floor(e/t);return[e-a*t,e+(t-1-a)*t]}function c(e,t){const{character:a,position:s}=e,[c,n]=i(s,t),h=Math.max(s-a.movementRange,c),l=Math.min(s+a.movementRange,n),o=[];for(let e=h;e<=l;e++){let i;const[c,n]=r(e,t),h=Math.abs(s-e);if(h)i=[e],e-h*t>=c&&i.push(e-h*t),e+h*t<=n&&i.push(e+h*t);else{i=[];const s=Math.max(e-a.movementRange*t,c),r=Math.min(e+a.movementRange*t,n);for(let e=s;e<=r;e+=t)i.push(e)}o.push(...i)}return o}function n(e,t){const{character:a,position:s}=e,[c,n]=i(s,t),h=Math.max(s-a.attackRange,c),l=Math.min(s+a.attackRange,n),o=[];for(let e=h;e<=l;e++){const s=[e],[i,c]=r(e,t);for(let r=1;r<=a.attackRange;r++)e-r*t>=i&&s.push(e-r*t),e+r*t<=c&&s.push(e+r*t);o.push(...s)}return o}function h(e,t){return{x:e%t,y:Math.floor(e/t)}}function l(e,t){return Math.sqrt((t.x-e.x)**2+(t.y-e.y)**2)}function o(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return Math.round(e*10**t)/10**t}const m=[class extends e{constructor(e){super(e),this.level=e,this.type="bowman",this.attack=25,this.defence=25,this.movementRange=2,this.attackRange=2,this.attack*=this.setAttackByLevel(e)}},class extends e{constructor(e){super(e),this.level=e,this.type="swordsman",this.attack=40,this.defence=10,this.movementRange=4,this.attackRange=1,this.attack*=this.setAttackByLevel(e)}},class extends e{constructor(e){super(e),this.level=e,this.type="magician",this.attack=10,this.defence=40,this.movementRange=1,this.attackRange=4,this.attack*=this.setAttackByLevel(e)}}],d=[class extends e{constructor(e){super(e),this.level=e,this.type="vampire",this.attack=25,this.defence=25,this.movementRange=2,this.attackRange=2,this.attack*=this.setAttackByLevel(e)}},class extends e{constructor(e){super(e),this.level=e,this.type="undead",this.attack=40,this.defence=10,this.movementRange=4,this.attackRange=1,this.attack*=this.setAttackByLevel(e)}},class extends e{constructor(e){super(e),this.level=e,this.type="daemon",this.attack=10,this.defence=40,this.movementRange=1,this.attackRange=4,this.attack*=this.setAttackByLevel(e)}}],g=["bowman","swordsman","magician"],u=["vampire","undead","daemon"],v=a([0,1],8),C=a([6,7],8);class p{constructor(){this.boardSize=8,this.container=null,this.boardEl=null,this.cells=[],this.cellClickListeners=[],this.cellEnterListeners=[],this.cellLeaveListeners=[],this.newGameListeners=[],this.saveGameListeners=[],this.loadGameListeners=[]}bindToDOM(e){if(!(e instanceof HTMLElement))throw new Error("container is not HTMLElement");this.container=e}drawUi(e){this.checkBinding(),this.container.innerHTML='\n      <div class="controls">\n        <button data-id="action-restart" class="btn">New Game</button>\n        <button data-id="action-save" class="btn">Save Game</button>\n        <button data-id="action-load" class="btn">Load Game</button>\n      </div>\n      <div class="board-container">\n        <div data-id="board" class="board"></div>\n      </div>\n    ',this.newGameEl=this.container.querySelector("[data-id=action-restart]"),this.saveGameEl=this.container.querySelector("[data-id=action-save]"),this.loadGameEl=this.container.querySelector("[data-id=action-load]"),this.newGameEl.addEventListener("click",(e=>this.onNewGameClick(e))),this.saveGameEl.addEventListener("click",(e=>this.onSaveGameClick(e))),this.loadGameEl.addEventListener("click",(e=>this.onLoadGameClick(e))),this.boardEl=this.container.querySelector("[data-id=board]"),this.boardEl.classList.add(e);for(let e=0;e<this.boardSize**2;e+=1){const a=document.createElement("div");a.classList.add("cell","map-tile",`map-tile-${t(e,this.boardSize)}`),a.addEventListener("mouseenter",(e=>this.onCellEnter(e))),a.addEventListener("mouseleave",(e=>this.onCellLeave(e))),a.addEventListener("click",(e=>this.onCellClick(e))),this.boardEl.appendChild(a)}this.cells=Array.from(this.boardEl.children)}redrawPositions(e){for(const e of this.cells)e.innerHTML="";for(const a of e){const e=this.boardEl.children[a.position],s=document.createElement("div");s.classList.add("character",a.character.type);const i=document.createElement("div");i.classList.add("health-level");const r=document.createElement("div");r.classList.add("health-level-indicator","health-level-indicator-"+((t=a.character.health)<15?"critical":t<50?"normal":"high")),r.style.width=`${a.character.health}%`,i.appendChild(r),s.appendChild(i),e.appendChild(s)}var t}addCellEnterListener(e){this.cellEnterListeners.push(e)}addCellLeaveListener(e){this.cellLeaveListeners.push(e)}addCellClickListener(e){this.cellClickListeners.push(e)}addNewGameListener(e){this.newGameListeners.push(e)}addSaveGameListener(e){this.saveGameListeners.push(e)}addLoadGameListener(e){this.loadGameListeners.push(e)}onCellEnter(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellEnterListeners.forEach((e=>e.call(null,t)))}onCellLeave(e){e.preventDefault();const t=this.cells.indexOf(e.currentTarget);this.cellLeaveListeners.forEach((e=>e.call(null,t)))}onCellClick(e){const t=this.cells.indexOf(e.currentTarget);this.cellClickListeners.forEach((e=>e.call(null,t)))}onNewGameClick(e){e.preventDefault(),this.newGameListeners.forEach((e=>e.call(null)))}onSaveGameClick(e){e.preventDefault(),this.saveGameListeners.forEach((e=>e.call(null)))}onLoadGameClick(e){e.preventDefault(),this.loadGameListeners.forEach((e=>e.call(null)))}static showError(e){alert(e)}static showMessage(e){alert(e)}selectCell(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"yellow";this.deselectCell(e),this.cells[e].classList.add("selected",`selected-${t}`)}deselectCell(e){const t=this.cells[e];t.classList.remove(...Array.from(t.classList).filter((e=>e.startsWith("selected"))))}showCellTooltip(e,t){this.cells[t].title=e}hideCellTooltip(e){this.cells[e].title=""}showDamage(e,t){return new Promise((a=>{const s=this.cells[e],i=document.createElement("span");i.textContent=t,i.classList.add("damage"),s.appendChild(i),i.addEventListener("animationend",(()=>{s.removeChild(i),a()}))}))}setCursor(e){this.boardEl.style.cursor=e}checkBinding(){if(null===this.container)throw new Error("GamePlay not bind to DOM")}}class f{constructor(){this.levelZone=1,this.characters=[],this.selectedCharacter=null,this.move=!0,this.gameOver=!1}clearAll(){this.levelZone=1,this.characters=[],this.selectedCharacter=null,this.move=!0,this.gameOver=!1}clearSelectedCharacter(){this.selectedCharacter=null}setState(e){this.levelZone=e.levelZone,this.characters=e.characters,this.selectedCharacter=null,this.move=e.move,this.gameOver=e.gameOver}setGameOverOn(){this.gameOver=!0}setSelectedCharacter(e,t){this.selectedCharacter={subject:e,movementCells:c(e,t),attackCells:n(e,t)}}addCharacter(e){this.characters.push(e)}removeCharacter(e){this.characters=this.characters.filter((t=>t.position!==e)),this.move=!this.move}moveCharacter(e,t){this.characters=this.characters.map((a=>(a.position===t&&(a.position=e),a))),this.move=!this.move}attackCharacter(e,t){this.characters=this.characters.map((a=>(a.position===e&&(a.character.health=t),a))),this.move=!this.move}getCharacterByPosition(e){return this.characters.find((t=>t.position===e))}getCharactersByTypes(e){return this.characters.filter((t=>e.includes(t.character.type)))}isFriendlyCharacter(e){const t=this.getCharacterByPosition(e),a=this.move?g:u;return!!t&&a.includes(t.character.type)}isEnemyCharacter(e){const t=this.getCharacterByPosition(e),a=this.move?u:g;return!!t&&a.includes(t.character.type)}isNotCharacter(e){return!(this.isFriendlyCharacter(e)||this.isEnemyCharacter(e))}ifOnlyCharacters(e){return this.characters.every((t=>e.includes(t.character.type)))}levelUpCharacters(){this.characters=this.characters.map(((e,t,a)=>{const{health:i,attack:r}=e.character;return e.position=s(v,a),e.character.attack=Math.max(r,r*(80+i)/100),e.character.health=Math.min(i+80,100),e.character.level++,e})),this.move=!this.move}levelUpZone(){this.levelZone=Math.min(++this.levelZone,4)}fixParametersCharacters(){this.characters=this.characters.map((e=>{const{attack:t,health:a}=e.character;return e.character.attack=o(t),e.character.health=o(a),e}))}}class y{constructor(t,a){if(!(t instanceof e))throw new Error("character must be instance of Character or its children");if("number"!=typeof a)throw new Error("position must be a number");this.character=t,this.position=a}}class S{constructor(e){this.members=[...e]}}const L="pointer",k="crosshair",E="not-allowed",w={1:"prairie",2:"desert",3:"arctic",4:"mountain"};function*b(e,t){for(;;){const a=Math.floor(Math.random()*e.length),s=Math.floor(Math.random()*t)+1;yield new e[a](s)}}function G(e,t,a){const s=[];for(let i=0;i<a;i++)s.push(b(e,t).next().value);return s}const P=new p;P.bindToDOM(document.querySelector("#game-container"));const M=new class{constructor(e){this.storage=e}save(e){this.storage.setItem("state",JSON.stringify(e))}load(){try{return JSON.parse(this.storage.getItem("state"))}catch(e){throw new Error("Invalid state")}}}(localStorage),O=new class{constructor(e,t){this.gamePlay=e,this.stateService=t,this.gameState=new f,this.gamePlay.addCellClickListener(this.onCellClick.bind(this)),this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this)),this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this)),this.gamePlay.addNewGameListener(this.onNewGameClick.bind(this)),this.gamePlay.addSaveGameListener(this.onSaveGameClick.bind(this)),this.gamePlay.addLoadGameListener(this.onLoadGameClick.bind(this))}init(e){if(e)this.gameState.setState(e);else{const e=new S(G(m,1,2)),t=new S(G(d,1,2));this.addCharacters(e,v),this.addCharacters(t,C)}this.gamePlay.drawUi(w[this.gameState.levelZone]),this.gamePlay.redrawPositions(this.gameState.characters)}addCharacters(e,t){e.members.forEach((e=>{const a=s(t,this.gameState.characters);this.gameState.addCharacter(new y(e,a))}))}deselectAllCells(){this.gameState.characters.forEach((e=>this.gamePlay.deselectCell(e.position)))}characterSelection(e){const t=this.gameState.getCharacterByPosition(e);this.gameState.setSelectedCharacter(t,this.gamePlay.boardSize),this.gamePlay.selectCell(e)}cellSelection(e){if(!this.gameState.selectedCharacter)return;const{movementCells:t,attackCells:a}=this.gameState.selectedCharacter;this.gameState.isEnemyCharacter(e)&&a.includes(e)&&(this.gamePlay.setCursor(k),this.gamePlay.selectCell(e,"red")),this.gameState.isNotCharacter(e)&&t.includes(e)&&(this.gamePlay.setCursor(L),this.gamePlay.selectCell(e,"green"))}async attackLogic(e){if(!this.gameState.selectedCharacter)return;const{subject:t,attackCells:a}=this.gameState.selectedCharacter;if(this.gameState.isEnemyCharacter(e)&&a.includes(e)){const{character:a}=this.gameState.getCharacterByPosition(e),r=(s=t.character.attack,i=a.defence,o(Math.max(s-i,.1*s))),c=o(a.health-r);if(c>0?this.gameState.attackCharacter(e,c):this.gameState.removeCharacter(e),this.gameState.clearSelectedCharacter(),this.gameState.ifOnlyCharacters(g))if(4!==this.gameState.levelZone){this.gameState.levelUpCharacters(),this.gameState.levelUpZone();const e=this.gameState.levelZone-this.gameState.characters.length+1,t=new S(G(m,this.gameState.levelZone,e)),a=new S(G(d,this.gameState.levelZone,this.gameState.levelZone+1));this.addCharacters(t,v),this.addCharacters(a,C),this.gameState.fixParametersCharacters()}else this.gameState.setGameOverOn(),alert("GAME WIN");this.gameState.ifOnlyCharacters(u)&&(this.gameState.setGameOverOn(),alert("GAME OVER")),await this.gamePlay.showDamage(e,r),this.gamePlay.gameOver||this.gamePlay.drawUi(w[this.gameState.levelZone])}var s,i}movementLogic(e){if(!this.gameState.selectedCharacter)return;const{subject:t,movementCells:a}=this.gameState.selectedCharacter;this.gameState.isNotCharacter(e)&&a.includes(e)&&(this.gameState.moveCharacter(e,t.position),this.gameState.clearSelectedCharacter())}aiLogic(){const e=this.gameState.getCharactersByTypes(u),t=this.gameState.getCharactersByTypes(g);if(!e.length)return;const{ai:a,user:s}=function(e,t,a){let s=e.reduce(((e,s)=>(t.forEach((t=>{const i=h(s.position,a),r=h(t.position,a);e.push({ai:s,user:t,length:l(i,r)})})),e)),[]);return s=s.sort(((e,t)=>e.length-t.length)),s=s.sort(((e,t)=>t.ai.character.attack+t.user.character.attack-(e.ai.character.attack+e.user.character.attack))),{ai:s[0].ai,user:s[0].user}}(e,t,this.gamePlay.boardSize),i=h(s.position,this.gamePlay.boardSize);if(this.onCellClick(a.position),!this.gameState.selectedCharacter)return;const{movementCells:r,attackCells:c}=this.gameState.selectedCharacter,n=r.reduce(((e,t)=>{if(!this.gameState.isNotCharacter(t))return e;const a=l(h(t,this.gamePlay.boardSize),i);return e.length>a?{length:a,position:t}:e}),{length:9999,position:9999});c.includes(s.position)?this.onCellClick(s.position):this.onCellClick(n.position)}async onCellClick(e){if(!this.gameState.gameOver){if(this.deselectAllCells(),this.gameState.isFriendlyCharacter(e))return this.characterSelection(e);await this.attackLogic(e),this.movementLogic(e),this.gamePlay.deselectCell(e),this.gamePlay.redrawPositions(this.gameState.characters),this.gameState.move?this.gameState.selectedCharacter&&p.showError("Некорректный ход!"):this.aiLogic()}}onCellEnter(e){const t=this.gameState.getCharacterByPosition(e);if(t){const{level:a,attack:s,defence:i,health:r}=t.character,c=`🎖${a} ⚔${s} 🛡${i} ❤${r}`;this.gamePlay.showCellTooltip(c,e)}this.gamePlay.boardEl&&(this.gameState.isFriendlyCharacter(e)?this.gamePlay.setCursor(L):this.gamePlay.setCursor(E),this.cellSelection(e))}onCellLeave(e){if(!this.gameState.selectedCharacter)return;const{subject:t}=this.gameState.selectedCharacter;t.position!==e&&this.gamePlay.deselectCell(e)}onNewGameClick(){this.gameState.clearAll(),this.init()}onSaveGameClick(){this.stateService.save(this.gameState)}onLoadGameClick(){this.init(this.stateService.load())}}(P,M);O.init()})();