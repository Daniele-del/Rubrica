package api;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

//http://localhost:8080/Rubrica/rest/getciao
@Path("/getciao")
public class HelloWorld {

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String saluta(){
		return "Ciao ragazzi!";
	}
	
	@Path("/{nome}")
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String saluta(@PathParam("nome") String nome){
		return "Ciao " + nome.toUpperCase();
	}

	@Path("/file/uno")
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String getHtml(){
		return "<html><head><meta charset='ISO-8859-1'>"+
	"<title>Insert title here</title></head><body><h1>html file 1</h1>"+
				"</body></html> " ;
	}
	
	@Path("/file/due")
	@GET
	@Produces(MediaType.TEXT_HTML)
	public FileInputStream getHtmlA(){
		File file = new File("C:\\Corso_Java_Project\\Rubrica\\WebContent\\index.html");
		
		try {
			return new FileInputStream(file);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	@Path("/json/uno")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String getJson(){
		return "{\"nome\":\"Daniele\",\"cognome\":\"Casazza\",\"cell\":\"3354125874\"}";
	}
	
}















