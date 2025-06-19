const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }
    
    return result; 
}

async function drawRandomItem() {
    let random = Math.random();
    if (random < 0.5) { 
        return "CASCO";
    } else { 
        return "BOMBA";
    }
}

async function logRollResult(characterName, blockType, diceResult, attributeValue, totalSkill) {
    console.log(`${characterName} rolou um dado de ${blockType} ${diceResult} + ${attributeValue} = ${totalSkill}`);
}

async function playRaceEngine(character1, character2) {
 
    console.log(`Corrida entre ${player1.NOME} e ${player2.NOME} começando..\n`);

    for (let round = 1; round <= 5; round++) {
        console.log(`--- Rodada ${round} ---`);

        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") { 
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE, totalTestSkill1);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE, totalTestSkill2);
        }
        if (block === "CURVA") { 
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE; 
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE; 
            
            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE, totalTestSkill1);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE, totalTestSkill2);
        }
        if (block === "CONFRONTO") { 
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;
        
            console.log(`${character1.NOME} confrontou com ${character2.NOME}!`);

            await logRollResult(
                character1.NOME,
                "poder",
                diceResult1,
                character1.PODER,
                powerResult1 
            );
            await logRollResult(
                character2.NOME,
                "poder",
                diceResult2,
                character2.PODER,
                powerResult2 
            );

            if (powerResult1 > powerResult2){
                console.log (`${character1.NOME} venceu o confronto!`);
                
                console.log(`${character1.NOME} ganhou um TURBO! (+1 ponto)`);
                character1.PONTOS++; 

                let item = await drawRandomItem(); 
                console.log(`${character2.NOME} pegou um item: ${item}!`);
                if (item === "CASCO") {
                    console.log(`${character2.NOME} perdeu 1 ponto!`);
                    character2.PONTOS = Math.max(0, character2.PONTOS - 1); 
                } else { 
                    console.log(`${character2.NOME} perdeu 2 pontos!`);
                    character2.PONTOS = Math.max(0, character2.PONTOS - 2); 
                }
            } else if (powerResult2 > powerResult1){
                console.log (`${character2.NOME} venceu o confronto!`);
                
                console.log(`${character2.NOME} ganhou um TURBO! (+1 ponto)`);
                character2.PONTOS++;
                let item = await drawRandomItem(); 
                console.log(`${character1.NOME} pegou um item: ${item}!`);
                if (item === "CASCO") {
                    console.log(`${character1.NOME} perdeu 1 ponto!`);
                    character1.PONTOS = Math.max(0, character1.PONTOS - 1);
                } else { 
                    console.log(`${character1.NOME} perdeu 2 pontos!`);
                    character1.PONTOS = Math.max(0, character1.PONTOS - 2);
                }
            } else { 
                console.log ("Confronto empatado! Ninguém ganha turbo ou perde pontos.");
            }
        }

        if (block === "RETA" || block === "CURVA") {
            if (totalTestSkill1 > totalTestSkill2){
                console.log(`${character1.NOME} venceu a rodada! ${character1.NOME} ganhou 1 ponto!`);
                character1.PONTOS++;
            } else if(totalTestSkill2 > totalTestSkill1){
                console.log(`${character2.NOME} venceu a rodada! ${character2.NOME} ganhou 1 ponto!`);
                character2.PONTOS++;
            } else { 
                console.log("A rodada terminou em empate!");
            } 
        }

        console.log ("-------------------------")
    }

}

async function declareWinner(character1, character2) {
    console.log ("--- Resultado Final ---")
    console.log (`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log (`${character2.NOME}: ${character2.PONTOS} ponto(s)`)

    if (character1.PONTOS > character2.PONTOS){
        console.log(`\n${character1.NOME} venceu a corrida! Parabéns!`);      
    }else if (character2.PONTOS > character1.PONTOS){
        console.log(`\n${character2.NOME} venceu a corrida! Parabéns!`);  
    }else{
        console.log("A corrida terminou em empate!")
    }
    
}

(async function main() {
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();