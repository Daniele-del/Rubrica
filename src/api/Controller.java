package api;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.fasterxml.jackson.databind.ObjectMapper;


@Path("/servizi")
public class Controller {
		
	public Contatto getContatto(String numero){
		Contatto c = new Contatto();
	
		return c;
	}
	
	@POST
	@Path("/searchByName")
	@Consumes("application/text")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Contatto> searchByName(String nome){

		System.out.println(nome);
		ArrayList<Contatto> list = new ArrayList<>();
	
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
	@Consumes("application/text")
	@Produces(MediaType.TEXT_PLAIN)
	public String delete(String numero ) {
		Session session = HibernateUtil.openSession();
		String risultato = "DELETE RIUSCITA!";
		Transaction tx = null;
		try {
			tx = session.getTransaction();
			tx.begin();
			// crud da eseguire
			Contatto c = session.find(Contatto.class, numero);
				session.delete(c);
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
	
	public boolean update(Contatto contatto, String numero) {
		Session session = HibernateUtil.openSession();
		boolean risultato = true;
		Transaction tx = null;
		try {
			
			tx = session.getTransaction();
			tx.begin();
			// crud da eseguire

			Contatto c = contatto;
				session.saveOrUpdate(c);

			tx.commit();
		} catch (Exception e) {
			if (tx != null) {
				risultato = false;
				tx.rollback();
			}
			e.printStackTrace();
		} finally {
			session.close();
		}
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
			c.getNome().toUpperCase().trim();
			c.getCognome().toUpperCase().trim();
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
