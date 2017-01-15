using ProjetoAgenda.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoAgenda.Repositories
{
    interface IAgendaRepository
    {
        IEnumerable<Compromissos> GetAll();
        Compromissos Get(int id);
        Compromissos Add(Compromissos item);
        bool Update(Compromissos item);
        bool Delete(int id);
    }
}
