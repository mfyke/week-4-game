$(document).ready(function(){
	var tracer, genji, bastion, mei, roadhog, zarya, symmetra, zenyatta, shrek;
	var fighters;
	var attacker;
	var defender = [];
	var combatant;
	var fightersRemaining=7;
	function start () {
		$("#win").hide();
		$("#lose").hide();
		$("#sideBar").hide();
		$("#attackerFullHp").hide();
		$("#enemyFullHp").hide();
		$("#attackButton").hide();
		tracer = new createChar("Tracer", 16, 18, 150, "assets/images/tracer.png", "assets/images/tracerattacker.png", "assets/images/tracerenemy.png");
		genji = new createChar("Genji", 12, 16, 200, "assets/images/genji.png", "assets/images/genjiattacker.png", "assets/images/genjienemy.png");
		bastion = new createChar("Bastion", 6, 12, 300, "assets/images/bastion.png", "assets/images/bastionattacker.png", "assets/images/bastionenemy.png");
		mei = new createChar("Mei", 8, 14, 250, "assets/images/mei.png", "assets/images/meiattacker.png", "assets/images/meienemy.png");
		roadhog = new createChar("Roadhog", 3, 6, 600, "assets/images/roadhog.png", "assets/images/roadhogattacker.png", "assets/images/roadhogenemy.png");
		zarya = new createChar("Zarya", 5, 10, 400, "assets/images/zarya.png", "assets/images/zaryaattacker.png", "assets/images/zaryaenemy.png");
		symmetra = new createChar("Symmetra", 7, 13, 275, "assets/images/symmetra.png", "assets/images/symmetraattacker.png", "assets/images/symmetraenemy.png");
		zenyatta = new createChar("Zenyatta", 13, 17, 175, "assets/images/zenyatta.png", "assets/images/zenyattaattacker.png", "assets/images/zenyattaenemy.png");
		fighters = [tracer, genji, bastion, mei, roadhog, zarya, symmetra, zenyatta];
		for (var i = 0;i < fighters.length; i++) {
			var img = $("<img>");
			$(img).addClass("smallPic");
			$(img).attr("src", fighters[i].image);
			$(img).attr("alt", fighters[i].name);
			$(img).appendTo("#charSelect");
			console.log(fighters[i].name);
		}
	}
	start();
	function createChar (name,AP, CAP, HP, image, attackerImage, enemyImage) {
		this.name=name;
		this.baseAP=AP;
		this.AP=AP;
		this.CAP=CAP;
		this.HP=HP;
		this.fullHealth=HP;
		this.image=image;
		this.attackerImage=attackerImage;
		this.enemyImage=enemyImage;
	}
	$(document).on("click", "img", function(){
		console.log(this.alt);
		for (var j = 0; j<fighters.length; j++)	{
			if (fighters[j].name==this.alt){
				shrek=fighters[j];
				$('#charSelect').hide();
				$('#fugginStats').hide();
				$('#instructionsStart').hide();
			}
		}
		if (fighters.indexOf(attacker) > -1 && fighters.indexOf(combatant)==-1 && shrek!=attacker){
			if(shrek.HP > 0){
				combatant=shrek;
				$("#enemyHealth").show();
				$("#hpTextCombatant").html("HP: " + shrek.HP);
				$("#attackButton").show();
				$("#sideBar").hide();
				$("#enemyFullHp").show();
				$("#enemyCurrentHp").css("width", "100%");
				var icon = $("<img>");
					$(icon).addClass("charPic img-rounded");
					$(icon).attr("src", shrek.image);
					$(icon).attr("alt", "");
					$(icon).attr("id", "enemyTopPic");
					$(icon).appendTo("#enemyTop");
				var enemyFighter = $("<img>");
					$(enemyFighter).attr("id","enemyCombatant");
					$(enemyFighter).attr("alt", "");
					$(enemyFighter).attr("src", shrek.enemyImage);
					$(enemyFighter).appendTo("#fightingArea");				
			}
		}
		else if (fighters.indexOf(attacker)==-1){
			attacker=shrek;
			$("#sideBar").show();
			$("#health").show();
			$("#hpTextAttacker").html("HP: " + shrek.HP);
			$("#attackerFullHp").show();
			var icon = $("<img>");
					$(icon).addClass("charPic img-rounded");
					$(icon).attr("src", shrek.image);
					$(icon).attr("alt", "");
					$(icon).attr("id", "attackerTopPic")
					$(icon).appendTo("#attackerTop");
			var enemyFighter = $("<img>");
					$(enemyFighter).attr("alt", "");
					$(enemyFighter).attr("src", shrek.attackerImage);
					$(enemyFighter).appendTo("#fightingArea");
			for (var i= 0; i<fighters.length; i++) {
				if (attacker==fighters[i]) {

				}
				else {
					defender.push(fighters[i]);
					var img = $("<img>");
					$(img).addClass("sidebarPic img-rounded");
					$(img).attr("src", fighters[i].image);
					$(img).attr("alt", fighters[i].name);
					$(img).appendTo("#sideBar");
				}
			}
		}	
	});
	$("#attackButton").on("click", function(){
		combatant.HP-=attacker.AP;
		console.log(attacker.AP);
		console.log(attacker.HP);
		console.log(fightersRemaining);
		if(combatant.HP<1) {
			fightersRemaining--;
			combatant=null;
			$("#sideBar").show();
			$("#enemyTopPic").remove();
			$("#enemyCombatant").remove();
			$("#enemyFullHp").hide();
			$("#attackButton").hide();
			$("#enemyHealth").hide();
			if(fightersRemaining==0) {
			winner();
			}
		}
		attacker.HP-=combatant.CAP;
		attacker.AP+=attacker.baseAP;
		$("#attackerCurrentHp").css("width", attacker.HP/attacker.fullHealth*100 + "%");
		$("#enemyCurrentHp").css("width", combatant.HP/combatant.fullHealth*100 + "%");
		$("#hpTextAttacker").html("HP: " + attacker.HP);
		$("#hpTextCombatant").html("HP: " + combatant.HP);
		if(attacker.HP<1) {
			loser();
		}
	});
	$("#sideBar").on("click","img", function(){
		console.log(this);
		$(this).hide();
	});
	function winner () {
		$("#attackButton").hide();
		$("#top").hide();
		$("#fightingArea").hide();
		$("#sideBar").hide();
		$("#win").show();
	}
	function loser () {
		$("#attackButton").hide();
		$("#top").hide();
		$("#fightingArea").hide();
		$("#sideBar").hide();
		$("#lose").show();
	}
});
