using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrawAndGuess.DataAccess
{
    public interface IRepository<T>
    {
        Task Add(T entity);

        Task Update(T entity);

        Task Delete(string id);

        Task<T> GetById(string id);

        Task<IEnumerable<T>> GetAll();
    }
}