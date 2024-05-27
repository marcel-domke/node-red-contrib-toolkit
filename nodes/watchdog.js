/*
Copyright 2024 Marcel Domke

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

module.exports = function(RED) {
    function WatchdogNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var timeout = null;
        var previousState = false;

        function resetTimeout() {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                if (previousState !== false) {
                    previousState = false;
                    node.status({ fill: "red", shape: "ring", text: "Timeout" });
                    node.send({ payload: false });
                }
            }, config.timeout * 1000);
        }

        node.on('input', function(msg) {
            if (msg.payload === true || msg.payload.online === true) {
                resetTimeout();
                if (previousState !== true) {
                    previousState = true;
                    node.status({ fill: "green", shape: "dot", text: "Active" });
                    node.send({ payload: true });
                }
            }
        });

        resetTimeout();

        node.on('close', function() {
            clearTimeout(timeout);
        });
    }

    RED.nodes.registerType("watchdog", WatchdogNode);
}