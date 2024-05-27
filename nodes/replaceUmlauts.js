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
    function replaceUmlauts(config) {
        RED.nodes.createNode(this, config);
        this.on('input', function (msg) {
            if ("payload" in msg) {
                msg.payload = msg.payload
                    .replace(/ä/g, 'ae')
                    .replace(/ö/g, 'oe')
                    .replace(/ü/g, 'ue')
                    .replace(/Ä/g, 'Ae')
                    .replace(/Ö/g, 'Oe')
                    .replace(/Ü/g, 'Ue');
            }
            if ("topic" in msg) {
                msg.topic = msg.topic
                    .replace(/ä/g, 'ae')
                    .replace(/ö/g, 'oe')
                    .replace(/ü/g, 'ue')
                    .replace(/Ä/g, 'Ae')
                    .replace(/Ö/g, 'Oe')
                    .replace(/Ü/g, 'Ue');
            }
            this.send(msg);
        });
    }
    RED.nodes.registerType("replace umlauts", replaceUmlauts);
}