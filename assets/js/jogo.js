// Repositório do Professor
// https://www.dropbox.com/s/17010wb608q4olu/JogosHTML5.zip?dl=0&file_subpath=%2FJogosHTML5%2Fjogo1%2Fjs

// Inicio da função
function start() { 

	$("#inicio").hide();

	// Carregamento de Telas
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='inimigo3' class='anima2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
	$("#fundoGame").append("<div id='placar'></div>");
	$("#fundoGame").append("<div id='energia'></div>");

	// Carregamento de Audios
	var somDisparo = document.getElementById("somDisparo");
	var somExplosao = document.getElementById("somExplosao");
	var musica = document.getElementById("musica");
	var somGameover = document.getElementById("somGameover");
	var somPerdido = document.getElementById("somPerdido");
	var somResgate = document.getElementById("somResgate");

	//Música em loop
	musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
	musica.play();

	// --------------------------------------------------
	// Principais variáveis do jogo
	var podeAtirar = true;
	var fimdejogo = false;
	var pontos = 0;
	var salvos = 0;
	var perdidos = 0;
	var energiaAtual = 3;
	var jogo = {}

	// Movimento Helicoptero Inimigo
	var velocidade = 5;
	var posicaoY = parseInt(Math.random() * 334);

	// Variaveis de movimento Helicoptero Amigo
	var TECLA = { W: 87, S: 83, D: 68, SPACE: 32 }
	
	jogo.pressionou = [];

	//Verifica se o usuário pressionou alguma tecla	
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
	});

	$(document).keyup(function(e){
		jogo.pressionou[e.which] = false;
	});

	//Game Loop
	jogo.timer = setInterval(loop,30);	
	function loop() {
		movefundo();
		movejogador();
		moveinimigo1();
		moveinimigo2();
		moveinimigo3();
		moveamigo();
		colisao();
		placar();
		energia();
	} // Fim da função
	
	// --------------------------------------------------
	//Função que movimenta o fundo do jogo
	function movefundo() {
		esquerda = parseInt($("#fundoGame").css("background-position"));
		$("#fundoGame").css("background-position",esquerda-2);
	} // fim da função

	function movejogador() {
	
		if (jogo.pressionou[TECLA.W]) {
			var topo = parseInt($("#jogador").css("top"));

			// Limite de Colisão com o Topo
			if (topo>15) {
				$("#jogador").css("top",topo-10);
			}
		}
		
		if (jogo.pressionou[TECLA.S]) {
			var topo = parseInt($("#jogador").css("top"));
			
			// Limite de Colisão com o solo
			if (topo<434) {	
				$("#jogador").css("top",topo+10);		
			}

		}
		
		if (jogo.pressionou[TECLA.SPACE]) {
			//Chama função Disparo	
			disparo();
		}
	
	} // fim da função movejogador()

	function moveinimigo1(idObjeto = 'inimigo1') {
		// Carrega Objeto Aereo
		let objeto = $("#" + idObjeto)
		posicaoX = parseInt( objeto.css("left") );

		// Movimenta helicoptero inimigo para esquerda
		objeto.css("left", posicaoX - velocidade);
			
		if (posicaoX <= -250) {
			posicaoY = parseInt(Math.random() * 334);
			objeto.css("left", 1900);
			objeto.css("top", posicaoY);
		}
	} //Fim da função moveinimigo1()

	function moveinimigo2(idObjeto = 'inimigo2') {
		// Carrega Objeto Terrestre
		let objeto = $("#" + idObjeto)
		posicaoX = parseInt( objeto.css("left") );
		
		// Movimenta veículo inimigo para esquerda
		objeto.css("left", posicaoX - 3);
				
		if (posicaoX <= -160) {
			objeto.css("left", 1900);
		}
	} // Fim da função moveinimigo2()

	function moveinimigo3(idObjeto = 'inimigo3') {
		console.log('Aqui');
		// Carrega Objeto Terrestre
		let objeto = $("#" + idObjeto)		
		posicaoX = parseInt( objeto.css("left") );

		// Movimenta helicoptero inimigo para esquerda
		objeto.css("left", posicaoX - (velocidade*1.3));
			
		if (posicaoX <= -250) {
			posicaoY = parseInt(Math.random() * 334);
			objeto.css("left", 2300);
			objeto.css("top", posicaoY);
		}
	} //Fim da função moveinimigo1()

	// Movimenta amigo para direita
	function moveamigo(idAmigo = "amigo") {
		posicaoX = parseInt($("#" + idAmigo).css("left"));

		$("#" + idAmigo).css("left", posicaoX + 1);
					
		if ( posicaoX > 906 ) {
			$("#" + idAmigo).css("left",0);
		}
	} // fim da função moveamigo()

	function disparo() {
	
		if (podeAtirar == true) {
			
			somDisparo.play();
			podeAtirar = false;
			
			topo = parseInt($("#jogador").css("top"))
			posicaoX = parseInt($("#jogador").css("left"))
			tiroX = posicaoX + 185;
			topoTiro = topo + 51;
			$("#fundoGame").append("<div id='disparo'></div");
			$("#disparo").css("top",topoTiro);
			$("#disparo").css("left",tiroX);
			
			var tempoDisparo = window.setInterval(executaDisparo, 30);
		
		} //Fecha podeAtirar
	 
		function executaDisparo() {
			posicaoX = parseInt($("#disparo").css("left"));
			$("#disparo").css("left", posicaoX + 15); 
	
			if (posicaoX > 900) {
				window.clearInterval(tempoDisparo);
				tempoDisparo = null;
				$("#disparo").remove();
				podeAtirar = true;
			}
		} // Fecha executaDisparo()
	} // Fecha disparo()

	function colisao() {
		// Colisão entre Jogador e Helicoptero (Inimigo1)
		var colisao1 = ($("#jogador").collision($("#inimigo1")));
		var colisao2 = ($("#jogador").collision($("#inimigo2")));
		var colisao3 = ($("#disparo").collision($("#inimigo1")));
		var colisao4 = ($("#disparo").collision($("#inimigo2")));
		var colisao5 = ($("#jogador").collision($("#amigo")));
		var colisao6 = ($("#inimigo2").collision($("#amigo")));
		var colisao7 = ($("#jogador").collision($("#inimigo3")));
		var colisao8 = ($("#disparo").collision($("#inimigo3")));
		
		// Jogador com o inimigo 1 - Helicoptero
		if (colisao1.length > 0) {
			
			energiaAtual--;
			explosaoInimigos("inimigo1");
			reposicionaInimigoAereo("inimigo1");

		}

		// Jogador com o inimigo 2 - Carro
		if (colisao2.length>0) {
			
			energiaAtual--;
			explosaoInimigos("inimigo2");
			reposicionaInimigoTerrestre("inimigo2");
			
		}
		
		// Jogador com o inimigo 3 - Helicoptero 2
		if (colisao7.length > 0) {
			
			energiaAtual--;
			explosaoInimigos("inimigo3");
			reposicionaInimigoAereo("inimigo3", 2300);

		}

		// Disparo com o inimigo 1
		if (colisao3.length > 0) {
				
			pontos = pontos + 100;
			velocidade = velocidade + 0.3;
			$("#disparo").css("left",950);

			explosaoInimigos("inimigo1");
			reposicionaInimigoAereo("inimigo1", 1950);
			
		}

		// Disparo com o inimigo 2
		if (colisao4.length > 0) {
			
			pontos = pontos + 50;
			$("#disparo").css("left",950);

			explosaoInimigos("inimigo2");
			reposicionaInimigoTerrestre("inimigo2");			
				
		}

		// Disparo com o inimigo 3
		if (colisao8.length > 0) {
		
			pontos = pontos + 100;
			velocidade = velocidade + 0.5;
			$("#disparo").css("left",950);

			explosaoInimigos("inimigo3");
			reposicionaInimigoAereo("inimigo3", 2300);
			
		}
		
		// jogador com o amigo
		if (colisao5.length>0) {
			salvos++;
			somResgate.play();
			$("#amigo").remove()
			reposicionaAmigo("amigo");
		}

		// Inimigo 2 com o amigo
		if (colisao6.length>0) {
			perdidos++;
			explosaoAtropelamento('amigo');
			reposicionaAmigo('amigo');
		}

	} //Fim da função colisao()
	
	// Explosão Inimigos
	function explosaoInimigos(idInimigo) {
		// Recupera Posição
		let objAereo = $("#" + idInimigo);
		let inimigo1X = parseInt( objAereo.css("left") );
		let inimigo1Y = parseInt( objAereo.css("top"));
		objAereo.remove();

		// Aciona Explosão
		somExplosao.play();
		let id = "explosaoI" + String( parseInt(Math.random() * 10002222) );
		$("#fundoGame").append("<div id='" + id + "' class='explosaoInimigos'></div");
		let explosao = $("#"+id)
		explosao.css("background-image", "url(assets/imgs/explosao.png)");
		explosao.css("top", inimigo1Y);
		explosao.css("left", inimigo1X);
		// Expande o tamanho da div até 200 e reduz a opacidade até 0, com efeito slow
		explosao.animate({width:200, opacity:0}, "slow");
		
		let tempoExplosao = window.setInterval(removeExplosao, 1000);
		function removeExplosao() {
			explosao.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao = null;
		}
		
	} // Fim da função explosaoAerea()	

	// Explosão Atropelamento
	function explosaoAtropelamento(idAmigo) {
		// Recupera Posição
		let objAmigo = $("#" + idAmigo);
		let amigoX = parseInt( objAmigo.css("left") );
		let amigoY = parseInt( objAmigo.css("top") );
		objAmigo.remove();
		console.log(amigoX,amigoY)

		// Aciona Explosão	
		somPerdido.play();
		let id = "explosaoAt" + String( parseInt(Math.random() * 1000) );
		$("#fundoGame").append("<div id='" + id + "' class='anima4 explosaoAtropelamento'></div");
		let explosao = $("#" + id);
		explosao.css("left", amigoX);
		explosao.css("top", amigoY);

		let tempoExplosao = window.setInterval(removeExplosao, 1000);
		function removeExplosao() {
			explosao.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao = null;
		}
	} // Fim da função explosaoAtropelamento()

	// Reposiciona Inimigo Aereo
	function reposicionaInimigoAereo(idInimigo, posicaoX = 1900, time = 3000) {
	
		var tempoColisaoIni1 = window.setInterval(reposicionaIni1, 3000);
			
		function reposicionaIni1() {

			window.clearInterval(tempoColisaoIni1);
			tempoColisaoIni1 = null;
			
			if ( fimdejogo == false ) {

				$("#fundoGame").append("<div id='" + idInimigo + "' class='anima2'></div>");

				posicaoY = parseInt(Math.random() * 334);
				$("#" + idInimigo).css("left", posicaoX);
				$("#" + idInimigo).css("top", posicaoY);
				// $("#fundoGame").append("<div id='inimigo1'></div");
			}
			
		}	
	}

	// Reposiciona Inimigo Terrestre
	function reposicionaInimigoTerrestre(idInimigo, posicaoX = 1900, time = 4000) {
	
		var tempoColisaoIni2 = window.setInterval(reposicionaIni2, time);
			
		function reposicionaIni2() {

			window.clearInterval(tempoColisaoIni2);
			tempoColisaoIni2 = null;
			
			if ( fimdejogo == false ) {
				$("#fundoGame").append("<div id='" + idInimigo + "'></div");
				$("#" + idInimigo).css("left", posicaoX);				
			}
			
		}	
	}	

	// Reposiciona Amigo
	function reposicionaAmigo(idAmigo = 'amigo') {
	
		$("#" + idAmigo).remove();
		var tempoAmigo = window.setInterval(reposicionaAmi, 6000);
		
		function reposicionaAmi() {
			window.clearInterval(tempoAmigo);
			tempoAmigo = null;
			
			if (fimdejogo == false) {
				$("#fundoGame").append("<div id='" + idAmigo + "' class='anima3'></div>");
			}
		}
		
	} // Fim da função reposicionaAmigo()	

	// CARREGA PLACAR
	function placar() {
	
		$("#placar").html("<h2> Pontos: " + pontos + " - Salvos: " + salvos + " - Perdidos: " + perdidos + "</h2>");
		
	} //fim da função placar()	

	// CARREGA ENERGIA
	function energia() {
	
		if (energiaAtual==3) {
			
			$("#energia").css("background-image", "url(assets/imgs/energia3.png)");
		}
	
		if (energiaAtual==2) {
			
			$("#energia").css("background-image", "url(assets/imgs/energia2.png)");
		}
	
		if (energiaAtual==1) {
			
			$("#energia").css("background-image", "url(assets/imgs/energia1.png)");
		}
	
		if (energiaAtual==0) {
			
			$("#energia").css("background-image", "url(assets/imgs/energia0.png)");
			//Game Over
			gameOver();
		}
	
	} // Fim da função energia()

	//Função GAME OVER
	function gameOver() {
		fimdejogo=true;
		musica.pause();
		somGameover.play();
		
		window.clearInterval(jogo.timer);
		jogo.timer=null;
		
		$("#jogador").remove();
		$("#inimigo1").remove();
		$("#inimigo2").remove();
		$("#inimigo3").remove();
		$("#amigo").remove();
		$("#placar").remove();
		$("#energia").remove();
		
		$("#fundoGame").append("<div id='fim'></div>");
		
		$("#fim").html(
			'<h1> Game Over </h1>' +
			'<p>Sua pontuação foi: ' + pontos + '</p><br>' + 
			'<div id="reinicia" onClick="reiniciaJogo();">' +
			'<h3>Jogar Novamente</h3>'+
			'</div>'
		);

	} // Fim da função gameOver();
	
}

// Reinicia o Jogo
function reiniciaJogo() {
	somGameover.pause();
	$("#fim").remove();
	start();
} //Fim da função reiniciaJogo