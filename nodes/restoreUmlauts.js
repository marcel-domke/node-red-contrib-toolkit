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

module.exports = function (RED) {
    function restoreUmlauts(config) {
        RED.nodes.createNode(this, config);
        this.on('input', function (msg) {
            if ("payload" in msg) {
                msg.payload = msg.payload
                    .replace(/ae/g, 'ä')
                    .replace(/oe/g, 'ö')
                    .replace(/ue/g, 'ü')
                    .replace(/Ae/g, 'Ä')
                    .replace(/Oe/g, 'Ö')
                    .replace(/Ue/g, 'Ü');
            }
            if ("topic" in msg) {
                msg.topic = msg.topic
                    .replace(/ae/g, 'ä')
                    .replace(/oe/g, 'ö')
                    .replace(/ue/g, 'ü')
                    .replace(/Ae/g, 'Ä')
                    .replace(/Oe/g, 'Ö')
                    .replace(/Ue/g, 'Ü');
            }
            this.send(msg);
        });
    }
    RED.nodes.registerType("restore umlauts", restoreUmlauts);
}