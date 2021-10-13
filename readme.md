# LemonLight
This a project that allows FRC teams to use object detection only with a raspberry pi and a webcam. The raspberry pi acts as a web server, so it could be accessed from any device on the same network. The ultimate goal of this project is to provide a cheap and easy alternative to young and growing frc teams.

![](demo.gif)
* [ Installation. ](#install)
* [ Usage ](#usage)

<a name="install"></a>
## Installation
Boot a raspberry pi with the latest Raspbian release (console only can do the trick).
Transfer above file on the Desktop folder.
Launch servers with the following commands:
Inside the django folder run:
pip install django
python manage.py runserver
Inside the nodejs folder run:
npm install (once)
node .

To run servers on startup, add these commands to startup.sh.

Connect your pi to your robot's WIFI. When you're done, install [fing](https://www.fing.com/). From the same device, change your wifi settings to your robot's, and start scanning the wifi. Find the raspberry pi's ip adress, and remember it!

The pi transmits its data using a websocket.
To make sure everything works, go to http://ip.of.ra.pi:3000. If you see a configuration screen.
Good job, you've made it through!
You can now start configuring your lemonlight!

On your java project, import all the jar from the jar_files directory. Your imports should look like this:
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
You can listen for ```x, y, width, height```
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
