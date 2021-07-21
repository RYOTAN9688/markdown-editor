declare module "worker-loader!*" {
    class WebpackWorler extends Worker {
        constructor();
    }

    export default WebpackWorler;
}