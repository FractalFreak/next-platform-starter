export class AudioPlayer {
    static initialize(src) {
        this.audio = new Audio(src);
        this.audio.loop = true;
    }

    static play() {
        this.audio.play();
    }

    static pause() {
        this.audio.pause();
    }
}
