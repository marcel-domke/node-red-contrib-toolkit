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
    function BlacklistNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var filters = config.filters.split(',').map(s => s.trim()).filter(Boolean);
        var filterPayload = config.filterPayload;
        var filterTopic = config.filterTopic;

        node.on('input', function(msg) {
            var shouldBlock = false;

            if (filters.length > 0) {
                if (filterPayload && typeof msg.payload === 'string') {
                    shouldBlock = filters.some(filter => msg.payload.includes(filter));
                }

                if (filterTopic && typeof msg.topic === 'string') {
                    shouldBlock = shouldBlock || filters.some(filter => msg.topic.includes(filter));
                }
            }

            if (!shouldBlock) {
                node.send(msg);
            }
        });
    }

    RED.nodes.registerType("blacklist", BlacklistNode);
}