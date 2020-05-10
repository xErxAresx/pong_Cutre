import Palas from '../gameObjects/palas.js';
import Marcador from '../gameObjects/marcador.js';

class Scene_play extends Phaser.Scene {
    constructor() {
        super({ key: "Scene_play" });
    }

    create() {

        let center_width = this.sys.game.config.width / 2;
        let center_height = this.sys.game.config.height / 2;

        //Fondo
        this.add.image(center_width, center_height, "fondo");

        //Separador
        this.add.image(center_width, center_height, "separador");

        //Jugadores
        this.izquierda = new Palas(this, 30, center_height, "izquierda");
        this.derecha = new Palas(this, (center_width * 2) - 30, center_height, "derecha");

        //Bola
        this.physics.world.setBoundsCollision(true, true, true, true);
        this.ball = this.physics.add.image(center_width, center_height, "ball");
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        this.ball.setVelocityX(-180);

        //Fisicas
        this.physics.add.collider(this.ball, this.izquierda, this.chocaPala, null, this);
        this.physics.add.collider(this.ball, this.derecha, this.chocaPala, null, this);

        //Controles
        //Pala derecha
        // this.cursor = this.input.keyboard.createCursorKeys();

        //Pala izquierda
        this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursor_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursor_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //Variables para contar
        this.numRonda = 0;
        this.jugador = 0;
        this.iaBot = 0;

        //Variable booleano para finalizar partida
        this.partida = true;

        //Variable para guardar quien ha ganado
        this.resultat = "";

        //Marcadors
        this.valor = 0;
        let config = this.cache.json.get('arial_json');
        this.cache.bitmapFont.add('arial', Phaser.GameObjects.RetroFont.Parse(this, config));
        this.texto = this.add.bitmapText(10, 10, 'arial', 'VALOR ');

        let config = this.cache.json.get("mapTextFonts_json");
        this.cache.bitmapFont.add("mapTextFonts", Phaser.GameObjects.RetroFont.Parse(this, config));
        this.textojugador = this.add.bitmapText(cc_width_left, 10, "mapTextFonts", 'YOU: 0');
        this.textoiaBot = this.add.bitmapText(cc_width_right, 10, "mapTextFonts", 'BOT: 0').setTint(0xff0000);
        this.guanyador = this.add.bitmapText(center_width - 60, center_height - 50, "mapTextFonts", '');


    }

    update() {


        this.textojugador.text = 'TU ' + this.jugador;
        this.textoiaBot.text = 'IA  ' + this.iaBot;
        this.guanyador.text = this.resultat;

        if (this.ball.x < 5 || this.ball.x > this.sys.game.config.width - 5) {
            this.ball.setPosition(this.sys.game.config.width / 2, this.sys.game.config.height / 2);
        }

        if (this.partida) {
            //Funció per la IA
            this.IABot(60);

            //Control de la pala dreta
            this.palaJugador();

            //Comprovara la puntuació
            this.comprovarGunyador();

            //Comprovar ronda i afegir punts
            this.puntoTenis();

            //Aixo comprova que el bot no es pugui passar del mitg del camp
            if (this.bat.x <= (this.sys.game.config.width / 2) + this.bat.width / 2) {
                this.bat.body.setVelocityY(0);
            }

        }

        //Control de las palas
        //Pala derecha
        /*   if (this.cursor.down.isDown) {
               this.derecha.body.setVelocityY(300);
           } else if (this.cursor.up.isDown) {
               this.derecha.body.setVelocityY(-300);
           } else if (this.cursor.left.isDown) {
               if (this.derecha.x >= (this.sys.game.config.width / 2) + 20 && this.derecha.x < this.sys.game.config.width) {
                   this.derecha.body.setVelocityX(-300);
               } else {
                   this.derecha.body.setVelocityX(0);
               }
           } else if (this.cursor.right.isDown) {
               this.derecha.body.setVelocityX(300);
           } else {
               this.derecha.body.setVelocity(0);
           }*/

        //Pala izquierda
        /* if (this.cursor_S.isDown) {
             this.izquierda.body.setVelocityY(300);
         } else if (this.cursor_W.isDown) {
             this.izquierda.body.setVelocityY(-300);
         } else if (this.cursor_A.isDown) {
             this.izquierda.body.setVelocityX(-300);

         } else if (this.cursor_D.isDown) {
             if (this.izquierda.x <= (this.sys.game.config.width / 2) - (this.izquierda.width) * 2) {
                 this.izquierda.body.setVelocityX(300);
             } else {
                 this.izquierda.body.setVelocityX(0);
             }
         } else {
             this.izquierda.body.setVelocityY(0);
             this.izquierda.body.setVelocityX(0);
         }*/
    }

    chocaPala() {
        this.sound.play('soundGolpe');
        this.ball.setVelocityY(Phaser.Math.Between(-120, 120));
    }

    palaJugador() {
        // Pala izquierda
        if (this.cursor_S.isDown) {
            this.sanatizer.body.setVelocityY(300);
        } else if (this.cursor_W.isDown) {
            this.sanatizer.body.setVelocityY(-300);
        } else if (this.cursor_A.isDown) {
            this.sanatizer.body.setVelocityX(-300);
        } else if (this.cursor_D.isDown) {
            if (this.sanatizer.x < ((this.sys.game.config.width / 2) - this.sanatizer.width / 2) - 5) {
                this.sanatizer.body.setVelocityX(300);
            } else {
                this.sanatizer.body.setVelocityX(0);
            }
        } else {
            this.sanatizer.body.setVelocityX(0);
            this.sanatizer.body.setVelocityY(0);
        }
    }

    IABot(vel) {
        // Pala derecha = IA
        this.bat.body.velocity.setTo(this.ball.body.velocity.y);
        this.bat.body.maxVelocity.y = vel;
    }

    puntoTenis() {
        //Comprovem la posicio de la pilota i depenent del resultat fem una cosa un altre
        if (this.ball.x < 15 || this.ball.x > this.sys.game.config.width - 15) {
            if (this.ball.x < 15) {
                this.ball.setVelocityY(0);
                this.ball.setVelocityX(180);
                //Si el bot fa un punt
                this.bot++;
                this.numRonda++;
            } else if (this.ball.x > this.sys.game.config.width - 15) {
                this.ball.setVelocityY(0);
                this.ball.setVelocityX(-180);
                //Si el jugador fa un punt
                this.jugador++;
                this.numRonda++;

            }
            //Tornem a posar les pales al lloc original i la pilota també
            this.ball.setPosition(this.sys.game.config.width / 2, this.sys.game.config.height / 2);
            this.sanatizer.setPosition(30, this.sys.game.config.height / 2);
            this.bat.setPosition(this.sys.game.config.width - 30, this.sys.game.config.height / 2);
        }
    }


    comprovarGunyador() {
        //Si el comptador arriba a 6 mirem qui es el gunyador i parem el joc
        if (this.numRonda == 6) {
            this.ball.setVelocityY(0);
            this.ball.setVelocityX(0);
            this.sanatizer.body.setVelocityX(0);
            this.sanatizer.body.setVelocityY(0);
            this.bat.body.setVelocityX(0);
            this.bat.body.setVelocityY(0);

            if (this.iaBot > this.jugador) {
                this.sound.play('soundLose');
                this.resultat = 'YOU LOSE';
            } else if (this.iaBot < this.jugador) {
                this.sound.play('soundWin');
                this.resultat = 'YOU WIN';
            } else {
                this.resultat = 'TIE';
            }

            this.partida = false;
        }
    }
}

export default Scene_play;