package api;

import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.hibernate.Session;
import org.hibernate.Transaction;


@Path("/servizi")
public class Controller {
	
	ArrayList<Contatto> rubrica = new ArrayList<>();
	
	@Path("/all")
	@GET
    @Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Contatto> all(){
		getRubrica();
		System.out.println(rubrica.toString());
		return rubrica;
	}

	
	public Contatto getContatto(String numero){
		Contatto c = new Contatto();
		for(Contatto cont : rubrica){
			if(cont.getNumero().equals(numero)){
				c = cont;
			}
		}
		return c;
	}
	
	public ArrayList<Contatto> searchByName(String nome){
		ArrayList<Contatto> list = new ArrayList<>();
		for(Contatto c : rubrica){
			if(c.getNome().equals(nome)){
				list.add(c);
			}
		}		
		return list;
	}
	
	public boolean getRubrica(){
		Session session = HibernateUtil.openSession();		
		boolean risultato = true;
		Transaction tx = null;
		String cq = "FROM Contatto";
		try {
			tx = session.getTransaction();
			tx.begin();
			// crud da eseguire
			rubrica = (ArrayList<Contatto>) session.createQuery(cq).list();
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
		System.out.println(risultato);
		return risultato;
	}
	
	public boolean delete(String numero ) {
		Session session = HibernateUtil.openSession();
		boolean risultato = true;
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
				risultato = false;
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
	
	public boolean create(Contatto contatto) {
		Session session = HibernateUtil.openSession();
		boolean risultato = true;
		Transaction tx = null;
		try {
			tx = session.getTransaction();
			tx.begin();
			// crud da eseguire
			Contatto c = contatto;
				session.save(c);
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

}
