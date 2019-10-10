# LemonLight
This a project that allows FRC teams to use object detection only with a raspberry pi and a webcam. The raspberry pi acts as a web server, so it could be accessed from any device on the same network. The ultimate goal of this project is to provide a cheap and easy alternative to young and growing frc teams.

* [ Installation. ](#install)
* [ Usage ](#usage)

<a name="install"></a>
## Installation
Clone the "boot.zip" file from the flash folder in the current directory.
Now, format your sd card. When the process is finished, use balena etcher to flash the sd card with the boot.zip file you just cloned.
When you're done, put the sd card in the sd card slot in the raspberry pi, and plug the ethernet. When you're done, install [fing](https://www.fing.com/). From the same device, change your wifi settings to your robot's, and start scanning the wifi. Find the raspberry pi's ip adress, and remember it!

To make sure everything is working, got to http://ip.of.ra.pi:3000. If you see a configuration screen.
Good job, you've made it through!
You can now start configuring your lemonlight!

On your java project, import all the jar from the jar_files directory. Your java class should look like this:
```java
package demo;

import io.socket.global.*;
import io.socket.emitter.*;

import java.net.Socket;
import java.net.URISyntaxException;

import io.socket.client.*;
import io.socket.engineio.client.transports.*;
import io.socket.engineio.*;

```
You're now done configuring everything!


<a name="usage"></a>
## Usage
In your java class, you could listen for ```x, y, width, height```
with the following function:
```java

io.socket.client.Socket socket = IO.socket("http://ip.of.ra.pi:3000");
socket.on("x", new Emitter.Listener() {
		@Override
		public void call(Object... args) {		
			System.out.println(args[0]);
	  }
});  
socket.connect();
```
