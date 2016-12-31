using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Interfaces.IServices;
using IstMvcFramework.ModelMappers;
using MainDomain = Models.RequestModels;

namespace IstMvcFramework.Areas.Api.Controllers
{
    /// <summary>
    /// Product Base Controller
    /// </summary>
    public class ProductBaseController : ApiController
    {
        private readonly ICategoryService categoryService;

        /// <summary>
        /// Constructor
        /// </summary>
        public ProductBaseController(ICategoryService categoryService)
        {
            if (categoryService == null)
            {
                throw new ArgumentNullException("categoryService");
            }
   
            this.categoryService = categoryService;
        }

        /// <summary>
        /// Get Base Data
        /// </summary>
        public IEnumerable<Models.Category> Get()
        {
            return categoryService.LoadAllCategories().Select(c => c.CreateFrom());
        }
    }
}