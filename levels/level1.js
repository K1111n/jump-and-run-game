function createLevel1() {
    const BG = './img/5_background/layers';
    const W = 719;
    const backgrounds = [];
    for (let i = 0; i < 7; i++) {
        const variant = i % 2 === 0 ? '2' : '1';
        backgrounds.push(
            new BackgroundObject(`${BG}/air.png`, W * i - W),
            new BackgroundObject(`${BG}/3_third_layer/${variant}.png`, W * i - W),
            new BackgroundObject(`${BG}/2_second_layer/${variant}.png`, W * i - W),
            new BackgroundObject(`${BG}/1_first_layer/${variant}.png`, W * i - W),
        );
    }

    return new Level(
        [
            new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(),
            new Endboss(),
            new ChickenSmall(), new ChickenSmall(), new ChickenSmall(), new ChickenSmall(), new ChickenSmall(),
        ],
        [new Cloud()],
        backgrounds,
        [new Coin(), new Coin(), new Coin(), new Coin(), new Coin()],
        [
            new Bottles(), new Bottles(), new Bottles(),
            new Bottles(), new Bottles(), new Bottles(),
            new Bottles(), new Bottles(), new Bottles(),
        ]
    );
}

let level1 = createLevel1();
