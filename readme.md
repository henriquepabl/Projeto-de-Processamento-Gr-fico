# Projeto de Computação Gráfica — Sinuca 3D

Projeto desenvolvido utilizando TypeScript e Three.js para criação de uma cena 3D interativa representando uma mesa de sinuca com taco, bolas, iluminação, texturas, shaders customizados e múltiplas câmeras.

---

# Tecnologias Utilizadas

- TypeScript
- Three.js
- GLSL (Shaders)
- Vite

---

# Especificações Atendidas

## Objetos 3D

Foram implementadas 3 classes de objetos:

- Bola
- Mesa
- Taco

A partir dessas classes, foram posicionados um total de 18 objetos 3D independentes na cena, sendo eles:

- 1 Mesa
- 1 Taco
- 1 Bola branca
- 15 bolas coloridas

## Shader próprio

O taco de sinuca utiliza um shader customizado desenvolvido em GLSL, implementado através de:

- Vertex Shader
- Fragment Shader

## Duas câmeras

O sistema possui duas câmeras:

- Uma em visão em perspectiva angular da mesa.
- Uma em visão tática superior da mesa.

O usuário pode alternar entre elas em tempo real.

## Movimento de objeto

Foi implementado movimento de dois objetos na cena:

- Taco
- Bola branca

Os movimentos foram implementados para simular a tacada inicial de uma partida de sinuca. Para isso foi implementado um detector de colisão.

## Textura

Foi incluída uma textura na mesa de sinuca para trazer a aparência tradicional da mesa, com as marcações, tecido, bordas e caçapas visíveis.

---

# Controles

Foram implementados os seguintes controles para interagir com a cena:

| Tecla | Ação |
|---|---|
| `SPACE` | Realiza a tacada |
| `C` | Alterna entre as câmeras |
| `R` | Reinicia a cena |

Dentro da cena, no canto superior direito, é possível ver um guia dos controles também.

---

# Execução do Projeto

## Clonagem do repositório

```bash
git clone git@github.com:henriquepabl/Projeto-de-Processamento-Gr-fico.git
```

Para clonar utilizando SSH, por exemplo.

## Entrar no diretório correto

Estando no diretório do repositório clonado, é necessário realizar:

```bash
cd sinuca-3d/
```

## Instalar dependências

```bash
npm install
```

## Executar ambiente de desenvolvimento

```bash
npm run dev
```

---

# Resultado

O projeto demonstra conceitos fundamentais de Computação Gráfica e desenvolvimento 3D em tempo real utilizando Three.js, incluindo:

- modelagem procedural
- shaders customizados
- texturização
- iluminação
- múltiplas câmeras
- animação
- interação via teclado
- colisão simples
- renderização em tempo real