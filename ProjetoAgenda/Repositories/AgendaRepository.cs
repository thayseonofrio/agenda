using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ProjetoAgenda.Models;

namespace ProjetoAgenda.Repositories
{
    public class AgendaRepository : IAgendaRepository
    {
        AgendaEntities db = new AgendaEntities();
        public Compromissos Add(Compromissos item)
        {
            if(item != null)
            {
                db.Compromissos.Add(item);
                db.SaveChanges();
                return item;
            } else
            {
                throw new ArgumentNullException("item");
            }
        }

        public bool Delete(int id)
        {
            Compromissos compromisso = db.Compromissos.Find(id);
            db.Compromissos.Remove(compromisso);
            db.SaveChanges();
            return true;
        }

        public Compromissos Get(int id)
        {
            Compromissos compromisso = db.Compromissos.Find(id);
            return compromisso;
        }

        public IEnumerable<Compromissos> GetAll()
        {
            return db.Compromissos;
        }

        public bool Update(Compromissos item)
        {
            if(item != null)
            {
                var compromisso = db.Compromissos.Find(item.ID);
                compromisso.Titulo = item.Titulo;
                compromisso.DataInicio = item.DataInicio;
                compromisso.DataFinal = item.DataFinal;
                compromisso.Detalhes = item.Detalhes;
                db.SaveChanges();
            } else
            {
                throw new ArgumentNullException("item");
            }
            return true;
        }
    }
}