# Simulação de Corrida Mario Kart (Desafio DIO)

Este projeto é uma simulação de uma corrida estilo Mario Kart, desenvolvida como parte do desafio da Digital Innovation One (DIO) do curso de Node.js. O objetivo é simular rodadas de corrida entre dois personagens, com diferentes tipos de blocos na pista e um sistema de pontuação e confronto.

---

## Funcionalidades Implementadas

* **Personagens:** Mario e Luigi com atributos (Velocidade, Manobrabilidade, Poder) e pontuação inicial.
* **Rolagem de Dado:** Função para simular a rolagem de um dado de 1 a 6.
* **Blocos de Pista:** A cada rodada, um bloco aleatório é sorteado:
    * **RETA :** Teste de Velocidade.
    * **CURVA :** Teste de Manobrabilidade.
    * **CONFRONTO :** Teste de Poder.
* **Lógica de Rodadas:** A corrida dura 5 rodadas.
* **Sistema de Pontuação:**
    * Em blocos **RETA** e **CURVA**, o jogador com maior habilidade (dado + atributo) ganha 1 ponto. Em caso de empate, ninguém pontua.
    * Em blocos **CONFRONTO**, os jogadores usam o atributo de Poder.
        * Quem vence o confronto, **ganha 1 ponto extra (TURBO)**.
        * Quem perde o confronto, pega um item aleatório (**CASCO** ou **BOMBA**).
            * **CASCO:** O jogador perde 1 ponto.
            * **BOMBA:** O jogador perde 2 pontos. (Pontos não podem ficar negativos).
* **Resultado Final:** Ao final das 5 rodadas, o sistema declara o vencedor ou um empate.

linkedin: www.linkedin.com/in/richardmoisees
