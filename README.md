# Toolkit for Node-RED

This toolkit provides a set of useful nodes for Node-RED to help with various tasks, including network ping checks, message filtering based on whitelists and blacklists, and text transformations.

## Nodes

### Ping

Performs a ping to a specified host and returns whether the host is online along with the latency.

### Blacklist

Filters messages based on a configured blacklist of strings. If a string from the blacklist is found in the payload or topic, the message is blocked.

### Whitelist

Filters messages based on a configured whitelist of strings. Only messages that contain the specified strings in the payload or topic are allowed through.

### Watchdog

Monitors incoming messages and expects a `true` payload within a specified time interval. If not received, it outputs `false`. Status and configuration can be set within the node.

### Replace Umlauts

Replaces German umlauts in the payload of a message with their respective digraphs (e.g., ä -> ae, ö -> oe, ü -> ue).

### Restore Umlauts

Restores German umlauts in the payload of a message from their respective digraphs (e.g., ae -> ä, oe -> ö, ue -> ü).

### Upper Case

Converts the payload of a message to upper case.

### Lower Case

Converts the payload of a message to lower case.


## Installation

This toolkit can be installed via the Node-RED Palette Manager:

1. Open Node-RED in your browser.
2. Go to the menu (top right corner) and select "Manage palette".
3. In the "Palette" tab, click on the "Install" tab.
4. Search for `node-red-contrib-toolkit` and click the install button.

Alternatively, you can install it via the command line:

```bash
cd ~/.node-red
npm install node-red-contrib-toolkit
```

After installing, restart Node-RED to load the new nodes.

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the Apache 2.0 License. See the [LICENSE](LICENSE) file for details.