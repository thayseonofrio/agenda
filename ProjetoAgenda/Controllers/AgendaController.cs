using ProjetoAgenda.Models;
using ProjetoAgenda.Repositories;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProjetoAgenda.Controllers
{
    public class AgendaController : ApiController
    {
        static readonly IAgendaRepository repository = new AgendaRepository();
        public IEnumerable GetAllCompromissos()
        {
            return repository.GetAll();
        }

        public Compromissos PostCompromisso(Compromissos item)
        {
            
            return repository.Add(item);
        }

        public Compromissos GetCompromisso(int id)
        {

            return repository.Get(id);
        }

        public IEnumerable PutCompromisso(int id, Compromissos compromisso)
        {
          
            compromisso.ID = id;
            if (repository.Update(compromisso))
            {
                return repository.GetAll();
            }
            else
            {
                return null;
            }
        }

        public bool DeleteCompromisso(int id)
        {
            if (repository.Delete(id))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }
}
