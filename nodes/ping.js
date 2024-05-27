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

const { exec } = require('child_process');
const os = require('os');

module.exports = function (RED) {
    function PingNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        // Set initial status to indicate waiting for input
        node.status({ fill: "grey", shape: "dot", text: "Waiting for input" });

        node.on('input', function (msg) {
            const host = config.host || msg.payload;
            if (!host) {
                node.error("No host specified", msg);
                return;
            }

            // Determine the appropriate ping command based on the OS
            const platform = os.platform();
            const command = platform === 'win32' ? `ping -4 -n 1 ${host}` : `ping -c 1 ${host}`;

            // Update status to indicate the ping is in progress
            node.status({ fill: "yellow", shape: "ring", text: "Pinging..." });

            exec(command, (error, stdout, stderr) => {
                if (stderr) {
                    node.error(`Ping stderr: ${stderr}`, msg);
                    node.status({ fill: "red", shape: "ring", text: `Stderr: ${stderr}` });
                    msg.payload = {
                        host: host,
                        online: false,
                        latency: null,
                        response: `Stderr: ${stderr}`
                    };
                    node.send(msg);
                    return;
                }

                // Extract only the relevant response line(s) from the stdout
                const lines = stdout.split('\n');
                let response = lines.find(line => line.includes('bytes from') || line.includes('TTL='));
                if (!response) {
                    response = lines.find(line => line.includes('unreachable') || line.includes('timed out'));
                }

                // Determine if the host is online based on the response
                const online = response ? (response.includes('bytes from') || response.includes('TTL=')) : false;

                // Extract latency time from the response text
                let latency = null;
                const latencyMatch = /(?:[<=]|time=)?(\d+(?:\.\d+)?)\s*ms/.exec(response);
                if (latencyMatch) {
                    latency = parseFloat(latencyMatch[1]);
                }

                // Update status to indicate the result of the ping
                node.status({ fill: online ? "green" : "red", shape: "dot", text: online ? "Online, " + latency + "ms" : "Offline" });

                msg.payload = {
                    host: host,
                    online: online,
                    latency: latency,
                    response: response || "No response"
                };
                node.send(msg);
            });
        });
    }

    RED.nodes.registerType("ping", PingNode);
}