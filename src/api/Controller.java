package api;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.fasterxml.jackson.databind.ObjectMapper;


@Path("/servizi")
public class Controller {
		
	@POST
	@Path("/searchByNumber")
	@Consumes("application/text")
	@Produces(MediaType.APPLICATION_JSON)
	public Contatto getContattoByNumero(String numero){
		String cq = "FROM Contatto where numero=" + "'" + numero + "'";
		Session session = HibernateUtil.openSession();	
		Contatto c = new Contatto();
		Transaction tx = null;
		try {
			tx = session.getTransaction();
			tx.begin();
			// crud da eseguire
			c = (Contatto) session.createQuery(cq).uniqueResult();

			tx.commit();
		} catch (Exception e) {
			if (tx != null) {
				tx.rollback();
			}
			e.printStackTrace();
		} finally {
			session.close();
		}
	
		return c;
	}
	
	@POST
	@Path("/searchByName")
	@Consumes("application/text")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Contatto> searchByName(String nome){
		nome = nome.toUpperCase().trim();
		String cq = "FROM Contatto where nome LIKE " + "'" + nome + "%'";
		ArrayList<Contatto> list = new ArrayList<>();
		Session session = HibernateUtil.openSession();		
		Transaction tx = null;
		try {
			tx = session.getTransaction();
			tx.begin();
			// crud da eseguire
			list = (ArrayList<Contatto>) session.createQuery(cq).list();

			tx.commit();
		} catch (Exception e) {
			if (tx != null) {
				tx.rollback();
			}
			e.printStackTrace();
		} finally {
			session.close();
		}
		return list;
	}
	
	@GET
	@Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Contatto> getRubrica(){
		ArrayList<Contatto> contatti = new ArrayList<>();
		Session session = HibernateUtil.openSession();		
		Transaction tx = null;
		String cq = "FROM Contatto";
		try {
			tx = session.getTransaction();
			tx.begin();
			// crud da eseguire
			contatti = (ArrayList<Contatto>) session.createQuery(cq).list();

			tx.commit();
		} catch (Exception e) {
			if (tx != null) {
				tx.rollback();
			}
			e.printStackTrace();
		} finally {
			session.close();
		}
		return contatti;
	}
	
	@DELETE
	@Path("/delete")
	@Consumes("application/json")
	@Produces(MediaType.TEXT_PLAIN)
	public String delete(String json ) {
		Session session = HibernateUtil.openSession();
		List<String> a = new ArrayList<>();

		a = Arrays.asList(json.split(","));
		
		String risultato = "DELETE RIUSCITA!";
		Transaction tx = null;
		try {
			tx = session.getTransaction();
			tx.begin();
			for(String s : a){
				s = s.replaceAll("[^\\d.]", "").toUpperCase().trim();				
				Contatto c = new Contatto();
				c = session.find(Contatto.class, s);
				session.delete(c);
			}
			tx.commit();
		} catch (Exception e) {
			if (tx != null) {
				risultato = "DELETE FALLITA!";
				tx.rollback();
			}
			e.printStackTrace();
		} finally {
			session.close();
		}
		return risultato;
	}
	
	@PUT
	@Path("/update")
	@Consumes("application/json")
	@Produces(MediaType.TEXT_PLAIN)
	public String update(String json) {
		Contatto c = new Contatto();	
		Session session = HibernateUtil.openSession();
		String risultato = "UPDATE FALLITO!";
		int numCampi = 0;
		Transaction tx = null;
		try {			
			Map<String,String> m =
			        new ObjectMapper().readValue(json, HashMap.class);
			c.setNome(m.get("nomeu").toUpperCase().trim());
			c.setCognome(m.get("cognomeu").toUpperCase().trim());
			c.setNumero(m.get("numerou"));
			String id = m.get("idu");
			String qs = "UPDATE Contatto SET nome=" + "'" + c.getNome() + "'," +
					"cognome=" + "'" + c.getCognome() + "'," +
					"numero=" + "'" + c.getNumero() + "'" +
					"WHERE numero=" + "'" + id + "'";

			tx = session.getTransaction();
			
			tx.begin();

				numCampi = session.createQuery(qs).executeUpdate();

			tx.commit();
		} catch (Exception e) {
			if (tx != null) {
				
				tx.rollback();
			}
			e.printStackTrace();
		} finally {
			session.close();
		}
		if(numCampi > 0){
			risultato = "UPDATE RIUSCITO!";
		}
		System.out.println(risultato);
		return risultato;
	}
	

	@POST
	@Path("/create")
	@Consumes("application/json")
	@Produces(MediaType.TEXT_PLAIN)
	public String create(String json) {
		Session session = HibernateUtil.openSession();
		String risultato = "CREATE RIUSCITA!";
		Transaction tx = null;
		try {
			ObjectMapper mapper = new ObjectMapper();
			Contatto c = mapper.readValue(json, Contatto.class);
			c.setNome(c.getNome().toUpperCase().trim());
			c.setCognome(c.getCognome().toUpperCase().trim());
			
			tx = session.getTransaction();
			tx.begin();
			// crud da eseguire
				session.save(c);
			tx.commit();
		} catch (Exception e) {
			if (tx != null) {
				risultato = "CREATE FALLITA!";
				tx.rollback();
			}
			e.printStackTrace();
		} finally {
			session.close();
		}
		System.out.println(risultato);
		return risultato;
	}
	


}
