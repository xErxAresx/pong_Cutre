class Bootloader extends Phaser.Scene {
    constructor() {
        super({ key: "Bootloader" });
    }
    preload() {

        this.load.on("complete", () => {
            this.scene.start("Scene_play");
        });


        this.load.image("ball", "./assets/ball.png");
        this.load.image("izquierda", "./assets/left_pallete.png");
        this.load.image("derecha", "./assets/right_pallete.png");
        this.load.image("separador", "./assets/separator.png");
        this.load.image('arial', './assets/arial.png');
        this.load.image('fondo', './assets/fondo.jpeg')

        this.load.json('arial_json', './assets/arial.json');

        this.load.audio('soundGolpe', ['./assets/golpe.wav']);
        this.load.audio('soundGanar', ['./assets/uwin.wav']);
        this.load.audio('soundLose', ['./assets/ulose.wav']);
    }



}

export default Bootloader;