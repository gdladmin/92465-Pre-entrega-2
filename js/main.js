// JUEGO DE BLACKJACK - PRE-ENTREGA 2

let jugarBlackJack = window.confirm("¿Quieres jugar BlackJack?");
let saldo = 100000; // Saldo inicial que se reinicia al salir o iniciar de cero

while (jugarBlackJack) {
  // Valida  si el jugador se quedó sin saldo
  if (saldo <= 0) {
    alert("Te has quedado sin saldo. Fin del juego.");
    break;
  }

// si cancela apuesta = 0 
  let apuesta = parseInt(prompt("Tu saldo actual es: $" + saldo + "\n¿Cuánto dinero apuestas?")) || 0;


  // Valida la apuesta
  if (isNaN(apuesta) || apuesta <= 0 || apuesta > saldo) {
    alert("Apuesta inválida. Debes ingresar un número mayor a 0 y menor o igual a tu saldo actual.");
    continue; // Vuelve a empezar el ciclo para pedir la apuesta bien
  }
  // *****************************************************************************************
  // INICIO: Se reparten dos cartas al jugador y al dealer (del 1 al 10)
  // *****************************************************************************************

  let jugadorCarta1 = Math.floor(Math.random() * 10) + 1;
  let jugadorCarta2 = Math.floor(Math.random() * 10) + 1;
  let puntosJugador = jugadorCarta1 + jugadorCarta2;

  let dealerCarta1 = Math.floor(Math.random() * 10) + 1;
  let dealerCarta2 = Math.floor(Math.random() * 10) + 1;
  let puntosDealer = dealerCarta1 + dealerCarta2;

  // Muestra inicio de partida
  // NOTA: no se implementa logica del AS (que valga 1 o 11) , para no complicar el codigo. 
  alert("Apuesta en juego: $" + apuesta + "\n\n" +
    "Tus cartas: " + puntosJugador + " (" + jugadorCarta1 + " y " + jugadorCarta2 + ")\n" +
    "Primera carta del Dealer: " + dealerCarta1
  );

  // *****************************************************************************************
  // INICIA TURNO JUGADOR 
  // ***************************************************************************************** 
  
  let turnoJugador = true;
  let mensajeTurno = "Tus puntos actuales: " + puntosJugador;
  let mensajeResultado = ""; 

  while (turnoJugador && puntosJugador < 21) {
    let pedirCarta = window.confirm(
      mensajeTurno +
      "\n\n¿Quieres otra carta?\n• Pulsa 'Aceptar' para PEDIR.\n• Pulsa 'Cancelar' para PLANTARSE."
    );

    if (pedirCarta) {
      let nuevaCarta = Math.floor(Math.random() * 10) + 1;
      puntosJugador = puntosJugador + nuevaCarta;

      if (puntosJugador > 21) {
        saldo -= apuesta; 
        mensajeResultado = "Te salió un " + nuevaCarta + ".\nTe pasaste de 21 !!! Perdiste esta mano.\nPerdiste: $" + apuesta;
        alert(mensajeResultado);
        turnoJugador = false;
      } else {
        mensajeTurno = "Te salió un " + nuevaCarta + "!\nTus puntos actualizados: " + puntosJugador;
      }
    } else { // no puso aceptar 
      turnoJugador = false;
    }
  }

  // *****************************************************************************************
  // INICIA TURNO DEALER  
  // ***************************************************************************************** 
  
  // El dealer solo juega si el jugador NO se pasó de 21
  if (puntosJugador <= 21) {
    alert("Turno del Dealer.\nSu segunda carta es: (" + dealerCarta2 + "). Puntos totales: " + puntosDealer);

    // Bucle del dealer: si tiene menos de 17, está obligado a seguir pidiendo
    while (puntosDealer < 17) {
      let cartaExtraDealer = Math.floor(Math.random() * 10) + 1;
      puntosDealer = puntosDealer + cartaExtraDealer;
      alert("El dealer pide carta y le sale un " +
          cartaExtraDealer +
          ". Puntos actuales del dealer: " +
          puntosDealer
      );
    }
// *****************************************************************************************
  // SE DETERMINA EL GANADOR   
  // ***************************************************************************************** 
     
    if (puntosDealer > 21) {
      saldo += apuesta;
      mensajeResultado = "La banca se pasa, !!!!! GANASTE !!!! \nGanaste: $" + apuesta;
    } else if (puntosJugador > puntosDealer) {
      saldo += apuesta;
      mensajeResultado = "!!! Ganaste la mano!!! \nGanaste: $" + apuesta;
    } else if (puntosJugador < puntosDealer) {
      saldo -= apuesta;
      mensajeResultado = "Perdiste esta mano.\nPerdiste: $" + apuesta;
    } else {
      mensajeResultado = " **** EMPATE ***** Recuperas tu apuesta.";
    }
  }
 
  // Alerta final con el resumen de la partida
  alert(mensajeResultado + "\nTus puntos: " + puntosJugador + " | Puntos del dealer: " + puntosDealer + "\nSaldo actual: $" + saldo);

  // Pregunta si desea iniciar otra partida
  if (saldo > 0) {
    jugarBlackJack = window.confirm("¿Quieres otra partida?");
  } else {
    jugarBlackJack = false;
  }
}

alert("¡Gracias por jugar al Blackjack! Tu saldo final fue de: $" + saldo);
