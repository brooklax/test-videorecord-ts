import { Observable } from '@nativescript/core';
import { Mediafilepicker, VideoPickerOptions } from 'nativescript-mediafilepicker';

export class HelloWorldModel extends Observable {
    private _counter: number;
    private _message: string;

    constructor() {
        super();

        // Initialize default values.
        this._counter = 42;
        this.updateMessage();
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        if (this._message !== value) {
            this._message = value;
            this.notifyPropertyChange('message', value);
        }
    }

    onTap() {
        let allowedVideoQualities = [];

        let options: VideoPickerOptions = {
            android: {
                isCaptureMood: true,
                maxDuration: 20,
                videoQuality: 1,
            }
        };

        let mediafilepicker = new Mediafilepicker();
        mediafilepicker.openVideoPicker(options);

        mediafilepicker.on("getFiles", function (res) {
            let results = res.object.get('results');
            console.dir(results);
        });

        mediafilepicker.on("error", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);
        });

        mediafilepicker.on("cancel", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);
        });
    }

    private updateMessage() {
        if (this._counter <= 0) {
            this.message =
                'Hoorraaay! You unlocked the NativeScript clicker achievement!';
        } else {
            this.message = `${this._counter} taps left`;
        }
    }
}
