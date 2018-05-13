export class BrowserSpeechRecognition {
    public static get(): SpeechRecognition {
        let anyWindow = window as any;

        if (anyWindow.hasOwnProperty("SpeechRecognition")) {
            console.log("Speech Recognition: Using browser recognition class SpeechRecognition");
            return new anyWindow.SpeechRecognition();
        } else if (anyWindow.hasOwnProperty("webkitSpeechRecognition")) {
            console.log("Speech Recognition: Using browser recognition class webkitSpeechRecognition");
            return new anyWindow.webkitSpeechRecognition();
        } else {
            return null;
        }
    }
}
