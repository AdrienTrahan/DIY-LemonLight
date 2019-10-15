package example;
import io.socket.global.*;
import io.socket.emitter.*;

import java.net.Socket;
import java.net.URISyntaxException;

import io.socket.client.*;
import io.socket.engineio.client.transports.*;
import io.socket.engineio.*;

public class example {
	
	public static void main(String[] args) throws URISyntaxException {
		
		io.socket.client.Socket socket = IO.socket("http://192.168.0.181:3000");
		socket.emit("changePipeline", "2");
		
			  
		socket.on("width", new Emitter.Listener() {
			@Override
			public void call(Object... args) {
				
				System.out.println(args[0]);
			}
			
		  });
		socket.connect();
	}
}
