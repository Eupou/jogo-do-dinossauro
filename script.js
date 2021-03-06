/*
const nada mais é que uma constante, isso significa que ela 
não pode ser sobreescrita por exemplo eu mão posso fazr isso

const exemplo = document.queryselector('.exeplo');

exemplo = 1  proibido não pode ser feito

se fosse um let ao inves de uma const poderia ser feito
*/

/*
cosole.log();
serve para printar alguma coisa no console possívelmente uma 
variável
*/

const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let position = 0;
let gameOver = false;

function handleKeyDown(event){
    if (event.keyCode === 32){
        if (!isJumping){
            jump();
        }
    }
}

function jump(){

    isJumping = true;

    let upInterval = setInterval(() => {
          if (position >= 150){
              clearInterval(upInterval);

              //descendo
              let downInterval = setInterval(() =>{
                  if (position <= 0){
                      clearInterval(downInterval);
                      isJumping = false;
                  } else{
                    position -= 20;
                    dino.style.bottom = position + 'px';
                    }
              }, 20)
          } else{
        //subindo
        position += 20;
        dino.style.bottom = position + 'px';
        }
}, 20);
}

var contador = { "moedas":0 }

let pontoAtual;

function atualizaPontuacao(valor){
    var pontuacao = document.getElementById('pontuacao-atual');

    contador.moedas += valor;

    pontuacao.innerText = contador.moedas;
}

function aumentaPonto(){
    let randomTime = Math.random() * 500;

    
    if (gameOver === false){
      atualizaPontuacao(1);
      pontoAtual += 1;
    }else
    {
        atualizaPontuacao(0);
    }

    setTimeout(aumentaPonto, randomTime);
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';

    background.appendChild(cactus);

    let leftIntetval = setInterval(() =>{
        if (cactusPosition < -60){
            clearInterval(leftIntetval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
            //game over
            gameOver = true
            clearInterval(leftIntetval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>'
        }else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px'; 
        }
    }, 20)

    setTimeout(createCactus, randomTime);
}

aumentaPonto();
createCactus();
document.addEventListener('keydown', handleKeyDown);
